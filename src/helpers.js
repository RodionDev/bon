const crypto = require("crypto")
const ThingBuilder = require("@elioway/thing/thing-builder")
const { schemaDomainUrl } = require("@elioway/thing/utils/get-schema")
var helpers = {}
helpers.bigUp = thing => {
  let thingBuilder = new ThingBuilder(
    "schemaorg/data/releases/9.0/schemaorg-all-http",
    schemaDomainUrl
  )
  let thingType = "Thing"
  if (thing.mainEntityOfPage) {
    thingType =
      thing.mainEntityOfPage[0].toUpperCase() + thing.mainEntityOfPage.slice(1)
  }
  let Thing = thingBuilder.Thing([thingType])
  let thinglet = thingBuilder.thinglet(Thing[thingType], thingType)
  return {
    ...thinglet,
    ...thing,
  }
}
helpers.BigUp = thing => {
  let thingBuilder = new ThingBuilder(
    "schemaorg/data/releases/9.0/schemaorg-all-http",
    schemaDomainUrl
  )
  let Thing = thingBuilder.Thing([thing.mainEntityOfPage])
  return Thing[thing.mainEntityOfPage]
}
helpers.CamelCase = str => {
  if (!str) return ""
  str = str
    .split("")
    .reduce((a, s) => a + (s === s.toUpperCase() ? s + " " : s))
  str = str.replace(/  /g, " ")
  str = str.toLowerCase()
  const words = str.split(" ")
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }
  return words.join("")
}
helpers.cultify = engagedThing => {
  if (!Array.isArray(engagedThing.ItemList?.itemListElement)) {
    engagedThing.ItemList = { itemListElement: [] }
  }
  engagedThing.mainEntityOfPage = engagedThing.mainEntityOfPage || "Thing"
  return engagedThing
}
helpers.hash = str => {
  let envData = fs.readFileSyync(".env", "utf8")
  const envVars = envData
    .split("\n")
    .map(line => line.split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  if (typeof str == "string" && str.length) {
    return crypto
      .createHmac("sha256", envVars.HASHINGSECRET || "123")
      .update(str)
      .digest("hex")
  } else {
    return false
  }
}
helpers.hasRequiredFields = (packet, fields) => {
  return fields.every(f => packet.hasOwnProperty(f) && packet[f])
}
helpers.makeIdentifier = packet => {
  if (packet.identifier) {
    return packet.identifier
  }
  return packet.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "")
}
helpers.makePermitIdentifier = () => {
  let tokenLen = 20
  let tokets = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  return new Array(tokenLen)
    .fill(0)
    .map(() => tokets.charAt(Math.floor(Math.random() * tokets.length)))
    .join("")
}
helpers.pick = (obj, propList) => {
  return propList.reduce((a, x) => {
    if (obj.hasOwnProperty(x)) a[x] = obj[x]
    return a
  }, {})
}
helpers.summarizeT = obj => {
  let engage = []
  for (const key in obj) {
    let property = obj[key]
    if (Array.isArray(property)) {
      obj[key] = `${property.length} items`
    } else if (key === "ItemList") {
      obj[key] = `${property.itemListElement.length} items`
    } else if (key[0] === key[0].toUpperCase()) {
      engage.push(key)
      delete obj[key]
    } else if (
      !obj[key] ||
      (typeof obj[key] !== "string" &&
        typeof obj[key] !== "number" &&
        typeof obj[key] !== "boolean")
    ) {
      delete obj[key]
    }
  }
  if (engage) {
    obj.engage = engage.join(",")
  }
  return obj
}
helpers.errorPayload = (rib, identifier, error, potentialAction) => {
  if (potentialAction) {
    potentialAction = {
      identifier: potentialAction,
      actionStatus: "PotentialActionStatus",
    }
  }
  error = error ? error : identifier
  return {
    identifier: identifier,
    mainEntityOfPage: "Action",
    potentialAction,
    Action: {
      agent: rib,
      error: error,
      actionStatus: "FailedActionStatus",
    },
  }
}
helpers.successPayload = (rib, identifier, potentialAction) => {
  if (potentialAction) {
    potentialAction = {
      identifier: potentialAction,
      Action: {
        agent: potentialAction,
        actionStatus: "PotentialActionStatus",
      },
    }
  }
  return {
    identifier: identifier,
    mainEntityOfPage: "Action",
    potentialAction,
    Action: {
      agent: rib,
      actionStatus: "CompletedActionStatus",
    },
  }
}
helpers.url = (mainEntityOfPage, identifier) =>
  `http:
module.exports = helpers
