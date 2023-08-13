const authT = require("../spine/authT")
const readT = (packet, db, cb) => {
  authT("readT", packet, db, (permitted, err, engagedData) => {
    if (permitted && engagedData) {
      if (permitted && engagedData) {
        delete engagedData.password
        cb(200, engagedData)
      } else {
        cb(404, err)
      }
    } else {
      cb(404, err)
    }
  })
}
module.exports = readT
