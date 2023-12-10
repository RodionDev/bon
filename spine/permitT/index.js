const { errorPayload } = require("../../src/helpers")
const OK = true
const NOTOK = false
const permitT = (rib, engagedData, ribs, db, cb, packet) => {
  console.count("the Real permitT")
  let govPermits = engagedData.ItemList.itemListElement.filter(
    thing => thing.mainEntityOfPage === "GovernmentPermit"
  )
  let passing = [],
    blocking = []
  if (packet && packet.Permit) {
    let { Permit } = packet
    if (typeof Permit === "string") {
      passing = passing.concat(
        govPermits.filter(
          govP =>
            govP.Permit.issuedBy === engagedData.identifier &&
            govP.Permit.permitAudience === packet.Permit
        )
      )
    } else {
      passing = passing.concat(
        govPermits.filter(
          govP =>
            govP.Permit.issuedBy === engagedData.identifier &&
            govP.Permit.issuedBy === packet.Permit.issuedBy &&
            govP.Permit.issuedThrough === packet.Permit.issuedThrough &&
            govP.Permit.permitAudience === packet.Permit.permitAudience
        )
      )
    }
    blocking = govPermits.filter(govP => {
      let { permitAudience, validFor } = govP.Permit
      let endpoints = validFor ? validFor.split(",") : []
      return (
        permitAudience === packet.identifier &&
        endpoints.some(eP => ["-" + rib, "-"].includes(eP))
      )
    })
  }
  passing = passing.concat(
    govPermits.filter(govP => govP.Permit.permitAudience === "*")
  )
  passing = passing.filter(govP => {
    let { permitAudience, validFor } = govP.Permit
    let endpoints = validFor ? validFor.split(",") : []
    return endpoints.some(eP => [rib, "*"].includes(eP))
  })
  if (passing.length && !blocking.length) {
    cb(OK, "", engagedData)
  } else {
    cb(NOTOK, errorPayload("permitT", "Permission not granted"))
  }
}
module.exports = permitT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
