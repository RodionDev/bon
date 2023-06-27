"use strict"
const JSONdb = require('simple-json-db');
const db = new JSONdb('../database.json');
module.exports = Thing => {
  return async (req, res) => {
   res.status(200).send(db.JSON())
  }
}
