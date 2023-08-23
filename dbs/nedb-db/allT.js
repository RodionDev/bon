"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    await things.find({ thing: req.params.engage }, function (e, thingList) {
      if (e) {
        let Err = getError(e)
        res.status(Err.name).json(Err).end()
      } else {
        res.status(200).send(thingList)
      }
    })
  }
}
