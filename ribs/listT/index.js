const {
  successPayload,
  errorPayload,
  summarizeT,
} = require("../../src/helpers")
const STATUSCODE = 201
const listT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("listT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      let { identifier, sameAs } = packet
      if (engagedData.ItemList.itemListElement) {
        let engagedList = [...engagedData.ItemList.itemListElement]
        if (sameAs) {
          engagedList = engagedList.filter(
            item => item.mainEntityOfPage === sameAs
          )
        }
        db.list(engagedList, (listError, listData) => {
          if (!listError) {
            cb(
              200,
              listData.map(listedThing => summarizeT(listedThing))
            )
          } else {
            cb(
              500,
              errorPayload(
                "listT",
                `Could not get ${identifier} Thing's list`,
                listError
              )
            )
          }
        })
      } else {
        cb(200, successPayload("listT", `${identifier} Thing list is empty`))
      }
    } else {
      cb(404, authError)
    }
  })
}
module.exports = listT
exports = module.exports
exports.STATUSCODE = STATUSCODE
