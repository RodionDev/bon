const { errorPayload } = require("../../src/helpers")
const PERMITLEVELS = require("../../src/permits")
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
const permitT = (rib, packet, ribs, db, cb, engagedData) => {
  console.log("the real permitT")
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
    } else if (!permittedLevel) {
      permittedLevel = PERMITLEVELS.GOD
    }
  }
  let permit = engagedData.permit
  if (permit) {
    db.read(permit, (readErr, tokenData) => {
      if (!readErr && db.canExist(tokenData)) {
        let { permitAudience, validUntil } = tokenData.Permit
        if (validUntil > Date.now()) {
          if (
            isGOD(engagedData, permitAudience) ||
            (isLISTED(engagedData, permitAudience) &&
              PERMITLEVELS.LISTED === permittedLevel) ||
            PERMITLEVELS.AUTH === permittedLevel
          ) {
            cb(true, "", engagedData)
          } else {
            cb(
              false,
              errorPayload(
                "permitT",
                "Level denied",
                `Permission denied. ${permittedLevel} level required`,
                "Seek permission from owner"
              )
            )
          }
        } else {
          cb(false, errorPayload("permitT", "Permit not valid"))
        }
      } else {
        cb(false, errorPayload("permitT", "Permit not found", readErr))
      }
    })
  } else {
    if (permittedLevel === PERMITLEVELS.ANON) {
      cb(true, "", engagedData)
    } else {
      cb(
        false,
        errorPayload("permitT", "No `permitIdentifier` and no anonymous access")
      )
    }
  }
}
module.exports = permitT
