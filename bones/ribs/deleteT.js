const { successPayload, errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const deleteT = (packet, db, cb) => {
  authT(
    "deleteT",
    { identifier: packet.identifier },
    db,
    (permitted, authError, _) => {
      if (permitted) {
        db.delete(packet, deleteError => {
          let { identifier } = packet
          if (!deleteError) {
            cb(
              200,
              successPayload(
                `${identifier} Thing deleted`,
                `unlist ${identifier}`
              )
            )
          } else {
            cb(
              500,
              errorPayload(`Could not delete ${identifier} Thing`, deleteError)
            )
          }
        })
      } else {
        cb(400, authError)
      }
    }
  )
}
module.exports = deleteT
