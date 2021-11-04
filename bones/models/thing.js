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
    maxlength: [255, "A 255 character or less alias for the item."],
    required: [false, "A description of the item which not required."]
  },
  disambiguatingDescription: {
    type: String,
    maxlength: [255, "A 255 character or less alias for the item."],
    required: [true, "The disambiguating description is required."]
  },
  description: {
    type: String,
    required: [false, "A description of the item which not required."]
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("thing", schema);
