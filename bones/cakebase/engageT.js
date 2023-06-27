"use strict"
const Cakebase = require('cakebase')("../database.json")
const { getError, permissionError } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res, next) => {
    try {
    } catch (e) {
    }
    const engagedThing = Cakebase.get(e => e._id === req.params._id);
    res.locals.engagedThing = engagedThing
    next()
  }
}
