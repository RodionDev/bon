"use strict"
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    res.locals.engagedThing
    res.status(200).send({})
  }
}
