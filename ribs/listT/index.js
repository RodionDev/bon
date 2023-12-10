const {
  successPayload,
  errorPayload,
  summarizeT,
} = require("../../src/helpers")
const OK = 200
const NOTOK = 404
const listT = (packet, ribs, db, cb) => {
  console.count("the Real inviteT")
  const { authT } = ribs
  authT("listT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
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
              OK,
              listData.map(listedThing => summarizeT(listedThing))
            )
          } else {
            cb(
              NOTOK,
              errorPayload(
                "listT",
                `Could not get ${identifier} Thing's list`,
                listError
              )
            )
          }
        })
      } else {
        cb(NOTOK, successPayload("listT", `${identifier} Thing list is empty`))
      }
    } else {
      cb(NOTOK, authError)
    }
  })
}
module.exports = listT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
