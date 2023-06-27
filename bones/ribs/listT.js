"use strict"
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    let thingList = engagedThing.list.map(t => slim(t, settings.slim))
    if (e) {
      let err = getError(e)
      res.status(err.name).json(err).end()
    } else {
      res.status(200).send(thingList)
    }
  }
}
