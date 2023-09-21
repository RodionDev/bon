#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const yargs = require("yargs")
const process = require("process")
const db = require("../dbs/node-db")
const bones = require("../src")
const flesh = require("../flesh")
const initializeT = require("./initializeT")
const ribs = {
  destroyT: { aliases: ["delete"], positionals: ["identifier"] },
  enlistT: {
    aliases: ["add", "addTolist"],
    positionals: ["subjectOf", "identifier"],
  },
  listT: { aliases: ["list"], positionals: ["identifier"] },
  pingT: { aliases: ["ping"], positionals: [] },
  readT: { aliases: ["get"], positionals: ["identifier"] },
  schemaT: { aliases: ["schema", "meta"], positionals: ["mainEntityOfPage"] },
  takeonT: {
    aliases: ["createThen", "enlistT"],
    positionals: ["subjectOf", "identifier"],
  },
  takeupT: { aliases: ["create"], positionals: ["identifier"] },
  unlistT: {
    aliases: ["remove", "removeFromlist"],
    positionals: ["subjectOf", "identifier"],
  },
  updateT: { aliases: ["update", "patch"], positionals: ["identifier"] },
  optimizeT: { aliases: [], positionals: ["identifier"] },
}
fs.readFile(".env", "utf8", (Err, envData) => {
  const envVars = envData
    .split("\n")
    .map(line => line.split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  let { identifier } = envVars
  db.initialize(envVars)
  yargs
    .scriptName(identifier)
    .usage("$0 <rib> [identifier] [listIdentifier] --schemaProps")
    .parserConfiguration({
      "short-option-groups": true,
      "camel-case-expansion": false,
      "dot-notation": true,
      "parse-numbers": true,
      "parse-positional-numbers": true,
      "boolean-negation": true,
      "deep-merge-config": false,
    })
  Object.entries(ribs).forEach(([ribName, ribConfig]) => {
    let { aliases, positionals } = ribConfig
    let commandPositionals = ""
    if (positionals && positionals.length) {
      commandPositionals = " " + positionals.map(pos => `[${pos}]`).join(" ")
   }
    yargs.command({
      command: `${ribName}${commandPositionals}`,
      aliases: aliases,
      desc: `${aliases.join(" ")} a thing`,
      handler: argv =>
        bones(ribName, initializeT(argv, ribs, envVars), db, flesh),
    })
  })
  yargs.demandCommand().help().argv
}) 
