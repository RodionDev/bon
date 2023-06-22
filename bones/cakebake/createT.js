"use strict"
const Cakebase = require('cakebase')("../database.json");
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
      let createdT = Cakebase.set(createT)
      res.status(201).send(createdT)
    }
  }
}
