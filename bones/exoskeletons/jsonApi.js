'use strict'
function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}
function jsonApiExoSkeleton(meta, data) {
  let newData = {}
  newData['type'] = meta.schemaName
  newData['id'] = data['_id']
  newData['attributes'] = {}
  for (var key in data) {
    if (
      key !== '_id' &&
      key !== '__v'
    ) {
      newData['attributes'][key] = data[key]
    }
  }
  return newData
}
var jsonApiOfThing = function(meta, data) {
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'data': jsonApiExoSkeleton(meta, data),
    'meta': meta.Thing.schema.paths
  }
}
var jsonApiListOfThings = function(meta, data) {
  let list = []
  for (let record in data) {
    list.push(
      jsonApiExoSkeleton(meta, data[record])
    )
  }
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'data': list,
  }
}
var jsonApiMetaOfThing = function(meta, data) {
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'meta': meta.Thing.schema.paths
  }
}
module.exports = {
  'outOf': jsonApiOfThing,
  'listOutOf': jsonApiListOfThings,
  'metaOf': jsonApiMetaOfThing,
  'deleteOf': jsonApiMetaOfThing
}
