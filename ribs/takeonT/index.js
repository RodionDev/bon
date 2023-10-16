const {
  bigUp,
  errorPayload,
  hasRequiredFields,
  makeIdentifier,
} = require("../../src/helpers")
const OK = 201
const NOTOK = 406
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
                console.log("createErr", createErr, "db.create", {
                  OK,
                  enlistCode,
                })
                if (!createErr) {
                  enlistT(
                    createPacket,
                    ribs,
                    db,
                    (enlistCode, enlistedPacket) => {
                      cb(OK, enlistedPacket)
                    }
                  )
                } else {
                  cb(
                    NOTOK,
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
            NOTOK,
            errorPayload(
              "takeonT",
              `${identifier} Thing is missing the required fields`
            )
          )
        }
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}
module.exports = takeonT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
