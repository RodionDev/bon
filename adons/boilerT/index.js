const { errorPayload, hash, saveT } = require("../../src/helpers")
const OK = 3
const NOTOK = 666
const boil = engagedData => engagedData
const boilerT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT(
    "boilerT",
    packet,
    ribs,
    db,
    (permitted, authError, nowFullyEngagedData) => {
      if (permitted && db.canStore(nowFullyEngagedData)) {
        saveT("boilerT", boil(engagedData), db, cb, OK, NOTOK)
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}
module.exports = boilerT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
