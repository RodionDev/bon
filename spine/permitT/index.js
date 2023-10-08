const { errorPayload } = require("../../src/helpers")
const permitT = (rib, packet, ribs, db, cb, permit) => {
  console.log("the real permitT")
  console.assert("packet", packet.ItemList.itemListElement, "permit", permit)
  let actionAccessSpecifications = packet.ItemList.itemListElement
    .filter(spec => spec.mainEntityOfPage === "ActionAccessSpecification")
    .filter(
      spec =>
        spec.ActionAccessSpecification &&
        spec.ActionAccessSpecification.category === "endpointT"
    )
  let passingActionAccessSpecifications = actionAccessSpecifications
    .filter(
      spec =>
        spec.identifier === permit?.Permit?.issuedThrough ||
        !permit?.Permit.issuedThrough
    )
    .filter(
      spec =>
        packet.identifier === permit?.Permit?.issuedBy ||
        !permit?.Permit.issuedBy
    )
    .filter(
      spec =>
        spec.ActionAccessSpecification.eligibleRegion ===
          permit?.Permit?.permitAudience ||
        spec.ActionAccessSpecification.eligibleRegion === "*"
    )
    .filter(spec => {
      let endpoints =
        spec.ActionAccessSpecification.requiresSubscription.split(",")
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  let blockingActionAccessSpecifications = actionAccessSpecifications
    .filter(
      spec =>
        spec.ActionAccessSpecification.ineligibleRegion === permit?.identifier
    )
    .filter(spec => {
      let endpoints =
        spec.ActionAccessSpecification.requiresSubscription.split(",")
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  console.assert(
    "passingActionAccessSpecifications.length",
    passingActionAccessSpecifications.length,
    "blockingActionAccessSpecifications.length",
    blockingActionAccessSpecifications.length
  )
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
