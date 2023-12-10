const { successPayload, errorPayload } = require("../../src/helpers")
const OK = 308
const NOTOK = 423
const destroyT = (packet, ribs, db, cb) => {
  console.count("the Real inviteT")
  const { authT } = ribs
  authT("destroyT", packet, ribs, db, (permitted, authError, _) => {
    if (permitted) {
      db.destroy(packet, destroyError => {
        let { identifier } = packet
        if (!destroyError) {
          cb(
            OK,
            successPayload(
              "destroyT",
              `${identifier} Thing destroyed`,
              `unlist ${identifier}`
            )
          )
        } else {
          cb(
            NOTOK,
            errorPayload(
              "destroyT",
              `Could not destroy ${identifier} Thing`,
              destroyError
            )
          )
        }
      })
    } else {
      cb(NOTOK, authError)
    }
  })
}
module.exports = destroyT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
