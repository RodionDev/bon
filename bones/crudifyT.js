const { errorPayload } = require("./helpers")
const ribs = require("./ribs")
const crudifyT = (rib, packet, db, cb) => {
  if (rib === "pingT") {
    cb(200, {
      identifier: "pingT",
      mainEntityOfPage: "Action",
      Action: { actionStatus: "CompletedActionStatus" },
    })
  } else if (!ribs.hasOwnProperty(rib)) {
    cb(
      404,
      errorPayload(
        "Rib not found",
        `No endpoint found with the name ${rib}`,
        "Check the server"
      )
    )
  } else {
    ribs[rib](packet, db, cb)
  }
}
module.exports = crudifyT
