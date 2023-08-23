"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
  credentialsError,
  credentialsMissingError,
  loginTokenError,
} = require("../utils/responseMessages")
const { JWT_SECRET } = process.env
module.exports = Thing => {
  return async (req, res) => {
    const newT = req.body
    const { username, password } = newT
    if (!username || !password) {
      let Err = credentialsMissingError()
      res.status(Err.name).json(Err).end()
    } else {
      await things.findOne({ username: username }, async function (e, user) {
        if (!user) {
          let Err = credentialsError()
          res.status(Err.name).json(Err).end()
          return
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username,
          }
          await jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: 36000 },
            (e, token) => {
              if (e) {
                let Err = loginTokenError(e)
                res.status(Err.name).json(Err).end()
              } else {
                res
                  .status(200)
                  .json({
                    _id: user._id,
                    name: user.name,
                    success: true,
                    username: user.username,
                    token: `Bearer ${token}`,
                  })
                  .end()
              }
            }
          )
        } else {
          let Err = credentialsError()
          res.status(Err.name).json(Err).end()
        }
      })
    }
  }
}
