const {
  errorPayload,
  hash,
  hasRequiredFields,
  makeIdentifier,
  makePermitIdentifier,
} = require("../helpers")
const engageT = require("../spine/engageT")
const loginT = (packet, db, cb) => {
  if (hasRequiredFields(packet, ["identifier", "password"])) {
    engageT(packet, db, (exists, engageErr, engagedData) => {
      if (exists && db.canExist(engagedData)) {
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
          db.create(permitPacket, createErr => {
            if (!createErr) {
              cb(200, tokenData)
            } else {
              cb(
                400,
                errorPayload(
                  "loginT",
                  `Error creating permit for ${identifier} Thing`,
                  createErr
                )
              )
            }
          })
        } else {
          cb(
            400,
            errorPayload(
              "loginT",
              `${identifier} Thing's password was incorrect`
            )
          )
        }
      } else {
        cb(
          400,
          errorPayload(
            "loginT",
            `Could not find ${identifier} Thing`,
            engageErr
          )
        )
      }
    })
  } else {
    cb(400, errorPayload("loginT", `Thing missing required fields for login`))
  }
}
module.exports = loginT
