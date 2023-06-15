"use strict"
const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const jwtOpts = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}
module.exports = T => {
  passport.use(
    new passportJWT.Strategy(jwtOpts, (jwtPayload, callback) => {
      T.findById(jwtPayload.id)
        .then(user => {
          return callback(null, user)
        })
        .catch(err => {
          return callback(err)
        })
    })
  )
  return passport.authenticate("jwt", { session: false })
}
