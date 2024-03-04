const { errorPayload, saveT } = require("../../src/helpers")
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
        saveT("inflateT", paradiseLost(nowFullyEngagedData), db, cb, OK, NOTOK)
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
