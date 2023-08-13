const crypto = require("crypto")
let { HASHINGSECRET, HOST } = process.env
var helpers = {}
helpers.hash = str => {
  if (typeof str == "string" && str.length) {
    return crypto.createHmac("sha256", HASHINGSECRET).update(str).digest("hex")
  } else {
    return false
  }
}
helpers.parseJsonToObject = str => {
  try {
    return JSON.parse(str)
  } catch (err) {
    return {}
  }
}
helpers.url = (mainEntityOfPage, identifier) =>
  `http:
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
helpers.camelCase = (str) => {
  if (!str) return ""
  str = str.split("").reduce((a, x) => x + (a === a.toUpperCase() ? a+" " : a))
  str = str.replace(/  /g, " ", )
  str = str.toLowerCase();
  const words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join('');
}
module.exports = helpers
