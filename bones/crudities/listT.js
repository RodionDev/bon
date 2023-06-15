"use strict"
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let thing = res.locals.thing
    let query = Thing.find()
    query.select(settings.slim)
    query.setOptions({ lean: true })
    query.where("_id").in(thing.list)
    if (thingType) query.where("thing").eq(thingType)
    await query.exec((e, thingList) => {
      if (e) {
        let err = getError(e)
        res.status(err.name).json(err).end()
      } else {
        res.status(200).send(thingList)
      }
    })
  }
}
