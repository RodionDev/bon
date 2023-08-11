const authT = require("../spine/authT")
const unlistT = (packet, db, cb) => {
  authT("unlistT", packet, db, (permitted, err, engagedData) => {
    if (permitted && engagedData) {
      let { engagedIdentifier, identifier, packet, mainEntityOfPage } = packet
      let engagedList = new Set(engagedData.ItemList.itemListElement || [])
      let listKey = [...engagedList.values()].find(
        item => item.identifier === identifier
      )
      if (listKey && engagedList.delete(listKey)) {
        engagedData.ItemList.itemListElement = [...engagedList]
        db.update(mainEntityOfPage, engagedIdentifier, engagedData, err => {
          if (!err) {
            delete engagedData.password
            cb(200, engagedData)
          } else {
            cb(500, {
              Error: `Could not unlistT ${engagedIdentifier} Thing.`,
              Reason: err,
            })
          }
        })
      } else {
        cb(200, { Message: `${identifier} Thing wasn't listed.` })
      }
    } else {
      cb(400, err)
    }
  })
}
module.exports = unlistT
