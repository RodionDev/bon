"use strict"
const Cakebase = require("cakebase")("../database.json")
var things = new Datastore()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { logoutSuccess } = require("../utils/responseMessages")
const { JWT_SECRET } = process.env
module.exports = Thing => {
  return async (req, res) => {
    res.clearCookie("access_token")
    let Err = logoutSuccess()
    res.status(Err.name).json(Err)
  }
}