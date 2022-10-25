'use strict'
var OfThing = function(thing, typeOfThing) {
  return thing
}
var ListOfThings = function(things, typeOfThing) {
  return things
}
module.exports = {
  outOf: OfThing,
  listOutOf: ListOfThings,
}
