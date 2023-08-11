const authT = require("../spine/authT")
const enlistT = (packet, db, cb) => {
  authT("enlistT", packet, db, (permitted, err, engagedData) => {
    if (permitted && engagedData) {
      let { identifier, mainEntityOfPage } = packet
      let engagedList = new Set(engagedData.ItemList.itemListElement || [])
      let listKey = [...engagedList.values()].find(
        item => item.identifier === identifier
      )
      if (!engagedList.has(listKey)) {
        engagedList.add({
          identifier: identifier,
          mainEntityOfPage: mainEntityOfPage,
        })
        engagedData.ItemList.itemListElement = [...engagedList]
        db.update(
          engagedData.mainEntityOfPage,
          engagedData.identifier,
          engagedData,
          err => {
            if (!err) {
              delete engagedData.password
              cb(200, engagedData)
            } else {
              cb(500, {
                Error: `Could not enlist ${engagedData.identifier} Thing.`,
                Reason: err,
              })
            }
          }
        )
      } else {
        cb(200, { Message: `${identifier} Thing already listed.` })
      }
    } else {
      cb(400, err)
    }
  })
}
module.exports = enlistT
