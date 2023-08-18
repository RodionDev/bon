#!/usr/bin/env node
const path = require("path")
const yargs = require("yargs")
const db = require("../node-db/index")
const bones = require("../bones")
const flesh = require("../flesh")
const { camelCase } = require("../bones/helpers")
const PERMITLEVELS = require("../bones/permits")
yargs
  .scriptName("bones")
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
const initializeT = argv => {
  let thing = { ...argv } || {}
  thing.mainEntityOfPage =
    thing.mainEntityOfPage !== "Thing"
      ? thing.mainEntityOfPage || "ItemList"
      : "ItemList"
  thing.additionalType = camelCase(thing.identifier)
  thing.permits = {
    deleteT: PERMITLEVELS.ANON,
    enlistT: PERMITLEVELS.ANON,
    listT: PERMITLEVELS.ANON,
    listOfT: PERMITLEVELS.ANON,
    readT: PERMITLEVELS.ANON,
    schemaT: PERMITLEVELS.ANON,
    takeonT: PERMITLEVELS.ANON,
    takeupT: PERMITLEVELS.ANON, 
    updateT: PERMITLEVELS.ANON,
    unlistT: PERMITLEVELS.ANON,
  }
  delete thing._
  delete thing.$0
  console.log(thing)
  return thing
}
const ribs = {
  takeupT: { aliases: ["create"], positionals: ["identifier"] },
  updateT: { aliases: ["update", "patch"], positionals: ["identifier"] },
  readT: { aliases: ["get"], positionals: ["identifier"] },
  deleteT: { aliases: ["delete"], positionals: ["identifier"] },
  pingT: { aliases: ["ping"], positionals: [] },
  takeonT: {
    aliases: ["createThen", "enlistT"],
    positionals: ["subjectOf", "identifier"],
  },
  listT: { aliases: ["list"], positionals: ["identifier"] },
  enlistT: {
    aliases: ["add", "addTolist"],
    positionals: ["subjectOf", "identifier"],
  },
  unlistT: {
    aliases: ["remove", "removeFromlist"],
    positionals: ["subjectOf", "identifier"],
  },
  fieldT: {
    aliases: ["link", "relateTo"],
    positionals: ["identifier", "fieldName"],
  },
}
Object.entries(ribs).forEach(([ribName, ribConfig]) => {
  let { aliases, positionals } = ribConfig
  yargs.command({
    command: `${ribName} ${positionals.map(pos => `[${pos}]`).join(" ")}`,
    aliases: aliases,
    desc: `${aliases.join(" ")} a thing`,
    handler: argv => bones(ribName, initializeT(argv), db, flesh),
  })
})
yargs.demandCommand().help().argv
