const {
  errorPayload,
  hash,
  hasRequiredFields,
  makeIdentifier,
  url,
} = require("../../src/helpers")
const STATUSCODE = 201
const takeupT = (packet, ribs, db, cb) => {
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    db.exists(packet, exists => {
      if (!exists) {
        if (packet.password) {
          packet.password = hash(packet.password.trim())
        }
        let createPacket = {
          ...bigUp(packet),
          subjectOf: engagedData.identifier,
        }
        db.create(packet, (createErr, createPacket) => {
          if (!createErr) {
            delete createPacket.password
            cb(STATUSCODE, createPacket)
          } else {
            cb(
              500,
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
          400,
          errorPayload(
            "takeupT",
            `${identifier} Thing already exists. Please login`
          )
        )
      }
    })
  } else {
    cb(400, errorPayload("takeupT", `Thing missing required fields`))
  }
}
module.exports = takeupT
exports = module.exports
exports.STATUSCODE = STATUSCODE
