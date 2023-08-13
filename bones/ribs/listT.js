const authT = require("../spine/authT")
const listT = (packet, db, cb) => {
  authT("listT", packet, db, (permitted, err, engagedData) => {
    if (permitted && engagedData) {
      let { identifier } = packet
      if (engagedData.ItemList.itemListElement) {
        let engagedList = [...engagedData.ItemList.itemListElement]
        if (mainEntityOfPage) {
          engagedList = engagedList.filter(
            item => item.mainEntityOfPage === mainEntityOfPage
          )
        }
        db.list(engagedList, (err, listData) => {
          if (!err) {
            cb(200, listData)
          } else {
            cb(500, {
              Error: `Could not get ${identifier} Thing's list.`,
              Reason: err,
            })
          }
        })
      } else {
        cb(200, { Message: `${identifier} Thing list is empty.` })
      }
    } else {
      cb(400, err)
    }
  })
}
module.exports = listT
