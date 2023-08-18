const { errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const readT = (packet, db, cb) => {
  authT(
    "readT",
    { identifier: packet.identifier },
    db,
    (permitted, err, engagedData) => {
      if (!err) {
        if (permitted && engagedData) {
          delete engagedData.password
          cb(200, engagedData)
        } else {
          cb(404, errorPayload("Not permitted", err))
        }
      } else {
        cb(404, errorPayload(err))
      }
    }
  )
}
module.exports = readT
