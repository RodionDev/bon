"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const {
  updateError,
  updateSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    if (!thingTypeMatched(thing, thingType)) {
      let Err = thingTypeError("update", thingType)
      res.status(Err.name).json(Err).end()
    } else {
      let updateT = req.body
      updateT.updated = Date.now()
      updateT.updatedBy = req.user._id
      things.update(
        { _id: req.params._id },
        updateT,
        {},
        function (e, numReplaced) {
          if (e) {
            let Err = updateError(e)
            res.status(Err.name).json(Err).end()
          } else {
            let success = updateSuccess(thingType)
            res.status(success.name).send(success)
          }
        }
      )
    }
  }
}
