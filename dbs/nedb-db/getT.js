"use strict"
module.exports = Thing => {
  return async (req, res) => {
    res.status(200).send(res.locals.engagedThing)
  }
}
