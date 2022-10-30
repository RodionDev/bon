'use strict'
var OfThing = function(Thing, thing, typeOfThing) {
  return thing
}
var ListOfThings = function(Thing, things, typeOfThing) {
  return things
}
var MetaOfThing = function(Thing) {
  return Thing.schema.paths
}
module.exports = {
  'outOf': OfThing,
  'listOutOf': ListOfThings,
  'metaOf': MetaOfThing,
}
