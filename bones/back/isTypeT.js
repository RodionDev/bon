"use strict"
const {
  thingTypeError,
} = require("../utils/responseMessages")
const { thingIsTypeT } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    if (!thingIsTypeT(engagedThing, thingType)) {
      let err = thingTypeError("update", thingType)
      res.status(err.name).json(err).end()
    } else {
      next()
    }
  }
}
