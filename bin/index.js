#!/usr/bin/env node
const path = require("path")
const yargs = require("yargs")
const db = require("../node-db/index")
const bones = require("../bones")
const flesh = require("../flesh")
const { camelCase } = require("../bones/helpers")
const PERMITLEVELS = require("../bones/permits")
const boneOfHisBone = (argv) => {
  let thing = { ...argv } || {}
  thing.mainEntityOfPage = thing.mainEntityOfPage !== "Thing" ? thing.mainEntityOfPage || "ItemList" : "ItemList"
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
const engageCommands = {
  takeupT: ["create"],
  updateT: ["update", "patch"],
  readT: ["get"],
  deleteT: ["delete"],
  pingT: ["ping"],
}
const listCommands = {
  takeonT: ["createAndList"],
  listT: ["list"],
  listOfT: ["listType"],
  enlistT: ["add"],
  unlistT: ["remove"],
}
yargs
  .scriptName("bones")
  .usage("$0 <rib> <mainEntityOfPage> [identifier] [listIdentifier]")
  .parserConfiguration({
    "short-option-groups": true,
    "camel-case-expansion": false,
    "dot-notation": true,
    "parse-numbers": true,
    "parse-positional-numbers": true,
    "boolean-negation": true,
    "deep-merge-config": false,
  })
Object.keys(engageCommands).forEach(rib => {
  yargs.command({
    command: rib,
    aliases: engageCommands[rib],
    desc: `engage > ${rib}`,
    builder: yargs => {},
    handler: argv => bones(rib, boneOfHisBone(argv), db, flesh),
  })
})
Object.keys(listCommands).forEach(rib => {
  yargs.command({
    command: rib,
    aliases: listCommands[rib],
    desc: `engage > list > ${rib}`,
    builder: yargs => {
      yargs.positional("engagedIdentifier", {
        type: "string",
        describe: "the engaged thing's id needed for list operations",
      })
    },
    handler: argv => bones(rib, boneOfHisBone(argv), db, flesh),
  })
})
yargs.demandCommand().help().argv
