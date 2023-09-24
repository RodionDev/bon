const { errorPayload } = require("../../src/helpers")
const unlistT = (packet, ribs, db, cb) => {
  const { authT } =ribs
  authT(
    "unlistT",
    { identifier: packet.subjectOf }, ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canExist(engagedData)) {
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
              cb(200, engagedData)
            } else {
              cb(
                500,
                errorPayload(
                  "unlistT",
                  `Could not unlistT ${engagedIdentifier} Thing`,
                  updateErr
                )
              )
            }
          })
        } else {
          cb(200, errorPayload("unlistT", `${identifier} Thing wasn't listed`))
        }
      } else {
        cb(404, authError)
      }
    }
  )
}
module.exports = unlistT
