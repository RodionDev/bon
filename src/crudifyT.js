const { errorPayload } = require("./helpers")
const ribs = require("../ribs")
const crudifyT = (rib, packet, db, cb) => {
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
    ribs[rib](packet, db, cb)
  }
}
module.exports = crudifyT
