const { errorPayload, hash } = require("../../src/helpers")
const OK = 3
const NOTOK = 666
const boil = engagedData => engagedData
const boilerT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT(
    "boilerT",
    packet,
    ribs,
    db,
    (permitted, authError, nowFullyEngagedData) => {
      if (permitted && db.canStore(nowFullyEngagedData)) {
        Object.entries(ribsConfig).forEach(([ribName, ribConfig]) => {
          let { aliases, positionals } = ribConfig
          let commandPositionals = ""
          if (positionals && positionals.length) {
            commandPositionals = " " + positionals.map(pos => `[${pos}]`).join(" ")
          }
          ribsConfig[ribName].permit = envVars[ribName]
          yargs.command({
            command: `${ribName}${commandPositionals}`,
            aliases: aliases,
            desc: `${aliases.join(" ")} a thing`,
            handler: argv =>
              boneUp(
                ribName,
                initializeT(argv, ribsConfig, envVars),
                { ...ribs, ...spine },
                db,
                flesh
              ),
          })
        })
        cb(OK, boil(nowFullyEngagedData))
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}
module.exports = boilerT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
