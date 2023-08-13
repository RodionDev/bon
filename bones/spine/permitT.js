const PERMITLEVELS = require("../permits")
const isGOD = (engagedData, permitAudience) => {
  return (
    engagedData.identifier === permitAudience ||
    engagedData.subjectOf === permitAudience
  )
}
const isLISTED = (engagedData, permitAudience) => {
  return (
    engagedData.ItemList &&
    engagedData.ItemList.itemListElement &&
    engagedData.ItemList.itemListElement
      .map(i => i.indentifier)
      .includes(permitAudience)
  )
}
const permitT = (rib, packet, db, engagedData, cb) => {
  let { identifier, mainEntityOfPage } = packet
  let permittedLevel = PERMITLEVELS.GOD
  if (engagedData.hasOwnProperty("permits")) {
    permittedLevel = engagedData.permits[rib]
    if (typeof permittedLevel == "object") {
      if (permittedLevel.hasOwnProperty(mainEntityOfPage)) {
        permittedLevel = permittedLevel[mainEntityOfPage]
      } else {
        permittedLevel = PERMITLEVELS.GOD
      }
    }
  }
  let permit = engagedData.permit
  if (permit) {
    db.read(permit, (err, tokenData) => {
      if (!err && tokenData) {
        let { permitAudience, validUntil } = tokenData.Permit
        if (validUntil > Date.now()) {
          if (
            isGOD(engagedData, permitAudience) ||
            (isLISTED(engagedData, permitAudience) &&
              PERMITLEVELS.LISTED === permittedLevel) ||
            PERMITLEVELS.AUTH === permittedLevel
          ) {
            cb(true)
          } else {
            cb(false, {
              Error: `Permission denied. ${permittedLevel} level required.`,
            })
          }
        } else {
          cb(false, { Error: "Permit not valid." })
        }
      } else {
        cb(false, { Error: "Permit not found." })
      }
    })
  } else {
    if (permittedLevel === PERMITLEVELS.ANON) {
      cb(true)
    } else {
      cb(false, { Error: "No `permitIdentifier` and no anonymous access." })
    }
  }
}
module.exports = permitT
