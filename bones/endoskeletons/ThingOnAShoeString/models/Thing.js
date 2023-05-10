"use strict"
const mongoose = require("mongoose")
const Thing = new mongoose.Schema()
Thing.plugin(require("./plugins/thing"))
Thing.plugin(require("../../adon.js"))
module.exports = mongoose.model("thing", Thing)
