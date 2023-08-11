"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const bcrypt = require("bcryptjs")
const {
  signUpError,
  credentialsMissingError,
} = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    const signupT = req.body
    const { username, password } = signupT
    if (!username || !password) {
      let err = credentialsMissingError()
      res.status(err.name).json(err)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      signupT._id = Date.now().toString()
      signupT.created = Date.now()
      signupT.password = hash
      signupT.thing = thingType
      let signedupT = db.set(signupT._id, signupT)
      delete signedupT.password
      res.status(201).send(signedupT)
    }
  }
}
