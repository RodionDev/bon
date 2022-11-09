'use strict'
var OfThing = function(meta, data) {
  return data
}
var ListOfThings = function(meta, data) {
  return data
}
var MetaOfThing = function(meta, data) {
  return meta.Thing.schema.paths
}
var DeleteOfThing = function(meta, data) {
  return {msg: 'Thing successfully deleted'}
}
module.exports = {
  'outOf': OfThing,
  'listOutOf': ListOfThings,
  'metaOf': MetaOfThing,
  'deleteOf': DeleteOfThing
}
