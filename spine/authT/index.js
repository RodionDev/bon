const { errorPayload } = require("../../src/helpers")
const authT = (rib, packet, ribs, db, cb) => {
  console.log("the real authT")
  const { engageT, permitT } = ribs
  engageT(rib, packet, ribs, db, (exists, engageErr, engagedData) => {
    if (exists) {
      const permitCb = (permitted, permitErr, permittedData) => {
        if (permitted && db.canExist(permittedData)) {
          cb(true, "", permittedData)
        } else {
          cb(false, errorPayload("authT", permitErr))
        }
      }
      permitT(rib, engagedData, ribs, db, permitCb, packet)
    } else {
      cb(
        false,
        errorPayload("authT", "The thing could not be found", engageErr)
      )
    }
  })
}
module.exports = authT
