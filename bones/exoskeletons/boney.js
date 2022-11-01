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
var DeleteOfThing = function(Thing) {
  return {msg: 'Thing successfully deleted'}
}
module.exports = {
  'outOf': OfThing,
  'listOutOf': ListOfThings,
  'metaOf': MetaOfThing,
  'deleteOf': DeleteOfThing
}
