"use strict"
const { PermitLevels } = require("../auth/permits")
const settings = require("../settings")
module.exports = (schema, options) => {
  schema.add({
    permits: {
      type: Map,
      default: settings.permits,
    },
  })
}
