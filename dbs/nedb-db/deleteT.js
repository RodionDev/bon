"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const {
  deleteError,
  deleteSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    await things.findOne({ _id: req.params._id }, function (e, deletedableT) {
      if (e) {
        let Err = deleteError(e)
        res.status(Err.name).json(Err)
      } else if (!thingTypeMatched(deletedableT, thingType)) {
        let Err = thingTypeError("delete", thingType)
        res.status(Err.name).json(Err)
      } else {
        things.remove(
          { _id: { $regex: req.params._id } },
          function (e, numDeleted) {
            if (e) {
              let Err = deleteError(e)
              res.status(Err.name).json(Err)
            } else {
              let success = deleteSuccess(thingType)
              res.status(success.name).json(success)
            }
          }
        )
      }
    })
  }
}
