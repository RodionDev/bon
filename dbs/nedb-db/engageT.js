"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const { PermitLevels } = require("../auth/permits")
const { getError, permissionError } = require("../utils/responseMessages")
module.exports = (action, Thing) => {
  return async (req, res, next) => {
    await things.findOne({ _id: req.params._id }, function (e, engagedThing) {
      if (e) {
        let Err = getError(e)
        res.status(Err.name).json(Err).end()
      } else {
        res.locals.engagedThing = engagedThing
        next()
      }
    })
  }
}
