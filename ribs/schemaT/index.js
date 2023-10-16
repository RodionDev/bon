const { errorPayload } = require("../../src/helpers")
const OK = 103
const NOTOK = 406
const schemaT = (packet, ribs, db, cb) => {
  let { mainEntityOfPage } = packet
  mainEntityOfPage = mainEntityOfPage || "Thing"
  try {
    cb(OK, require(`../../Things/${mainEntityOfPage}.json`))
  } catch (schemaError) {
    cb(
      NOTOK,
      errorPayload(
        "schemaT",
        `${mainEntityOfPage} Schema not found`,
        schemaError
      )
    )
  }
}
module.exports = schemaT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
