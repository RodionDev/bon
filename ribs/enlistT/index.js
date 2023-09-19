const { successPayload, errorPayload } = require("../../src/helpers")
const { authT } = require("../../spine")
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
        if (!engagedList.has(identifier)) {
          engagedData.ItemList.itemListElement = [
            ...engagedData.ItemList.itemListElement,
            packet,
          ]
          db.update(engagedData, updateErr => {
            if (!updateErr) {
              delete engagedData.password
              cb(200, engagedData)
            } else {
              cb(
                500,
                errorPayload(
                  "enlistT",
                  `Could not enlist ${engagedData.identifier} Thing`,
                  updateErr,
                  "Check you are using the correct `identifier`"
                )
              )
            }
          })
        } else {
          cb(
            200,
            successPayload("enlistT", `${identifier} Thing already listed`)
          )
        }
      } else {
        cb(404, authError)
      }
    }
  )
}
module.exports = enlistT
