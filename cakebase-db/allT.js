"use strict"
const Cakebase = require("cakebase")("../database.json")
module.exports = Thing => {
  return async (req, res) => {
    try {
      res.status(200).send(Cakebase.getAll())
    } catch (e) {
      let err = createError(e)
      res.status(err.name).json(err).end()
    }
  }
}
