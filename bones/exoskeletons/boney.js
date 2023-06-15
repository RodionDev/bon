/**
 * exoSkeleton with few transformations because `boney` is bone's default API format.
 *
 * Despite not doing very much, this module is required because all routes
 * must call one of the exoSkeletons. `boney` is therefore a good template
 * for creating a new exoSkeleton.
 */
"use strict"
const utils = require("./utils")

/**
 * Prepare the boney request data ready to be passed into a mongoose method.
 * @param {Object} req An http request.
 * @returns {json} The data prepped for a boney response.
 */
var Acquire = function (req) {
  return req.body
}

/**
 * Prepare a single data object correctly for the boney format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose data object.
 * @returns {json} The data prepped for a boney response.
 */
var OfThing = function (meta, data) {
  return data.toObject()
}

/**
 * Prepare a GET all response correctly for the boney format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose list object.
 * @returns {json} The list prepped for a boney response.
 */
var ListOfThings = function (meta, data) {
  let list = []
  for (let record in data) {
    list.push(OfThing(meta, data[record]))
  }
  return list
}

/**
 * Prepare a SCHEMA route's response correctly for the boney format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @returns {json} The Thing schema.
 */
var MetaOfThing = function (meta) {
  return meta.Thing.schema.paths
}

/**
 * Prepare a DELETE route's response correctly for the boney format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose data object.
 * @returns {json} A message for a boney response.
 */
var DeleteOfThing = function (meta, data) {
  return { msg: `${meta.schemaName} successfully deleted` }
}

/**
 * Prepare an error report
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {string} error message.
 * @returns {json} An error message for a boney response.
 */
var ErrorOfThing = function (meta, errMsg) {
  return { msg: `${meta.schemaName} ${errMsg}` }
}

/**
 * Every route requires a mongoose call, but this wrapper first which
 * picks out all the relevant params and building the requirements for the
 * `mongooseCall`.
 * @param {string} method HTTP method as a string which we can add to HEADERs.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * @param {calback} mongooseCall mongoose data object.
 */
var MongooseCall = function (method, req, res, mongooseCall) {
  let endoSkeleton =
    `../endoskeletons/` + process.env["ENDOSKELETON"] + `/models`
  var schemaName = utils.singularPronoun(req.params.thing)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  var meta = {
    schemaName: schemaName,
    Thing: Thing,
  }
  mongooseCall(req, res, Thing, meta)
}

/**
 * Export these methods with standardized method names.
 */
module.exports = {
  acquire: Acquire,
  outOf: OfThing,
  listOutOf: ListOfThings,
  metaOf: MetaOfThing,
  deleteOf: DeleteOfThing,
  errorOf: ErrorOfThing,
  thenMongoose: MongooseCall,
}
