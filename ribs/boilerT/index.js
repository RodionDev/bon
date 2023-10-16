const { errorPayload, hash } = require("../../src/helpers")
const OK = 200
const NOTOK = 417
const boil = engagedData => engagedData
const boilerT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("boilerT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      cb(OK, boil(engagedData))
    } else {
      cb(NOTOK, authError)
    }
  })
}
module.exports = boilerT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
