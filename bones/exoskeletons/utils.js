"use strict"
var singularPronoun = function (schemaName) {
  if (schemaName.endsWith("s")) {
    schemaName = schemaName.slice(0, -1)
  }
  return schemaName.charAt(0).toUpperCase() + schemaName.slice(1)
}
module.exports = {
  singularPronoun: singularPronoun,
}
