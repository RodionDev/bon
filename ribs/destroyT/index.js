const { successPayload, errorPayload } = require("../../src/helpers")
const destroyT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("destroyT", packet, ribs, db, (permitted, authError, _) => {
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
