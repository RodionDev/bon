const { successPayload, errorPayload, summariseT } = require("../helpers")
const authT = require("../spine/authT")
const { summariseT } = require("../helpers")
const enlistT = (packet, db, cb) => {
  authT(
    "enlistT",
    { identifier: packet.subjectOf },
    db,
    (permitted, err, engagedData) => {
      if (permitted && engagedData) {
        let { identifier } = packet
        let engagedList = new Set(engagedData.ItemList.itemListElement || [])
        let listKey = [...engagedList.values()].find(
          item => item.identifier === identifier
        )
        if (!engagedList.has(listKey)) {
          engagedList.add(summariseT(packet))
          engagedData.ItemList.itemListElement = [...engagedList]
          db.update(engagedData, err => {
            if (!err) {
              delete engagedData.password
              cb(200, engagedData)
            } else {
              cb(
                500,
                errorPayload(
                  `Could not enlist ${engagedData.identifier} Thing`,
                  err,
                  "Check you are using the correct `identifier`"
                )
              )
            }
          })
        } else {
          cb(200, successPayload(`${identifier} Thing already listed`))
        }
      } else {
        cb(400, errorPayload(err))
      }
    }
  )
}
module.exports = enlistT
