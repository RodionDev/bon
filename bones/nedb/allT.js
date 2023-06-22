"use strict"
var Datastore = require('nedb');
var things = new Datastore();
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let thing = res.locals.thing
    await things.find({ thing: req.params.engage}, function (e, thingList) {
     if (e) {
       let err = getError(e)
       res.status(err.name).json(err).end()
     } else {
       res.status(200).send(thingList)
     }
    })
  }
}
