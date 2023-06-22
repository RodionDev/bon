"use strict"
var Datastore = require('nedb');
var things = new Datastore();
const {
  deleteError,
  deleteSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    await things.findOne({ _id: req.params._id }, function(e, deletedableT) {
      if (e) {
        let err = deleteError(e)
        res.status(err.name).json(err)
      } else if (!thingTypeMatched(deletedableT, thingType)) {
        let err = thingTypeError("delete", thingType)
        res.status(err.name).json(err)
      } else {
        things.remove({ _id: { $regex: req.params._id } }, function(e, numDeleted) {
          if (e) {
            let err = deleteError(e)
            res.status(err.name).json(err)
          } else {
            let success = deleteSuccess(thingType)
            res.status(success.name).json(success)
          }
        })
      }
    })
  }
}
