const { CamelCase } = require("../src/helpers")
const PERMITLEVELS = require("../src/permits")
const DAY = 1000 * 60 * 60 * 24
const makeEndpointAction = () => {}
const initializeT = (argv, ribsConfig, envVars) => {
  let thing = { ...argv } || {}
  let { subjectOf } = envVars
  thing.additionalType = CamelCase(thing.identifier)
  delete thing._
  delete thing.$0
  return thing
}
module.exports = initializeT
