"use strict"
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
      let err = credentialsMissingError()
      res.status(err.name).json(err)
    } else if (!thingTypeMatched(signupT, thingType)) {
      let err = thingTypeError("signup", thingType)
      res.status(err.name).json(err)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      signupT.created = Date.now()
      signupT.password = hash
      signupT.thing = thingType
      await Thing.create(signupT, (e, signedupT) => {
        if (e) {
          let err = signUpError(e)
          res.status(err.name).json(err)
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
