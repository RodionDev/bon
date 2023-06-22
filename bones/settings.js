"use strict"
const unGuarded = require("./auth/unGuarded")
const { PermitLevels, BasePermits, AnonPermits } = require("./auth/permits")
const { BONES, BONES_DEPTH, EXTRA_PRIMITIVE, SITE_ID } = process.env
module.exports = {
  guard: unGuarded,
  permits: AnonPermits,
  sanitizers: {
    comment: queryString => {
      queryString = queryString || {}
      queryString.comment =
        queryString.hasOwnProperty("comment") &&
        String(queryString.comment) !== "false"
      return queryString
    },
    depth: queryString => {
      queryString = queryString || {}
      queryString.depth = Number(queryString.depth) || 0
      return queryString
    },
  },
  bones: BONES.split(",").filter(b => b),
  depth: BONES_DEPTH || 0,
  extraPrimitive: EXTRA_PRIMITIVE.split(",").filter(b => b),
  siteId: SITE_ID,
  slim: [
    "disambiguatingDescription",
    "name",
    "_id",
  ],
}
