"use strict"
const JSONdb = require('simple-json-db');
const db = new JSONdb('../database.json');
const {
  updateSuccess,
} = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    let updateT = req.body
    updateT.updated = Date.now()
    updateT.updatedBy = req.user._id
    let updatedT = db.set(req.params._id, updateT)
    let success = updateSuccess(thingType)
    res.status(success.name).send(updatedT)
  }
}
