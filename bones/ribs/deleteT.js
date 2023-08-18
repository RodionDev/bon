const { successPayload, errorPayload } = require("../helpers")
const authT = require("../spine/authT")
const deleteT = (packet, db, cb) => {
  authT(
    "deleteT",
    { identifier: packet.identifier },
    db,
    (permitted, err, _) => {
      if (permitted) {
        db.delete(packet, err => {
          let { identifier } = packet
          if (!err) {
            cb(
              200,
              successPayload(
                `${identifier} Thing deleted`,
                `unlist ${identifier}`
              )
            )
          } else {
            cb(500, errorPayload(`Could not delete ${identifier} Thing`, err))
          }
        })
      } else {
        cb(400, errorPayload("Not permitted", err))
      }
    }
  )
}
module.exports = deleteT
