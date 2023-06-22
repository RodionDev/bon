"use strict"
var Datastore = require('nedb');
var things = new Datastore();
const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const { getError } = require("../utils/responseMessages")
const jwtOpts = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}
module.exports = T => {
  passport.use(
    new passportJWT.Strategy(jwtOpts, (jwtPayload, callback) => {
    await things.findOne({ _id: jwtPayload.id }, function(e, thing) {
      if (e) {
        return callback(e)
      } else {
        return callback(null, thing)
      }
    })
  )
  return passport.authenticate("jwt", { session: false })
}
