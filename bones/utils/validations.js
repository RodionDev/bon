module.exports = {
  thingTypeMatched: (body, thingType) => {
    if (body.hasOwnProperty("engage")) {
      return Object.keys(body.engage).includes(thingType)
    } else {
      return true
    }
  },
}
