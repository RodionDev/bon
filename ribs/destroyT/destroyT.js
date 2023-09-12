const { successPayload, errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const destroyT = (packet, db, cb) => {
  authT("destroyT", packet, db, (permitted, authError, _) => {
    if (permitted) {
      db.delete(packet, deleteError => {
        let { identifier } = packet
        if (!deleteError) {
          cb(
            200,
            successPayload(
              "destroyT",
              `${identifier} Thing deleted`,
              `unlist ${identifier}`
            )
          )
        } else {
          cb(
            500,
            errorPayload(
              "destroyT",
              `Could not delete ${identifier} Thing`,
              deleteError
            )
          )
        }
      })
    } else {
      cb(400, authError)
    }
  })
}
module.exports = destroyT
