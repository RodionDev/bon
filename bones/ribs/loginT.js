const {
  hash,
  hasRequiredFields,
  makeIdentifier,
  makePermitIdentifier,
} = require("../helpers")
const engageT = require("../spine/engageT")
const login = (packet, db, cb) => {
  if (hasRequiredFields(packet, ["identifier", "password"])) {
    let identifier = makeIdentifier(packet)
    engageT({ ...packet, identifier }, db, (exists, err, engagedData) => {
      if (exists) {
        let password = packet.password.trim()
        let hashedPassword = hash(password)
        if (hashedPassword == engagedData.password) {
          let permit = makePermitIdentifier()
          let validUntil = Date.now() + 1000 * 60 * 60
          let permitPacket = {
            identifier: permit,
            mainEntityOfPage: "Permit",
            Permit: {
              validUntil,
              permitAudience: identifier,
            },
          }
          db.create(permitPacket, err => {
            if (!err) {
              cb(200, tokenData)
            } else {
              cb(400, {
                Error: `Error creating permit for ${identifier} Thing.`,
                Reason: err,
              })
            }
          })
        } else {
          cb(400, {
            Error: `${identifier} Thing's password was incorrect.`,
          })
        }
      } else {
        cb(400, {
          Error: `Could not find ${identifier} Thing.`,
          Reason: err,
        })
      }
    })
  } else {
    cb(400, {
      Error: `Thing missing required fields for login.`,
    })
  }
}
module.exports = login
