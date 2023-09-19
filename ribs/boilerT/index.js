const { errorPayload, hash } = require("../../src/helpers")
const { authT } = require("../../spine")
const readT = require("../readT")
const boil = engagedData => engagedData
const boilerT = (packet, db, cb) => {
  authT("boilerT", packet, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      cb(200, boil(engagedData))
    } else {
      cb(404, authError)
    }
  })
}
module.exports = updateT
