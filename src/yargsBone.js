const yargs = require("yargs")
const yargsBone = (commandName, ribsConfig, commandHandler) => {
  yargs
    .scriptName(commandName)
    .usage("$0 <rib>T [identifier] [listIdentifier] --schemaProps")
    .parserConfiguration({
      "short-option-groups": true,
      "camel-case-expansion": false,
      "dot-notation": true,
      "parse-numbers": true,
      "parse-positional-numbers": true,
      "boolean-negation": true,
      "deep-merge-config": false,
    })
  Object.entries(ribsConfig).forEach(([ribName, ribConfig]) => {
    let { aliases, positionals } = ribConfig
    let commandPositionals = ""
    if (positionals && positionals.length) {
      commandPositionals = " " + positionals.map(pos => `[${pos}]`).join(" ")
    }
    yargs.command({
      command: `${ribName}${commandPositionals}`,
      aliases: aliases,
      desc: `${aliases.join(" ")} a thing`,
      handler: commandHandler,
    })
  })
  yargs.demandCommand().help().argv
}
module.exports = yargsBone
