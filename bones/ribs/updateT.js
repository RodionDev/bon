"use strict"
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
    let createT = req.body
    createT.updated = Date.now()
    createT.updatedBy = req.user._id
    await Thing.updateOne(
      { _id: req.params._id },
      { $set: createT },
      { returnOriginal: false },
      e => {
        if (e) {
          let err = updateError(e)
          res.status(err.name).json(err).end()
        } else {
          let success = updateSuccess(thingType)
          res.status(success.name).send(success)
        }
      }
    )
  }
}
