"use strict"
const Cakebase = require('cakebase')("../database.json")
const { PermitLevels } = require("../auth/permits")
const { getError, permissionError } = require("../utils/responseMessages")
module.exports = (action, Thing) => {
  return async (req, res, next) => {
    const thing = Cakebase.get(e => e._id === req.params._id);
    if (!thing.permits) {
      res.locals.thing = thing
      next()
    } else {
      let permitLevel = thing.permits.get(action)
      let banned = req.user.permits.get("banned")
      let permitted = false
      if (permitLevel === PermitLevels.AUTH) {
        permitted = !banned && req.user
      } else if (permitLevel === PermitLevels.GOD) {
        if (req.user) {
          permitted =
            (!banned && req.user._id.equals(thing.god)) ||
            req.user._id.equals(thing._id)
        }
      } else if (permitLevel === PermitLevels.LISTED) {
        if (req.user) {
          permitted =
            (!banned && thing.list.includes(req.user._id)) ||
            req.user._id.equals(thing.god) ||
            req.user._id.equals(thing._id)
        }
      } else {
        permitted = !banned
      }
      if (permitted) {
        res.locals.thing = thing
        next()
      } else {
        let err = permissionError(action, req.params.engage)
        res.status(err.name).json(err).end()
      }
    }
  }
}
