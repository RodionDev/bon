const authT = require("../spine/authT")
const deleteT = (packet, db, cb) => {
  authT("deleteT", packet, db, (permitted, err, _) => {
    if (permitted) {
      db.delete(packet, err => {
        let { identifier } = packet
        if (!err) {
          cb(200, { Message: `${identifier} Thing deleted.` })
        } else {
          cb(500, {
            Error: `Could not delete ${identifier} Thing.`,
            Reason: err,
          })
        }
      })
    } else {
      cb(400, err)
    }
  })
}
module.exports = deleteT
