const { errorPayload, hasRequiredFields } = require("../../src/helpers")
const OK = 201
const NOTOK = 406
const takeupT = (packet, ribs, db, cb) => {
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    db.exists(packet, exists => {
      if (!exists) {
        let createPacket = {
          ...bigUp(packet),
          subjectOf: engagedData.identifier,
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
