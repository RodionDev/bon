"use strict"
const mongoose = require("mongoose")
module.exports = (schema, options) => {
  schema.add({
    god: { ref: "Thing", type: mongoose.ObjectId },
    thing: String,
    created: Date,
    createdBy: { ref: "Thing", type: mongoose.ObjectId },
    deleted: Date,
    deletedBy: { ref: "Thing", type: mongoose.ObjectId },
    isDeleted: Boolean,
    updated: Date,
    updatedBy: { ref: "Thing", type: mongoose.ObjectId },
    flag1: Number,
    flag2: Number,
    flag3: Number,
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
  })
}
