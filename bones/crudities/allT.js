"use strict"
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let thing = res.locals.thing
    let query = Thing.find()
    query.select(settings.slim)
    query.setOptions({ lean: true })
    await query.exec((e, thingList) => {
      if (e) {
        let err = getError(e)
        console.log({ ______APP______: "err.name"}, err.name)
        res.status(err.name).json(err).end()
      } else {
        res.status(200).send(thingList)
      }
    })
  }
}
