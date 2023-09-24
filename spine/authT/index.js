const { errorPayload } = require("../../src/helpers")
const authT = (rib, packet, ribs, db, cb) => {
  const {engageT, permitT} = ribs
  engageT(packet, ribs, db, (exists, engageErr, engagedData) => {
    if (exists) {
      permitT(rib, packet, ribs, db, engagedData, (permitted, permitErr) => {
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
