const { errorPayload } = require("../../src/helpers")
const permitT = (rib, packet, ribs, db, cb, permit) => {
  console.log("the real permitT")
  if (!Array.isArray(packet.ItemList?.itemListElement)) {
    packet.ItemList = { itemListElement: [] }
  }
  let actionAccessSpecifications = packet.ItemList.itemListElement
    .filter(t => t.mainEntityOfPage === "ActionAccessSpecification")
    .filter(
      t =>
        t.ActionAccessSpecification &&
        t.ActionAccessSpecification.category === "endpointT"
    )
  let passingActionAccessSpecifications = actionAccessSpecifications
    .filter(
      t =>
        t.identifier === permit?.Permit?.issuedThrough ||
        !permit?.Permit.issuedThrough
    )
    .filter(
      t =>
        packet.identifier === permit?.Permit?.issuedBy ||
        !permit?.Permit.issuedBy
    )
    .filter(
      t =>
        t.ActionAccessSpecification.eligibleRegion ===
          permit?.Permit?.permitAudience ||
        t.ActionAccessSpecification.eligibleRegion === "*"
    )
    .filter(t => {
      let endpoints = t.ItemList.itemListElement.map(i => i.identifier)
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  let blockingActionAccessSpecifications = actionAccessSpecifications
    .filter(
      t => t.ActionAccessSpecification.ineligibleRegion === permit?.identifier
    )
    .filter(t => {
      let endpoints = t.ItemList.itemListElement.map(i => i.identifier)
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  if (
    passingActionAccessSpecifications.length &&
    !blockingActionAccessSpecifications.length
  ) {
    cb(true, "", packet)
  } else {
    cb(false, errorPayload("permitT", "Permission not granted"))
  }
}
module.exports = permitT
