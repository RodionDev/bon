"use strict"

/**
 * Singularise and Proper case a schema.org object name.
 * @param {string} schemaName One of the schema.org object types.
 * @returns {json} Propercase, singlar version of a object type.
 */
var singularPronoun = function (schemaName) {
  if (schemaName.endsWith("s")) {
    schemaName = schemaName.slice(0, -1)
  }
  return schemaName.charAt(0).toUpperCase() + schemaName.slice(1)
}

module.exports = {
  singularPronoun: singularPronoun,
}
