"use strict"
const boney = require("./boney")
function jsonApiAcquire(req) {
  let data = boney.acquire(req).data
  let mongooseReadyData = {}
  for (var key in data.attributes) {
    mongooseReadyData[key] = data.attributes[key]
  }
  return mongooseReadyData
}
function _jsonApiExoSkeleton(meta, data) {
  let newData = {}
  newData["type"] = meta.schemaName
  newData["id"] = data._id
  newData["attributes"] = {}
  for (var key in data.toObject()) {
    if (key !== "_id" && key !== "__v" && key !== "toObject") {
      newData["attributes"][key] = data[key]
    }
  }
  return newData
}
var jsonApiOfThing = function (meta, data) {
  return {
    jsonapi: {
      version: "1.0",
    },
    data: _jsonApiExoSkeleton(meta, data),
    meta: meta.Thing.schema.paths,
  }
}
var jsonApiListOfThings = function (meta, data) {
  let list = []
  for (let record in data) {
    list.push(_jsonApiExoSkeleton(meta, data[record]))
  }
  return {
    jsonapi: {
      version: "1.0",
    },
    data: list,
    meta: meta.Thing.schema.paths,
  }
}
var jsonApiMetaOfThing = function (meta) {
  return {
    jsonapi: {
      version: "1.0",
    },
    meta: meta.Thing.schema.paths,
  }
}
var jsonApiErrorOfThing = function (meta, errMsg) {
  return {
    jsonapi: {
      version: "1.0",
    },
    errors: [`${meta.schemaName} ${errMsg}`],
  }
}
function jsonApiAnatomyOf(method, req, res, mongooseCall) {
  res.setHeader("Access-Control-Allow-Origin", process.env["ALLOWED_HOST"])
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", method)
  boney.thenMongoose(method, req, res, mongooseCall)
}
module.exports = {
  acquire: jsonApiAcquire,
  outOf: jsonApiOfThing,
  listOutOf: jsonApiListOfThings,
  metaOf: jsonApiMetaOfThing,
  deleteOf: jsonApiMetaOfThing,
  errorOf: jsonApiErrorOfThing,
  thenMongoose: jsonApiAnatomyOf,
}
