"use strict"
const {
  deleteError,
  deleteSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { isPermitted, thingTypeMatched } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    await Thing.findById(req.params._id, (e, deletedableT) => {
      if (e) {
        let err = deleteError(e)
        res.status(err.name).json(err)
      } else if (!thingTypeMatched(deletedableT, thingType)) {
        let err = thingTypeError("delete", thingType)
        res.status(err.name).json(err)
      } else {
        Thing.deleteOne({ _id: req.params._id }, e => {
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
