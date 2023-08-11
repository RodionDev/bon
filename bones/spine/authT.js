const engageT = require("./engageT")
const permitT = require("./permitT")
const authT = (rib, packet, db, cb) => {
  engageT(packet, db, (exists, err, engagedData) => {
    if (exists) {
      permitT(rib, packet, db, engagedData, (permitted, err) => {
        if (permitted) {
          cb(true, {}, engagedData)
        } else {
          cb(false, err)
        }
      })
    } else {
      cb(false, err)
    }
  })
}
module.exports = authT
