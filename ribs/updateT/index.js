const { errorPayload, hash } = require("../../src/helpers")
const { assign, merge } = require("lodash")
const OK = 202
const NOTOK = 400
const updateT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("updateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      delete packet.ItemList.itemListElement 
      let normalLodashMerge = merge(engagedData, packet)
      db.update(normalLodashMerge, (updateErr, updatedThing) => {
        if (!updateErr) {
          cb(OK, updatedThing)
        } else {
          let { identifier } = packet
          cb(
            NOTOK,
            errorPayload(
              "updateT",
              `${identifier} Thing could not be updated`,
              updateErr
            )
          )
        }
      })
    } else {
      cb(NOTOK, authError)
    }
  })
}
module.exports = updateT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
