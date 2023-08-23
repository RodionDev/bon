const { successPayload, errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const logoutT = (packet, db, cb) => {
  authT("logoutT", packet, db, (permitted, authError, _) => {
    if (permitted) {
      let { identifier } = packet
      db.delete({ identifier, mainEntityOfPage: "Permit" }, deleteErr => {
        if (!deleteErr) {
          cb(200, successPayload(`${identifier} Thing logout`))
        } else {
          cb(
            500,
            errorPayload(`Could not logout ${identifier} Thing`, deleteErr)
          )
        }
      })
    } else {
      cb(400, errorPayload(authError))
    }
  })
}
module.exports = logoutT
