const { hasRequiredFields, makeIdentifier } = require("../helpers")
const authT = require("../spine/authT")
const enlistT = require("./enlistT")
const takeonT = (packet, db, cb) => {
  authT("takeonT", packet, db, (permitted, err, _) => {
    if (hasRequiredFields(packet, ["identifier"])) {
      let { identifier } = packet
      db.exists(packet, (exists, err) => {
        if (!exists) {
          db.create(packet, (err, createPacket) => {
            if (!err) {
              enlistT(createPacket, db, cb)
            } else {
              cb(500, {
                Error: `Could not create ${identifier} Thing.`,
                Reason: err,
              })
            }
          })
        } else {
          enlistT(packet, db, cb)
        }
      })
    } else {
      cb(400, {
        Error: `${identifier} Thing is missing the required fields.`,
      })
    }
  })
}
module.exports = takeonT
