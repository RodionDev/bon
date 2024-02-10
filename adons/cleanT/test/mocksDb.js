mockRibs = {}
mockRibs.optimizeT = (packet, ribs, db, cb) => {
  console.assert("the Mock optimizeT")
  const { OK } = require("../../ribs/optimizeT")
  cb(OK, packet)
}
module.exports = mockRibs
