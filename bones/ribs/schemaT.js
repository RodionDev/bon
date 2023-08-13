const schemaT = (packet, db, cb) => {
  let { mainEntityOfPage } = packet
  mainEntityOfPage = mainEntityOfPage || "Thing"
  try {
    cb(200, require(`../../Things/${mainEntityOfPage}.json`))
  } catch (err) {
    cb(404, { Error: `${mainEntityOfPage} Schema not found.`, Reason: err })
  }
}
module.exports = schemaT
