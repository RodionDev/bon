const { errorPayload } = require("../helpers")
const engageT = (packet, db, cb) => {
  let { identifier } = packet
  if (identifier) {
    db.read(packet, (err, engagedData) => {
      if (!err && engagedData) {
        cb(true, {}, engagedData)
      } else {
        cb(false, errorPayload(`${identifier} Thing not found`, err))
      }
    })
  } else {
    cb(
      false,
      errorPayload(
        "Missing `identifier`",
        "No `identifier` parameter was included in the data packet"
      )
    )
  }
}
module.exports = engageT
