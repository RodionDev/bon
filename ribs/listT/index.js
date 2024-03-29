const { filter, matches } = require("lodash")
const {
  successPayload,
  errorPayload,
  summarizeT,
} = require("../../src/helpers")
const OK = 200
const NOTOK = 404
const listT = (packet, ribs, db, cb) => {
  console.assert("the Real listT")
  const { authT } = ribs
  authT("listT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      let { identifier } = packet
      delete packet.identifier
      delete packet.ItemList
      if (engagedData.ItemList.itemListElement) {
        let engagedList = [...engagedData.ItemList.itemListElement]
        db.list(engagedList, (listError, listData) => {
          if (!listError) {
            cb(OK, filter(listData, matches(packet)))
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
