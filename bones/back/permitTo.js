"use strict"
const { PermitLevels } = require("../auth/permits")
const { getError, permissionError } = require("../utils/responseMessages")
module.exports = (action, Thing) => {
  return async (req, res, next) => {
      let engagedThing = res.locals.engagedThing
      let banned = req.user.permits.get("banned")
      if (!engagedThing._id) {
        let err = getError(e)
        res.status(err.name).json(err).end()
      } else if (banned) {
        let err = getError({ name: 403, message: `${req.user._id} has been banned.`})
        res.status(err.name).json(err).end()
      } else {
        if (!engagedThing.permits) {
          next()
        } else {
          let permitLevel = engagedThing.permits.get(action)
          let permitted = false
          if (permitLevel === PermitLevels.AUTH) {
            permitted = req.user
          } else if (permitLevel === PermitLevels.GOD) {
            if (req.user) {
              permitted =
                (req.user._id.equals(engagedThing.god)) ||
                req.user._id.equals(engagedThing._id)
            }
          } else if (permitLevel === PermitLevels.LISTED) {
            if (req.user) {
              permitted =
                (!banned && engagedThing.list.includes(req.user._id)) ||
                req.user._id.equals(engagedThing.god) ||
                req.user._id.equals(engagedThing._id)
            }
          } else {
            permitted = !banned
          }
          if (permitted) {
            next()
          } else {
            let err = permissionError(action, req.params.engage)
            res.status(err.name).json(err).end()
          }
        }
      }
    })
  }
}
