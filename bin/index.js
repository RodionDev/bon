#!/usr/bin/env node
const path = require("path")
const db = require("../node-db/index")
const bones = require("../bones")
const flesh = require("../flesh")
const yargs = require("yargs")
const boneOfHisBone = (argv) => {
  let thing = { ...argv } || {}
  delete thing._
  delete thing.$0
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
yargs.demandCommand().help().argv
