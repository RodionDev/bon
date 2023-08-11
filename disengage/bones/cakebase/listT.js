"use strict"
const Cakebase = require("cakebase")("../database.json")
var things = new Datastore()
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    const thingList = Cakebase.get(e => engagedThing.list.includes(e._id))
    res.status(200).send(thingList)
  }
}
