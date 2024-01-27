const { BigUp, errorPayload, bigUp } = require("../../src/helpers")
const OK = 103
const NOTOK = 406
const schemaT = (packet, ribs, db, cb) => {
  console.assert("the Real schemaT")
  let { mainEntityOfPage } = packet
  if (mainEntityOfPage) {
    let properEntity =
      mainEntityOfPage[0].toUpperCase() + mainEntityOfPage.slice(1)
    if (mainEntityOfPage === properEntity) {
      cb(OK, BigUp({ ...packet, mainEntityOfPage: properEntity }))
    } else {
      cb(OK, bigUp({ ...packet, mainEntityOfPage: properEntity }))
    }
  } else {
    cb(
      NOTOK,
      errorPayload(
        "schemaT",
        `${mainEntityOfPage} Schema could not be found`,
        "Try `schemaT Thing` or `schemaT action` or `schemaT --mainEntityOfPage=creativeWork`"
      )
    )
  }
}
module.exports = schemaT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
