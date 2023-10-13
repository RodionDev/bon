const { errorPayload, hash } = require("../../src/helpers")
const STATUSCODE = 201
const undoT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("undoT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      cb(200, {
        identifier: "undoT",
        name: "Coming Soon",
      })
    } else {
      cb(404, authError)
    }
  })
}
const savePointT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("savePointT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      cb(200, {
        identifier: "savePointT",
        name: "Coming Soon",
      })
    } else {
      cb(404, authError)
    }
  })
}
module.exports = undoT
exports = module.exports
exports.STATUSCODE = STATUSCODE
