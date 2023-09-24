const { errorPayload } = require("../../src/helpers")
const schemaT = (packet, ribs, db, cb) => {
  let { mainEntityOfPage } = packet
  mainEntityOfPage = mainEntityOfPage || "Thing"
  try {
    cb(200, require(`../../Things/${mainEntityOfPage}.json`))
  } catch (schemaError) {
    cb(
      404,
      errorPayload(
        "schemaT",
        `${mainEntityOfPage} Schema not found`,
        schemaError
      )
    )
  }
}
module.exports = schemaT
