#!/usr/bin/env node
const fs = require("fs")
const db = require("@elioway/dbhell")
const adons = require("../adons")
const ribs = require("../ribs")
const spine = require("../spine")
const flesh = require("../flesh")
const { boneUp,envVarsLoader, ribsConfig, yargsBone } = require("../src")
const allDefaultRibs = { ...ribs, ...spine, ...adons }
fs.readFile(".env", "utf8", (readEnvErr, envData) => {
  let envVars = { DATADIR: "./.data/" }
  if (!readEnvErr) {
    envVars = envVarsLoader(envData)
  }
  let commandHandler = (packet) =>{
    let ribName = packet._[0]
    boneUp(ribName, packet, allDefaultRibs, db, flesh)}
  console.log({ envVars })
  db.initialize(envVars)
  yargsBone(ribsConfig, commandHandler)
})
