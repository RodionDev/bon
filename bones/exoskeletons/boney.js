"use strict"
const utils = require("./utils")
var Acquire = function (req) {
  return req.body
}
var OfThing = function (meta, data) {
  return data.toObject()
}
var ListOfThings = function (meta, data) {
  let list = []
  for (let record in data) {
    list.push(OfThing(meta, data[record]))
  }
  return list
}
var MetaOfThing = function (meta) {
  return meta.Thing.schema.paths
}
var DeleteOfThing = function (meta, data) {
  return { msg: `${meta.schemaName} successfully deleted` }
}
var ErrorOfThing = function (meta, errMsg) {
  return { msg: `${meta.schemaName} ${errMsg}` }
}
var MongooseCall = function (method, req, res, JSONCall) {
  let endoSkeleton =
    `../endoskeletons/` + process.env["ENDOSKELETON"] + `/models`
  var schemaName = utils.singularPronoun(req.params.thing)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  var meta = {
    schemaName: schemaName,
    Thing: Thing,
  }
  JSONCall(req, res, Thing, meta)
}
module.exports = {
  acquire: Acquire,
  outOf: OfThing,
  listOutOf: ListOfThings,
  metaOf: MetaOfThing,
  deleteOf: DeleteOfThing,
  errorOf: ErrorOfThing,
  thenMongoose: MongooseCall,
}
