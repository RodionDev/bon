const { errorPayload } = require("../../src/helpers")
const OK = true
const NOTOK = false
const permitT = (rib, engagedData, ribs, db, cb, packet) => {
  console.count("the real permitT")
  let actionAccessSpecifications = engagedData.ItemList.itemListElement
    .filter(spec => spec.mainEntityOfPage === "ActionAccessSpecification")
    .filter(
      spec =>
        spec.ActionAccessSpecification &&
        spec.ActionAccessSpecification.category === "endpointT"
    )
  let passingActionAccessSpecifications = actionAccessSpecifications
    .filter(
      spec =>
        spec.identifier === packet?.Permit?.issuedThrough ||
        !packet?.Permit.issuedThrough
    )
    .filter(
      spec =>
        engagedData.identifier === packet?.Permit?.issuedBy ||
        !packet?.Permit.issuedBy
    )
    .filter(
      spec =>
        spec.ActionAccessSpecification.eligibleRegion ===
          packet?.Permit?.permitAudience ||
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
        spec.ActionAccessSpecification.ineligibleRegion === packet?.identifier
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
    cb(OK, "", engagedData)
  } else {
    cb(NOTOK, errorPayload("permitT", "Permission not granted"))
  }
}
module.exports = permitT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
