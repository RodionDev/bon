const { errorPayload } = require("./helpers")
const initializeT = require("./initializeT")
const boneUp = (packet, ribs, db, cb) => {
  const rib = packet._[0]
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
    ribs[rib](initializeT(packet), ribs, db, cb)
  }
}
module.exports = boneUp
