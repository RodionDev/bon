"use strict"
const PERMITLEVELS = {
  GOD: "GOD", 
  LISTED: "LISTED", 
  AUTH: "AUTH", 
  ANON: "ANON", 
}
const Example = {
  takeupT: PERMITLEVELS.ANON, 
  readT: PERMITLEVELS.ANON,
  updateT: PERMITLEVELS.GOD,
  destroyT: PERMITLEVELS.GOD,
  takeonT: PERMITLEVELS.AUTH,
  listT: PERMITLEVELS.ANON,
  enlistT: PERMITLEVELS.GOD,
  unlistT: PERMITLEVELS.GOD,
  schemaT: PERMITLEVELS.ANON,
}
module.exports = PERMITLEVELS
