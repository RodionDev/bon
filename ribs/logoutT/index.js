const { successPayload, errorPayload } = require("../../src/helpers")
const logoutT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("logoutT", packet, ribs, db, (permitted, authError, _) => {
    if (permitted) {
      let { identifier } = packet
      db.destroy({ identifier, mainEntityOfPage: "Permit" }, destroyErr => {
        if (!destroyErr) {
          cb(200, successPayload("logoutT", `${identifier} Thing logout`))
        } else {
          cb(
            500,
            errorPayload(
              "logoutT",
              `Could not logout ${identifier} Thing`,
              destroyErr
            )
          )
        }
      })
    } else {
      cb(400, errorPayload("logoutT", authError))
    }
  })
}
module.exports = logoutT
