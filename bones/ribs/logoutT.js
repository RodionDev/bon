const authT = require("../spine/authT")
const logoutT = (packet, db, cb) => {
  authT("logoutT", packet, db, (permitted, err, _) => {
    if (permitted) {
      let { identifier } = packet
      db.delete("Permit", header.permit, err => {
        if (!err) {
          cb(200, { Message: `${identifier} Thing logout.` })
        } else {
          cb(500, {
            Error: `Could not logout ${identifier} Thing.`,
            Reason: err,
          })
        }
      })
    } else {
      cb(400, err)
    }
  })
}
module.exports = logoutT
