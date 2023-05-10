"use strict"
let mongoose = require("mongoose")
module.exports = exports = function thing(schema, options) {
  schema.add({
    name: {
      type: String,
    },
    disambiguatingDescription: {
      type: String,
    },
  })
}
