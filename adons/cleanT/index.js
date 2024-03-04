const { saveT } = require("../../src/helpers.js")
const cleaner = require("./cleaner.js")
const OK = 206
const NOTOK = 417
const cleanT = (packet, ribs, db, cb) => {
  const { authT, updateT } = ribs
  authT("cleanT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      saveT("cleanT", cleaner(engagedData), db, cb, OK, NOTOK)
    } else {
      cb(404, authError)
    }
  }) 
}
module.exports = cleanT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
