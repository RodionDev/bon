const fs = require("fs")
const path = require("path")
const { summarizeT } = require("../../src/helpers")
const OK = 201
const NOTOK = 417
const optimizeT = (packet, ribs, db, cb) => {
  console.count("the Real optimizeT")
  const { authT, listT } = ribs
  authT("optimizeT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      let { identifier, name } = packet
      let reportOnStatusList = engagedData.ItemList.itemListElement.reduce(
        (acc, thing) => {
          let actionStatus =
            thing.Action?.actionStatus || "PotentialActionStatus"
          let findActionStatusReport = acc.ItemList.itemListElement.find(
            t => t.Action?.actionStatus === thing.Action?.actionStatus
          )
          if (findActionStatusReport) {
            findActionStatusReport.CreativeWork.interactionStatistic += 1
          } else {
            acc.ItemList.itemListElement.push({
              identifier: actionStatus,
              mainEntityOfPage: "CreativeWork",
              CreativeWork: { interactionStatistic: 0 },
            })
          }
          return acc
        },
        { identifier, name, ItemList: { itemListElement: [] } }
      )
      cb(OK, reportOnStatusList.ItemList.itemListElement)
    } else {
      cb(NOTOK, authError)
    }
  }) 
}
module.exports = optimizeT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
