const ribs = require("./ribs")
const crudifyT = (rib, packet, db, cb) => {
  if (rib === "pingT") {
    cb(200, {
      identifier: "elioBones",
      Action: { name: "pingT", statusCode: "CompletedActionStatus" },
    })
  } else if (!ribs.hasOwnProperty(rib)) {
    cb(404, { Error: "URL Endpoint not valid." })
  } else {
    ribs[rib](packet, db, cb)
  }
}
module.exports = crudifyT
