"use strict"
const { deleteError, deleteSuccess } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    await engagedThing.delete()
    if (e) {
      let err = deleteError(e)
      res.status(err.name).json(err)
    } else {
      let success = deleteSuccess(thingType)
      res.status(success.name).json(success)
    }
  }
}
