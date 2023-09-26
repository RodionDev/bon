const { successPayload, errorPayload } = require("../../src/helpers")
const destroyT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("destroyT", packet, ribs, db, (permitted, authError, _) => {
    if (permitted) {
      db.destroy(packet, destroyError => {
        let { identifier } = packet
        if (!destroyError) {
          cb(
            200,
            successPayload(
              "destroyT",
              `${identifier} Thing destroyed`,
              `unlist ${identifier}`
            )
          )
        } else {
          cb(
            500,
            errorPayload(
              "destroyT",
              `Could not destroy ${identifier} Thing`,
              destroyError
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
