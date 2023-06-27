"use strict"
const JSONdb = require('simple-json-db');
const db = new JSONdb('../database.json');
const { getError, permissionError } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    const engagedThing = db.get(req.params._id)
    res.locals.engagedThing = engagedThing
    next()
  }
}
