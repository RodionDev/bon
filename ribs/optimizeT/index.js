const fs = require("fs")
const path = require("path")
const {
  summariseT,
} = require("../../src/helpers")
const { authT } = require("../../spine")
const listT = require("../listT")
const optimizeT = (packet, db, cb) => {
  authT("optimizeT", packet, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      let { identifier, name } = packet
      let reportOnStatusList = engagedData.ItemList.itemListElement.reduce(
        (acc, thing) => {
        let  actionStatus = thing.Action?.actionStatus || "PotentialActionStatus"
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
      cb(
        200,
        reportOnStatusList
      )
    } else {
      cb(404, authError)
    }
  }) 
}
module.exports = optimizeT
