module.exports = {
  thingIsTypeT: (body, thingType) => {
    return body.hasOwnProperty(thingType)
  },
}
