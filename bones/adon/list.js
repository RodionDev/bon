"use strict"
const mongoose = require("mongoose")
module.exports = (schema, options) => {
  schema.add({ list: { type: [mongoose.ObjectId], ref: "Thing" } })
}
