"use strict"
const Cakebase = require('cakebase')("../database.json");
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
    let updateT = req.body
    updateT.updated = Date.now()
    updateT.updatedBy = req.user._id
    let updatedT = Cakebase.update(e => e._id === req.params._id, updateT);
    let success = updateSuccess(thingType)
    res.status(success.name).send(updatedT)
  }
}
