"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const bcrypt = require("bcryptjs")
const {
  signUpError,
  credentialsMissingError,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    const signupT = req.body
    const { username, password } = signupT
    if (!username || !password) {
      let Err = credentialsMissingError()
      res.status(Err.name).json(Err)
    } else if (!thingTypeMatched(signupT, thingType)) {
      let Err = thingTypeError("signup", thingType)
      res.status(Err.name).json(Err)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      signupT.created = Date.now()
      signupT.password = hash
      signupT.thing = thingType
      await things.insert(signupT, (e, signedupT) => {
        if (e) {
          let Err = signUpError(e)
          res.status(Err.name).json(Err)
        } else {
          let rtnT = signedupT.toObject()
          delete rtnT.password
          rtnT.permits = Object.fromEntries(signedupT.permits)
          res.status(201).send(rtnT)
        }
      })
    }
  }
}