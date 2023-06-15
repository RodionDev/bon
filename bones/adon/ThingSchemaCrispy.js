"use strict"
const fs = require("fs")
const mongoose = require("mongoose")
const path = require("path")
const CrispyMongoose = require("@elioway/crispy-mongoose")
const { PermitLevels } = require("../auth/permits")
function thingSchema(schemaName) {
  const schema_path = "./schemaorg/data/releases/9.0/schemaorg-all-http.jsonld"
  const schema_contents = fs.readFileSync(schema_path, "utf-8")
  const { BONES, BONES_DEPTH, EXTRA_PRIMITIVE, MONGODB_URL } = process.env
  const SCHEMA = JSON.parse(schema_contents)
  return fs.readFile(schema_path, (err, data) => {
    if (err) throw err
    const SCHEMA = JSON.parse(data)
    let bones = BONES.split(",")
    let extraPrimitives = EXTRA_PRIMITIVE.split(",")
    let crispy = new CrispyMongoose(
      SCHEMA["@graph"],
      "http:
    )
    let baseModels = bones
    if (BONES_DEPTH) {
      baseModels = crispy.modelMiner(bones, BONES_DEPTH)
    }
    let modelDef = crispy.modelMaker(schemaName, baseModels, {})
    return crispy.mongooseSchema(modelDef, {})
  })
}
let ThingSchema = thingSchema("Thing")
module.exports = ThingSchema
