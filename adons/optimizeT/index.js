const fs = require("fs")
const path = require("path")
const { pick } = require("lodash")
const { summarizeT } = require("../../src/helpers")
const OK = 201
const NOTOK = 417
const optimizeT = (packet, ribs, db, cb) => {
  console.count("the Real optimizeT")
  const { listT } = ribs
  let { subjectOf } = packet
  listT(packet, ribs, db, (listStatusCode, listedData) => {
    let reportOnStatusList = listedData
      .filter(thing => thing.mainEntityOfPage === "Action")
      .filter(thing => thing.Action.actionStatus !== "CompletedActionStatus")
      .map(thing =>
        pick(thing, ["identifier", "alternateName", "potentialAction"])
      )
    if (reportOnStatusList.length > 0) {
      cb(OK, reportOnStatusList)
    } else {
      cb(OK, {
        identifier: "ActionsCompleted",
        name: "Nice. You exceeded expectations.",
        potentialAction: "None! You did them all!",
      })
    }
  }) 
}
module.exports = optimizeT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
