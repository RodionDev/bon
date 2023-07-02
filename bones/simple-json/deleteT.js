"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { deleteSuccess } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    const deletedableT = db.delete(req.params._id)
    let success = deleteSuccess(thingType)
    res.status(success.name).json(deletedableT)
  }
}
