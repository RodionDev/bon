"use strict"
const mongoose = require("mongoose")
const ThingSchema = new mongoose.Schema(
  {
    additionalType: String,
    alternateName: String,
    description: String,
    disambiguatingDescription: String,
    identifier: { type: String, unique: true, sparse: true },
    image: String,
    mainEntityOfPage: String,
    name: { type: String, required: true },
    potentialAction: String,
    sameAs: String,
    subjectOf: String,
    url: String,
  },
  { strict: "throw", toObject: { versionKey: false } }
)
module.exports = ThingSchema
