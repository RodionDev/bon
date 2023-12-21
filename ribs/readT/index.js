const { errorPayload } = require("../../src/helpers")
const OK = 200
const NOTOK = 404
const readT = (packet, ribs, db, cb) => {
  console.count("the Real readT")
  const { authT } = ribs
  authT("readT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted) {
      if (db.canStore(engagedData)) {
        delete engagedData.password
        let { sameAs } = packet
        if (sameAs) {
          cb(200, engagedData[sameAs])
        } else {
          cb(200, engagedData)
        }
      } else {
        cb(
          666,
          errorPayload("readT", "Empty record", "", "Undestroy the record")
        )
      }
    } else {
      cb(404, authError)
    }
  })
}
module.exports = readT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
