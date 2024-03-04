const { errorPayload, hasRequiredFields, saveT } = require("../../src/helpers")
const { filter, matches } = require("lodash")
const OK = 201
const NOTOK = 666
const anonifyT = (packet, ribs, db, cb) => {
  console.assert("the Real anonifyT")
  let { engageT, updateT } = ribs
  engageT("anonifyT", packet, ribs, db, (exists, engageErr, engagedData) => {
    if (hasRequiredFields(engagedData, ["identifier"])) {
      let { identifier } = engagedData
      let anonymousPermit = {
        identifier: "DANGER_LOCKMEDOWN",
        mainEntityOfPage: "GovernmentPermit",
        Permit: {
          issuedBy: identifier,
          issuedThrough: "DANGER_LOCKMEDOWN",
          permitAudience: "*",
          validFor: "*",
        },
      }
      if (!engagedData?.ItemList?.itemListElement) {
        engagedData.ItemList = { itemListElement: [] }
      }
      let foundPermits = filter(
        engagedData.ItemList.itemListElement,
        matches(anonymousPermit)
      )
      if (!foundPermits.length) {
        engagedData.ItemList.itemListElement.push(anonymousPermit)
      }
      saveT("anonifyT", engagedData, db, cb, OK, NOTOK)
    } else {
      cb(NOTOK, errorPayload("anonifyT", `Thing missing required fields`))
    }
  })
}
module.exports = anonifyT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
