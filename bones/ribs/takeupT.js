const {
  errorPayload,
  hash,
  hasRequiredFields,
  makeIdentifier,
  url,
} = require("../helpers")
const takeupT = (packet, db, cb) => {
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    db.exists(packet, exists => {
      if (!exists) {
        if (packet.password) {
          packet.password = hash(packet.password.trim())
        }
        db.create(packet, (createErr, createPacket) => {
          if (!createErr) {
            delete createPacket.password
            cb(200, createPacket)
          } else {
            cb(
              500,
              errorPayload(`Could not create ${identifier} Thing`, createErr)
            )
          }
        })
      } else {
        cb(
          400,
          errorPayload(`${identifier} Thing already exists. Please login`)
        )
      }
    })
  } else {
    cb(400, errorPayload(`Thing missing required fields`))
  }
}
module.exports = takeupT
