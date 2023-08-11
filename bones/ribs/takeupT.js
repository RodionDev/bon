const { hash, hasRequiredFields, makeIdentifier, url } = require("../helpers")
const takeupT = (packet, db, cb) => {
  let { mainEntityOfPage } = packet
  if (hasRequiredFields(packet, ["identifier"])) {
    let identifier = makeIdentifier(packet)
    db.exists(mainEntityOfPage, identifier, exists => {
      if (!exists) {
        let hashedPassword = ""
        if (packet.password) {
          hashedPassword = hash(packet.password.trim())
        }
        let engagedData = {
          ...packet,
          identifier,
          mainEntityOfPage: mainEntityOfPage,
          url: url(mainEntityOfPage, identifier),
          password: hashedPassword,
        }
        db.create(mainEntityOfPage, identifier, engagedData, err => {
          if (!err) {
            delete engagedData.password
            cb(200, engagedData)
          } else {
            cb(500, {
              Error: `Could not create ${identifier} Thing.`,
              Reason: err,
            })
          }
        })
      } else {
        cb(400, { Error: `${identifier} Thing already exists. Please login.` })
      }
    })
  } else {
    cb(400, { Error: `Thing missing required fields.` })
  }
}
module.exports = takeupT
