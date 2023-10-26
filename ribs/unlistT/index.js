const { errorPayload } = require("../../src/helpers")
const OK = 301
const NOTOK = 304
const unlistT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT(
    "unlistT",
    { identifier: packet.subjectOf },
    ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canStore(engagedData)) {
        let { identifier } = packet
        let engagedList = new Set(
          engagedData.ItemList.itemListElement.map(e => e.identifier) || []
        )
        if (engagedList.delete(identifier)) {
          engagedData.ItemList.itemListElement =
            engagedData.ItemList.itemListElement.filter(
              e => e.identifier !== identifier
            )
          db.update(engagedData, updateErr => {
            if (!updateErr) {
              delete engagedData.password
              cb(OK, "", engagedData)
            } else {
              cb(
                NOTOK,
                errorPayload(
                  "unlistT",
                  `Could not unlistT ${engagedIdentifier} Thing`,
                  updateErr
                )
              )
            }
          })
        } else {
          cb(
            NOTOK,
            errorPayload("unlistT", `${identifier} Thing wasn't listed`)
          )
        }
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}
module.exports = unlistT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
