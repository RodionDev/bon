"use strict"
const fs = require("fs")
const ThingBuilder = require("@elioway/thing")
const {
  getSchema,
  schemaDomainUrl,
} = require("@elioway/thing/utils/get-schema")
const sanitizeOptions = require("../utils/sanitize-options")
const settings = require("../settings")
module.exports = () => {
  return async (req, res) => {
    let thingType = req.params.engage
    let thingBuilder = new ThingBuilder(
      "9.0/schemaorg-all-http",
      schemaDomainUrl
    )
    let things = thingBuilder.things([thingType], sanitizeOptions(req.query))
    let schemedT = things[thingType]
    res.send(schemedT)
  }
}
