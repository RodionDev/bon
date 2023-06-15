"use strict"
const mongoose = require("mongoose")
let ThingModel = mongoose.models.Thing
if (!ThingModel) {
  let ThingSchema = require("./adon/ThingSchema")
  ThingSchema.plugin(require("./adon/god"))
  ThingSchema.plugin(require("./adon/permits"))
  ThingSchema.plugin(require("./adon/engage"))
  ThingSchema.plugin(require("./adon/list"))
  ThingModel = mongoose.model("Thing", ThingSchema)
}
module.exports = ThingModel
