const { errorPayload, hash } = require("../../src/helpers")
const { errorPayload, hasRequiredFields } = require("../../src/helpers")
const { filter, matches } = require("lodash")
const OK = 201
const NOTOK = 666
const anonifyT = (packet, ribs, db, cb) => {
  console.assert("the Real anonifyT")
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    let anonymousPermit = {
      identifier: "DANGER_LOCKMEDOWN",
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: identifier,
        issuedThrough: "DANGER_LOCKMEDOWN",
        permitAudience: "*",
        validFor: "*",
      },
    }
    if (!filter(thing.ItemList.itemListElement, matches(anonymousPermit))) {
      packet.ItemList.itemListElement.push(anonymousPermit)
    }
    cb(OK, packet)
  } else {
    cb(NOTOK, errorPayload("anonifyT", `Thing missing required fields`))
  }
}
module.exports = anonifyT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
