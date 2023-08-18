const { errorPayload } = require("../helpers")
const schemaT = (packet, db, cb) => {
  let { mainEntityOfPage } = packet
  mainEntityOfPage = mainEntityOfPage || "Thing"
  try {
    cb(200, require(`../../Things/${mainEntityOfPage}.json`))
  } catch (err) {
    cb(404, errorPayload(`${mainEntityOfPage} Schema not found`, err))
  }
}
module.exports = schemaT
