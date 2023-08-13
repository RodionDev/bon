const engageT = (packet, db, cb) => {
  let { identifier } = packet
  if (identifier) {
    db.read(packet, (err, engagedData) => {
      if (!err && engagedData) {
        cb(true, {}, engagedData)
      } else {
        cb(false, { Error: `${identifier} Thing not found.` })
      }
    })
  } else {
    cb(false, { Error: "Missing `identifier`." })
  }
}
module.exports = engageT
