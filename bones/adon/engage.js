"use strict"
const mongoose = require("mongoose")
module.exports = (schema, options) => {
  schema.add({
    engage: { type: Map, of: mongoose.Mixed },
  })
}
