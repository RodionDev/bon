const {isObject, isArray } = require("lodash")
const CLEANABLE = [
  "",
  "0",0,0.0,new Date(0).toISOString().slice(0, 10),new Date(0).toISOString().slice(11), new Date(0).toISOString()
]
const cleaner = (obj) => {
  return Object.entries(obj).reduce((acc, [key,val]) => {
    if (isArray(val) ) {
      acc[key] = val.map(cleaner)
    } else if (isObject(val)) {
      acc[key] = cleaner(val)
    } else if (! CLEANABLE.includes(val)) {
      acc[key] = val
    }
    return acc
  }, {})
}
module.exports = cleaner
