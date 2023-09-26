const { errorPayload } = require("../../src/helpers")
const engageT = (packet, ribs, db, cb) => {
  let { identifier } = packet
  console.log("############## engageT", { packet, ribs, db })
  if (identifier) {
    db.read(packet, (readErr, engagedData) => {
      if (!readErr && db.canExist(engagedData)) {
        cb(true, null, engagedData)
      } else {
        cb(
          false,
          errorPayload("engageT", `${identifier} Thing not found`, readErr)
        )
      }
    })
  } else {
    cb(
      false,
      errorPayload(
        "engageT",
        "Missing `identifier`",
        "No `identifier` parameter was included in the data packet"
      )
    )
  }
}
module.exports = engageT
