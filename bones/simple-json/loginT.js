"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
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
      let err = credentialsMissingError()
      res.status(err.name).json(err).end()
    } else {
      const user = db.JSON().find(t => t.username === username)
      if (!user) {
        let err = credentialsError()
        res.status(err.name).json(err).end()
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
              let err = loginTokenError(e)
              res.status(err.name).json(err).end()
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
        let err = credentialsError()
        res.status(err.name).json(err).end()
      }
    }
  }
}
