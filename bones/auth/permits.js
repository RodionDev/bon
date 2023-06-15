"use strict"
const PermitLevels = {
  GOD: "GOD", 
  LISTED: "LISTED", 
  AUTH: "AUTH", 
  ANON: "ANON", 
}
const BasePermits = {
  get: PermitLevels.AUTH,
  create: PermitLevels.LISTED,
  update: PermitLevels.GOD,
  delete: PermitLevels.GOD,
}
const AnonPermits = {
  get: PermitLevels.ANON,
  create: PermitLevels.ANON,
  update: PermitLevels.ANON,
  delete: PermitLevels.ANON,
}
module.exports = {
  PermitLevels,
  BasePermits,
}
