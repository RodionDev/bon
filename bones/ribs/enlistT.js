const { successPayload, errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const enlistT = (packet, db, cb) => {
  authT(
    "enlistT",
    { identifier: packet.subjectOf },
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canExist(engagedData)) {
        let { identifier } = packet
        let engagedList = new Set(
          engagedData.ItemList.itemListElement.map(e => e.identifier) || []
        )
        console.log({engagedList,identifier })
        if (!engagedList.has(identifier)) {
          engagedList.add(packet)
          engagedData.ItemList.itemListElement = [...engagedList]
          db.update(engagedData, updateErr => {
            if (!updateErr) {
              delete engagedData.password
              cb(200, engagedData)
            } else {
              cb(
                500,
                errorPayload(
                  `Could not enlist ${engagedData.identifier} Thing`,
                  updateErr,
                  "Check you are using the correct `identifier`"
                )
              )
            }
          })
        } else {
          cb(200, successPayload(`${identifier} Thing already listed`))
        }
      } else {
        cb(404, authError)
      }
    }
  )
}
module.exports = enlistT
