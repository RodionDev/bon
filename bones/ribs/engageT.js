"use strict"
const { getError, permissionError } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res, next) => {
    const engagedThing = {
      _id: "GOD",
      name: "Tim Bushell"
    };
    res.locals.engagedThing = engagedThing
    next()
  }
}
