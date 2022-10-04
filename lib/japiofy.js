'use strict'
module.exports = {
  jsonApiOrgify: function(thing, typeOfThing) {
    let newData = {}
    newData['type'] = typeOfThing
    newData['id'] = thing["_id"]
    newData['attributes'] = {}
    for (var key in thing) {
      if (
        key != '_id' &&
        key !== '__v'
      ) {
        newData['attributes'][key] = thing[key]
      }
    }
    return newData
  },
  jsonApiOrgifyList: function(thing, typeOfThing) {
    let list = []
    for (let record in thing) {
      list.push(
        jsonApiOrgify(thing[record], typeOfThing)
      )
    }
    return list
  }
}
