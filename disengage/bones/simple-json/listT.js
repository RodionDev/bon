"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    const thingList = db.JSON().filter(t => thing.list.includes(t._id))
    res.status(200).send(thingList)
  }
}
