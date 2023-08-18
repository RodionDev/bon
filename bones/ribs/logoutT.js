const { successPayload, errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const logoutT = (packet, db, cb) => {
  authT("logoutT", packet, db, (permitted, err, _) => {
    if (permitted) {
      let { identifier } = packet
      db.delete({ identifier, mainEntityOfPage: "Permit" }, err => {
        if (!err) {
          cb(200, successPayload(`${identifier} Thing logout`))
        } else {
          cb(500, errorPayload(`Could not logout ${identifier} Thing`, err))
        }
      })
    } else {
      cb(400, errorPayload(err))
    }
  })
}
module.exports = logoutT
