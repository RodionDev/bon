const {
  errorPayload,
  hasRequiredFields,
  makeIdentifier,
} = require("../helpers")
const authT = require("../spine/authT")
const enlistT = require("./enlistT")
const takeonT = (packet, db, cb) => {
  authT(
    "takeonT",
    { identifier: packet.subjectOf },
    db,
    (permitted, err, engagedData) => {
      if (hasRequiredFields(packet, ["identifier"])) {
        let { identifier } = packet
        db.exists(packet, (exists, err) => {
          if (!exists) {
            db.create(
              {
                ...packet,
                subjectOf: engagedData.identifier,
              },
              (err, createPacket) => {
                if (!err) {
                  enlistT(createPacket, db, cb)
                } else {
                  cb(
                    500,
                    errorPayload(`Could not create ${identifier} Thing`, err)
                  )
                }
              }
            )
          } else {
            enlistT(packet, db, cb)
          }
        })
      } else {
        cb(
          400,
          errorPayload(`${identifier} Thing is missing the required fields`)
        )
      }
    }
  )
}
module.exports = takeonT
