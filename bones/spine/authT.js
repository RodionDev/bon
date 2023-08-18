const { errorPayload } = require("../helpers")
const engageT = require("./engageT")
const permitT = require("./permitT")
const authT = (rib, packet, db, cb) => {
  engageT(packet, db, (exists, err, engagedData) => {
    if (exists) {
      permitT(rib, packet, db, engagedData, (permitted, err) => {
        if (permitted) {
          cb(true, {}, engagedData)
        } else {
          cb(false, errorPayload(err))
        }
      })
    } else {
      cb(false, errorPayload("The thing could not be found"))
    }
  })
}
module.exports = authT
