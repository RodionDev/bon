'use strict'
var config = require('config');
function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}
var jsonApiOfThing = function(thing, typeOfThing) {
  let newData = {}
  console.log(thing)
  newData['type'] = typeOfThing
  newData['id'] = thing["_id"]
  newData['attributes'] = {}
  for (var key in thing) {
    if (
      key !== '_id' &&
      key !== '__v'
    ) {
      newData['attributes'][key] = thing[key]
    }
  }
  return newData
}
var jsonApiListOfThings = function(thing, typeOfThing) {
  let list = []
  for (let record in thing) {
    list.push(
      jsonApiOrgify(thing[record], typeOfThing)
    )
  }
  return list
}
module.exports = {
  outOf: jsonApiOfThing,
  listOutOf: jsonApiListOfThings,
}
