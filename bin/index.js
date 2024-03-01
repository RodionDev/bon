#!/usr/bin/env node
const fs = require("node:fs")
const path = require("node:path")
const db = require("@elioway/dbhell")
const adons = require("../adons")
const ribs = require("../ribs")
const spine = require("../spine")
const flesh = require("../flesh")
const { boneUp, boneEnvVarsLoader, ribsConfig, yargsBone } = require("../src")
const commandDir = process.cwd()
const allDefaultRibs = { ...ribs, ...spine, ...adons }
fs.readFile(path.join(commandDir, ".env"), "utf8", (readEnvErr, envData) => {
  let CFG = boneEnvVarsLoader(readEnvErr, envData, commandDir)
  console.log({ CFG })
  let commandHandler = packet => boneUp(packet, allDefaultRibs, db, flesh)
  db.initialize(CFG, () => yargsBone("bones", ribsConfig, commandHandler))
})
