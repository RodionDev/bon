"use strict"
const Cakebase = require('cakebase')("../database.json");
module.exports = Thing => {
  return async (req, res) => {
   res.status(200).send(Cakebase.getAll())
  }
}
