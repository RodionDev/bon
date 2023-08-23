"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
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
