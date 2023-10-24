const { BigUp, errorPayload, bigUp } = require("../../src/helpers")
const OK = 103
const NOTOK = 406
const schemaT = (packet, ribs, db, cb) => {
  let { mainEntityOfPage } = packet
  if (mainEntityOfPage) {
    if (mainEntityOfPage[0] === mainEntityOfPage[0].toUpperCase()) {
      cb(OK, BigUp(packet))
    } else {
      cb(OK, bigUp(packet))
    }
  } else {
    cb(
      NOTOK,
      errorPayload(
        "schemaT",
        `${mainEntityOfPage} Schema could not be found`,
        schemaError
      )
    )
  }
}
module.exports = schemaT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
