const { errorPayload } = require("./helpers")
const boneUp = (rib, packet, ribs, db, cb) => {
  if (!ribs.hasOwnProperty(rib)) {
    cb(
      404,
      errorPayload(
        rib,
        "Rib not found",
        `No endpoint found with the name ${rib}`,
        "Check server setup"
      )
    )
  } else {
    ribs[rib](packet, ribs, db, cb)
  }
}
module.exports = boneUp
