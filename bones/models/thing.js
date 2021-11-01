"use strict";
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [127, "A 127 character or less name of the item."],
    required: [true, "The name is required."]
  },
  alternateName: {
    type: String,
    maxlength: [255, "A 255 character or less alias for the item."]
  },
  disambiguatingDescription: {
    type: String,
    maxlength: [255, "A 255 character or less alias for the item."]
  },
  description: {
    type: String,
    required: [false, "A description of the item which not required."]
  },
  engaged: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});
schema.method('engage', function(callback) {
  return this.update({
    engaged: true
  }).exec(callback)
})
schema.method('disengage', function(callback) {
  return this.update({
    engaged: false
  }).exec(callback);
});
module.exports = mongoose.model("thing", schema);
