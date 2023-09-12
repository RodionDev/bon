const { errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const readT = (packet, db, cb) => {
  authT("readT", packet, db, (permitted, authError, engagedData) => {
    if (permitted) {
      if (db.canExist(engagedData)) {
        delete engagedData.password
        let { sameAs } = packet
        if (sameAs) {
          cb(200, engagedData[sameAs])
        } else {
          cb(200, engagedData)
        }
      } else {
        cb(666, errorPayload("readT", "Empty record", "", "Undelete record"))
      }
    } else {
      cb(404, authError)
    }
  })
}
module.exports = readT
