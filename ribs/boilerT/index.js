const { errorPayload, hash } = require("../../src/helpers")
const STATUSCODE = 201
const boil = engagedData => engagedData
const boilerT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("boilerT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      cb(200, boil(engagedData))
    } else {
      cb(404, authError)
    }
  })
}
module.exports = boilerT
exports = module.exports
exports.STATUSCODE = STATUSCODE
