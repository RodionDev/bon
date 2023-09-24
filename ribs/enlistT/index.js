const { successPayload, errorPayload } = require("../../src/helpers")
const enlistT = (packet, ribs, db, cb) => {
  const { authT, engageT } = ribs
  authT(
    "enlistT",
    { identifier: packet.subjectOf }, ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canExist(engagedData)) {
        let { identifier } = packet
        let engagedList = new Set(
          engagedData.ItemList.itemListElement.map(e => e.identifier) || []
        )
        if (!engagedList.has(identifier)) {
          engageT(
            { identifier: packet.identifier },  ribs,
            db,
            (exists, engageErr, engagedListItem) => {
              if (exists) {
                engagedData.ItemList.itemListElement = [
                  ...engagedData.ItemList.itemListElement,
                  engagedListItem,
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
                        `Could not enlist ${packet.identifier} Thing`,
                        updateErr
                      )
                    )
                  }
                })
              } else {
                cb(
                  500,
                  errorPayload(
                    "enlistT",
                    `Could not find ${engagedData.identifier} Thing`,
                    engageErr,
                    "Record missing. Find it - or use `takeonT` instead"
                  )
                )
              }
            }
          )
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
