const { errorPayload, hash } = require("../../src/helpers")
const OK = 3
const NOTOK = 666
const boil = engagedData => engagedData
const wizardT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("wizardT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      cb(OK, boil(engagedData))
    } else {
      cb(NOTOK, authError)
    }
  })
}
module.exports = wizardT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
