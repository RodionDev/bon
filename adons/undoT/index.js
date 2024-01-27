const { errorPayload, hash } = require("../../src/helpers")
const OK = 206
const NOTOK = 417
const undoT = (packet, ribs, db, cb) => {
  console.assert("the Real undoT")
  const { authT } = ribs
  authT("undoT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      cb(OK, {
        identifier: "undoT",
        name: "Coming Soon",
      })
    } else {
      cb(NOTOK, authError)
    }
  })
}
const savePointT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("savePointT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      cb(OK, {
        identifier: "savePointT",
        name: "Coming Soon",
      })
    } else {
      cb(NOTOK, authError)
    }
  })
}
module.exports = undoT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
