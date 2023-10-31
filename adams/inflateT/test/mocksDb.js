mockRibs = {}
mockRibs.optimizeT = (packet, ribs, db, cb) => {
  console.count("the Mock optimizeT")
  const { OK } = require("../../ribs/optimizeT")
  cb(OK, packet)
}
module.exports = mockRibs
