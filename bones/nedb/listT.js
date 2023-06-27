"use strict"
var Datastore = require('nedb');
var things = new Datastore();
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    await things.find({ _id: { $in: thing.list }}, function(e, thingList) {
      if (e) {
        let err = getError(e)
        res.status(err.name).json(err).end()
      } else {
        res.status(200).send(thingList)
      }
    })
  }
}
