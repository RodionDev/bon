const { errorPayload, makePermitIdentifier } = require("../../src/helpers")
const STATUSCODE = 201
const permitMaker = (permitIdentifier, packet) => {
  return new Object({
    identifier: permitIdentifier,
    mainEntityOfPage: "Permit",
    subjectOf: packet.ActionAccessSpecification?.eligibleRegion,
    Permit: {
      issuedBy: packet.subjectOf,
      issuedThrough: packet.identifier,
      permitAudience: packet.ActionAccessSpecification?.eligibleRegion,
      validFor: "",
      validFrom:
        packet.ActionAccessSpecification?.availabilityStarts ||
        new Date(1970, 0, 1),
      validIn: "",
      validUntil:
        packet.ActionAccessSpecification?.availabilityEnds ||
        new Date(2040, 0, 1),
    },
  })
}
const accessSpecsMaker = packet => {
  return new Object({
    identifier: packet.identifier,
    mainEntityOfPage: "ActionAccessSpecification",
    subjectOf: packet.subjectOf,
    ItemList: { itemListElement: [] },
    ActionAccessSpecification: {
      availabilityEnds:
        packet.ActionAccessSpecification.availabilityEnds || "2040-01-01",
      availabilityStarts:
        packet.ActionAccessSpecification.availabilityStarts || "1970-01-01",
      category: "endpointT",
      eligibleRegion: packet.ActionAccessSpecification.eligibleRegion || "*",
      expectsAcceptanceOf: "Terms",
      ineligibleRegion: packet.ActionAccessSpecification.ineligibleRegion || "",
      requiresSubscription:
        packet.ActionAccessSpecification.requiresSubscription || "*",
    },
  })
}
const inviteT = (packet, ribs, db, cb) => {
  console.count("the real inviteT")
  let permitIdentifier = makePermitIdentifier()
  let eligibleRegion =
    packet.ActionAccessSpecification?.eligibleRegion || permitIdentifier
  let accessSpecs = accessSpecsMaker({
    ...packet,
    subjectOf: packet.identifier,
    identifier:
      packet.ActionAccessSpecification?.identifier || makePermitIdentifier(),
    ActionAccessSpecification: {
      ...packet.ActionAccessSpecification,
      eligibleRegion: eligibleRegion,
    },
  })
  ribs.takeonT(accessSpecs, ribs, db, (takeonCode, accessSpecsData) => {
    if (takeonCode === 200) {
      let permit = permitMaker(permitIdentifier, accessSpecsData)
      ribs.takeupT(permit, ribs, db, (takeupCode, takeupData) => {
        if (takeupCode === 200) {
          cb(200, permit)
        } else {
          cb(false, errorPayload("takeupT"))
        }
      })
    } else {
      cb(false, errorPayload("takeonT", "Permission not granted"))
    }
  })
}
module.exports = inviteT
exports = module.exports 
exports.accessSpecsMaker = accessSpecsMaker 
exports.permitMaker = permitMaker 
exports = module.exports
exports.STATUSCODE = STATUSCODE
