/**
 * jsonApi exoSkeleton for transforming requests and responses to this REST standard.
 * http://jsonapi.org/format/#status
 */
"use strict"
const boney = require("./boney")

/**
 * Prepare the jsonApi request data ready to be passed into a mongoose method.
 * @param {Object} req An http request.
 * @returns {json} The data prepped for a jsonApi response.
 */
function jsonApiAcquire(req) {
  let data = boney.acquire(req).data
  let mongooseReadyData = {}
  // if (data.id) mongooseReadyData['_id'] = data.id
  for (var key in data.attributes) {
    mongooseReadyData[key] = data.attributes[key]
  }
  return mongooseReadyData
}

/**
 * Prepare a single data object correctly for the jsonApi format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose data object.
 * @returns {json} The data prepped for a jsonApi response.
 */
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

/**
 * Prepare a single data object correctly for the jsonApi format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose data object.
 * @returns {json} The data prepped for a jsonApi response.
 */
var jsonApiOfThing = function (meta, data) {
  return {
    jsonapi: {
      version: "1.0",
    },
    data: _jsonApiExoSkeleton(meta, data),
    meta: meta.Thing.schema.paths,
  }
}

/**
 * Prepare a GET all response correctly for the jsonApi format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose list object.
 * @returns {json} The list prepped for a jsonApi response.
 */
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

/**
 * Prepare a SCHEMA and DELETE route's response correctly for the jsonApi format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {Object} data mongoose data object.
 * @returns {json} The Thing schema.
 */
var jsonApiMetaOfThing = function (meta) {
  return {
    jsonapi: {
      version: "1.0",
    },
    meta: meta.Thing.schema.paths,
  }
}

/**
 * Prepare a SCHEMA and DELETE route's response correctly for the jsonApi format.
 * @param {json} meta Info about the request, including the Thing's schema.
 * @param {string} errMsg The error message.
 * @returns {json} The Thing schema.
 */
var jsonApiErrorOfThing = function (meta, errMsg) {
  return {
    jsonapi: {
      version: "1.0",
    },
    errors: [`${meta.schemaName} ${errMsg}`],
  }
}

/**
 * Every route ends with a mongoose call, but under jsonApi it starts by
 * adding the required headers, then calls the standard `boney.thenMongoose`
 * wrapper.
 * @param {string} method HTTP method as a string which we can add to HEADERs.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * @param {calback} mongooseCall mongoose data object.
 */
function jsonApiAnatomyOf(method, req, res, mongooseCall) {
  res.setHeader("Access-Control-Allow-Origin", process.env["ALLOWED_HOST"])
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", method)
  boney.thenMongoose(method, req, res, mongooseCall)
}

/**
 * Export these methods with standardized method names.
 */
module.exports = {
  acquire: jsonApiAcquire,
  outOf: jsonApiOfThing,
  listOutOf: jsonApiListOfThings,
  metaOf: jsonApiMetaOfThing,
  deleteOf: jsonApiMetaOfThing,
  errorOf: jsonApiErrorOfThing,
  thenMongoose: jsonApiAnatomyOf,
}
