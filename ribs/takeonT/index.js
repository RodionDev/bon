const {
  bigUp,
  errorPayload,
  hasRequiredFields,
  makeIdentifier,
} = require("../../src/helpers")
const takeonT = (packet, ribs, db, cb) => {
  const { authT, enlistT } = ribs
  authT(
    "takeonT",
    { identifier: packet.subjectOf },
    ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canExist(engagedData)) {
        if (hasRequiredFields(packet, ["identifier"])) {
          let { identifier } = packet
          db.exists(packet, (exists, existsErr) => {
            if (!exists) {
              let createPacket = {
                ...bigUp(packet),
                subjectOf: engagedData.identifier,
              }
              db.create(createPacket, (createErr, createPacket) => {
                if (!createErr) {
                  enlistT(createPacket, ribs, db, cb)
                } else {
                  cb(
                    500,
                    errorPayload(
                      "takeonT",
                      `Could not create ${identifier} Thing`,
                      createErr
                    )
                  )
                }
              })
            } else {
              enlistT(packet, ribs, db, cb)
            }
          })
        } else {
          cb(
            400,
            errorPayload(
              "takeonT",
              `${identifier} Thing is missing the required fields`
            )
          )
        }
      } else {
        cb(404, authError)
      }
    }
  )
}
module.exports = takeonT
