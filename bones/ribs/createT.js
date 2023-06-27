"use strict"
const { createError } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    let createT = req.body
    createT.created = Date.now()
    createT.createdBy = req.params._id
    createT.god = req.user._id
    createT.thing = thingType
    let createdT = await createT.save()
    if (e) {
      let err = createError(e)
      res.status(err.name).json(err).end()
    } else {
      engagedThing.list.push(createdT._id)
      await engagedThing.save()
      res.status(201).send(createdT)
    }
  }
}
