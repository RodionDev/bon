#!/usr/bin/env node
const fs = require("fs")
const db = require("@elioway/dbhell")
const adons = require("../adons")
const ribs = require("../ribs")
const spine = require("../spine")
const flesh = require("../flesh")
const { boneUp, envVarsLoader, ribsConfig, yargsBone } = require("../src")
const allDefaultRibs = { ...ribs, ...spine, ...adons }
fs.readFile(".env", "utf8", (readEnvErr, envData) => {
  let envVars = { DATADIR: "./.data/" }
  if (!readEnvErr) {
    envVars = envVarsLoader(envData)
  }
  console.log("yo", envVars)
  let commandHandler = packet => boneUp(packet, allDefaultRibs, db, flesh)
  db.initialize(envVars, () => yargsBone("bones", ribsConfig, commandHandler))
})
