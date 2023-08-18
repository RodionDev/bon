const { successPayload, errorPayload, summariseT } = require("../helpers")
const authT = require("../spine/authT")
const listT = (packet, db, cb) => {
  authT(
    "listT",
    { identifier: packet.identifier },
    db,
    (permitted, err, engagedData) => {
      if (permitted && engagedData) {
        let { identifier, mainEntityOfPage } = packet
        if (engagedData.ItemList.itemListElement) {
          let engagedList = [...engagedData.ItemList.itemListElement]
          if (mainEntityOfPage) {
            engagedList = engagedList.filter(
              item => item.mainEntityOfPage === mainEntityOfPage
            )
          }
          db.list(engagedList, (err, listData) => {
            if (!err) {
              cb(
                200,
                listData.map(listedThing => summariseT(listedThing))
              )
            } else {
              cb(
                500,
                errorPayload(`Could not get ${identifier} Thing's list`, err)
              )
            }
          })
        } else {
          cb(200, successPayload(`${identifier} Thing list is empty`))
        }
      } else {
        cb(400, errorPayload(err))
      }
    }
  )
}
module.exports = listT
