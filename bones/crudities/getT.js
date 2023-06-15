"use strict"
module.exports = Thing => {
  return async (req, res) => {
    console.log({ ______APP______: "res.locals.thing"}, res.locals.thing)
    res.status(200).send(res.locals.thing)
  }
}
