const settings = require("../settings")
module.exports = queryString => {
  let sanitized = Object.create(queryString)
  for (let [queryName, queryFunction] of Object.entries(settings.sanitizers)) {
    sanitized = queryFunction(sanitized)
  }
  return sanitized
}
