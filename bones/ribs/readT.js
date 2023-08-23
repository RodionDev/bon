const { errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const readT = (packet, db, cb) => {
  authT(
    "readT",
    { identifier: packet.identifier },
    db,
    (permitted, authError, engagedData) => {
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
          cb(666, errorPayload("Empty record", "", "Undelete record"))
        }
      } else {
        cb(404, authError)
      }
    }
  )
}
module.exports = readT
