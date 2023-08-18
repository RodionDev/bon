"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const { createError, thingTypeError } = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let createT = req.body
    if (!thingTypeMatched(createT, thingType)) {
      let err = thingTypeError("create", thingType)
      res.status(err.name).json(err).end()
    } else {
      createT.created = Date.now()
      createT.createdBy = req.params._id
      createT.god = req.user._id
      createT.thing = thingType
      things.insert(createT, function (err, createdT) {
        res.locals.engagedThing.list.push(createdT._id)
        res.status(201).send(createdT)
      })
    }
  }
}
