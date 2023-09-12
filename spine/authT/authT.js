const { errorPayload } = require("../helpers")
const engageT = require("./engageT")
const permitT = require("./permitT")
const authT = (rib, packet, db, cb) => {
  engageT(packet, db, (exists, engageErr, engagedData) => {
    if (exists) {
      permitT(rib, packet, db, engagedData, (permitted, permitErr) => {
        if (permitted && db.canExist(engagedData)) {
          cb(true, null, engagedData)
        } else {
          cb(false, errorPayload("authT", permitErr), {})
        }
      })
    } else {
      cb(
        false,
        errorPayload("authT", "The thing could not be found", engageErr)
      )
    }
  })
}
module.exports = authT
