"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const passport = require("passport")
const passportCustom = require("passport-custom")
const settings = require("../settings")
const { SITE_ID } = process.env
module.exports = T => {
  passport.use(
    "unguarded",
    new passportCustom.Strategy(async (req, callback) => {
      await things.findOne({ _id: SITE_ID }, function (e, guardedThing) {
        if (e) {
          return callback(e)
        } else {
          return callback(null, guardedThing)
        }
      })
    })
  )
  return passport.authenticate("unguarded", { session: false })
}
