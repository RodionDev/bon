const engageT = (packet, db, cb) => {
  console.log("engageT", { packet })
  let { identifier, mainEntityOfPage } = packet
  if (identifier) {
    db.read(mainEntityOfPage, identifier, (err, engagedData) => {
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
