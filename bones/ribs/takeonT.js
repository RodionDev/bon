const { hasRequiredFields, makeIdentifier } = require("../helpers")
const authT = require("../spine/authT")
const enlistT = require("./enlistT")
const takeonT = (packet, db, cb) => {
  authT("takeonT", packet, db, (permitted, err, _) => {
    let { mainEntityOfPage } = packet
    if (hasRequiredFields(packet, ["identifier"])) {
      if (!packet.identifier) {
        packet.identifier = makeIdentifier(packet)
      }
      db.exists(mainEntityOfPage, identifier, (exists, err) => {
        if (!exists) {
          db.create(mainEntityOfPage, identifier, packet, err => {
            if (!err) {
              enlistT({ ...packet, identifier }, db, cb)
            } else {
              cb(500, {
                Error: `Could not create ${identifier} Thing.`,
                Reason: err,
              })
            }
          })
        } else {
          enlistT({ ...packet, identifier }, db, cb)
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
