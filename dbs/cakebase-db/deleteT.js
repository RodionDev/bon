"use strict"
const Cakebase = require("cakebase")("../database.json")
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
    const deletedableT = Cakebase.get(e => e._id === req.params._id)
    Cakebase.remove(deletedableT)
    let success = deleteSuccess(thingType)
    res.status(success.name).json(success)
  }
}
