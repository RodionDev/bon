const ThingBuilder = require("@elioway/thing/thing-builder")
const { schemaDomainUrl } = require("@elioway/thing/utils/get-schema")
const { camelCase, hash, hasRequiredFields, makeIdentifier, url } = require("../helpers")
const PERMITLEVELS = require("../permits")
const takeupT = (packet, db, cb) => {
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    db.exists(packet, exists => {
      if (!exists) {
        let thingBuilder = new ThingBuilder(
          "schemaorg/data/releases/9.0/schemaorg-all-http",
          schemaDomainUrl
        )
        let Thing = thingBuilder.Thing([packet.mainEntityOfPage])
        let thinglet = thingBuilder.thinglet(
          Thing[packet.mainEntityOfPage],
          packet.mainEntityOfPage
        )
        let engagedData = {
          ...thinglet,
          ...packet,
          password: "",
          permits: {
            takeupT: PERMITLEVELS.ANON, 
            readT: PERMITLEVELS.ANON,
            updateT: PERMITLEVELS.ANON,
            deleteT: PERMITLEVELS.GOD,
            takeonT: PERMITLEVELS.ANON,
            listT: PERMITLEVELS.ANON,
            enlistT: PERMITLEVELS.ANON,
            unlistT: PERMITLEVELS.ANON,
            schemaT: PERMITLEVELS.ANON,
          },
        }
        if (packet.password) {
          engagedData.password = hash(packet.password.trim())
        }
        db.create(engagedData, err => {
          if (!err) {
            delete engagedData.password
            cb(200, engagedData)
          } else {
            cb(500, {
              Error: `Could not create ${identifier} Thing.`,
              Reason: err,
            })
          }
        })
      } else {
        cb(400, { Error: `${identifier} Thing already exists. Please login.` })
      }
    })
  } else {
    cb(400, { Error: `Thing missing required fields.` })
  }
}
module.exports = takeupT
