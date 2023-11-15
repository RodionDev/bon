const { errorPayload, hash } = require("../../src/helpers")
const OK = 3
const NOTOK = 666
const paradiseLost = engagedData => engagedData
const paradiseLosterT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT(
    "paradiseLosterT",
    packet,
    ribs,
    db,
    (permitted, authError, nowFullyEngagedData) => {
      if (permitted && db.canStore(nowFullyEngagedData)) {
        cb(OK, paradiseLost(nowFullyEngagedData))
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}
module.exports = paradiseLosterT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
