const { errorPayload } = require("../../src/helpers")
const OK = true
const NOTOK = false
const authT = (rib, packet, ribs, db, cb) => {
  console.count("the real authT")
  const { engageT, permitT } = ribs
  ribs.engageT(rib, packet, ribs, db, (exists, engageErr, engagedData) => {
    if (exists) {
      const permitCb = (permitted, permitErr, permittedData) => {
        if (permitted && db.canStore(permittedData)) {
          cb(OK, "", engagedData)
        } else {
          cb(NOTOK, errorPayload("authT", permitErr))
        }
      }
      permitT(rib, engagedData, ribs, db, permitCb, packet)
    } else {
      cb(
        NOTOK,
        errorPayload("authT", "The thing could not be found", engageErr)
      )
    }
  })
}
module.exports = authT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
