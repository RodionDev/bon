'use strict'
let mongoose = require('mongoose')
module.exports = exports = function thing(schema, options) {
  schema.add({
    disambiguatingDescription: {
      type: String,
    },
    name: {
      type: String,
    },
  })
}
