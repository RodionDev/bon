const { camelCase } = require("../src/helpers")
const PERMITLEVELS = require("../src/permits")
const DAY = 1000 * 60 * 60 * 24
const initializeT = (argv, ribs, envVars) => {
  let thing = { ...argv } || {}
  let { subjectOf } = envVars
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  thing.additionalType = camelCase(thing.identifier)
  thing.ItemList = {}
  thing.ItemList.itemListElement = []
  thing.permits = {
    destroyT: PERMITLEVELS.ANON,
    enlistT: PERMITLEVELS.ANON,
    listT: PERMITLEVELS.ANON,
    listOfT: PERMITLEVELS.ANON,
    readT: PERMITLEVELS.ANON,
    schemaT: PERMITLEVELS.ANON,
    takeonT: PERMITLEVELS.ANON,
    takeupT: PERMITLEVELS.ANON, 
    updateT: PERMITLEVELS.ANON,
    unlistT: PERMITLEVELS.ANON,
    optimizeT: PERMITLEVELS.ANON,
  }
  delete thing._
  delete thing.$0
  return thing
}
module.exports = initializeT
