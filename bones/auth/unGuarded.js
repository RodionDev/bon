"use strict"
const passport = require("passport")
const passportCustom = require("passport-custom")
const settings = require("../settings")
const { SITE_ID } = process.env
module.exports = T => {
  passport.use(
    "unguarded",
    new passportCustom.Strategy((req, callback) => {
      let myThing = null
      T.findById(SITE_ID, (e, thing) => {
        if (e) {
          return callback(e)
        } else {
          return callback(null, thing)
        }
      })
    })
  )
  return passport.authenticate("unguarded", { session: false })
}
