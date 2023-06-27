"use strict"
const JSONdb = require('simple-json-db');
const db = new JSONdb('../database.json');
const { createError } = require("../utils/responseMessages")
module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let createT = req.body
    createT._id = Date.now().toString()
    createT.created = Date.now()
    createT.createdBy = req.params._id
    createT.god = req.user._id
    createT.thing = thingType
    let createdT = db.set(createT._id, createT);
    res.status(201).send(createdT)
  }
}
