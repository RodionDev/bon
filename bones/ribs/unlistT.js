const { errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const unlistT = (packet, db, cb) => {
  authT(
    "unlistT",
    { identifier: packet.subjectOf },
    db,
    (permitted, err, engagedData) => {
      if (permitted && engagedData) {
        let { identifier } = packet
        let engagedList = new Set(engagedData.ItemList.itemListElement || [])
        let listKey = [...engagedList.values()].find(
          item => item.identifier === identifier
        )
        if (listKey && engagedList.delete(listKey)) {
          engagedData.ItemList.itemListElement = [...engagedList]
          db.update(engagedData, err => {
            if (!err) {
              delete engagedData.password
              cb(200, engagedData)
            } else {
              cb(
                500,
                errorPayload(
                  `Could not unlistT ${engagedIdentifier} Thing`,
                  err
                )
              )
            }
          })
        } else {
          cb(200, errorPayload(`${identifier} Thing wasn't listed`))
        }
      } else {
        cb(400, errorPayload(err))
      }
    }
  )
}
module.exports = unlistT
