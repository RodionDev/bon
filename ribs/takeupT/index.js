const { bigUp, errorPayload, hasRequiredFields } = require("../../src/helpers")
const OK = 201
const NOTOK = 406
const takeupT = (packet, ribs, db, cb) => {
  console.count("the Real inviteT")
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    db.exists(packet, exists => {
      if (!exists) {
        let createPacket = {
          ...packet, 
          subjectOf: packet.identifier,
        }
        db.create(packet, (createErr, createPacket) => {
          if (!createErr) {
            cb(OK, createPacket)
          } else {
            cb(
              NOTOK,
              errorPayload(
                "takeupT",
                `Could not create ${identifier} Thing`,
                createErr
              )
            )
          }
        })
      } else {
        cb(
          NOTOK,
          errorPayload(
            "takeupT",
            `${identifier} Thing already exists. Please login`
          )
        )
      }
    })
  } else {
    cb(NOTOK, errorPayload("takeupT", `Thing missing required fields`))
  }
}
module.exports = takeupT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
