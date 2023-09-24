const { errorPayload } = require("../../src/helpers")
const readT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("readT", packet, ribs, db, (permitted, authError, engagedData) => {
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
