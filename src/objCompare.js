const cannonicalJson = value => JSON.stringify(value)
var objCompare = function objCompare(obj1, obj2, exactCompare) {
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    Array.isArray(obj1) ||
    Array.isArray(obj2)
  ) {
    throw new Error("objCompare only compares two non-array objects")
  }
  var keySet = getKeySet(obj1, obj2),
    changes = []
  exactCompare = arguments.length < 3 ? true : !!exactCompare
  for (var key in keySet) {
    deepEquals(obj1[key], obj2[key], [key], changes, exactCompare)
  }
  return changes
  function getKeySet(obj1, obj2) {
    var keyArray = Object.keys(obj1).concat(Object.keys(obj2)),
      keySet = {}
    for (var i = 0; i < keyArray.length; i++) {
      keySet[keyArray[i]] = true
    }
    return keySet
  }
  function convertUndefinedToNull(arg) {
    return typeof arg === "undefined" ? null : arg
  }
  function addToChanges(keys, before, after, changes) {
    changes.push({
      key: keys.slice(),
      before: convertUndefinedToNull(before),
      after: convertUndefinedToNull(after),
    })
  }
  function deepEqualsArray(obj1, obj2, keys, changes, exactCompare) {
    if (!Array.isArray(obj1) || !Array.isArray(obj2)) {
      throw new Error("Input must be two arrays")
    }
    exactCompare = arguments.length < 5 ? true : !!exactCompare
    var maxIndex = obj1.length > obj2.length ? obj1.length : obj2.length
    if (exactCompare) {
      for (var i = 0; i < obj1.length; i++) {
        keys.push(i)
        if (typeof obj1[i] !== typeof obj2[i]) {
          addToChanges(keys, obj1[i], obj2[i], changes)
        } else if (Array.isArray(obj1[i]) && Array.isArray(obj2[i])) {
          deepEqualsArray(obj1[i], obj2[i], keys, changes, exactCompare)
        } else if (
          (!Array.isArray(obj1[i]) && Array.isArray(obj2[i])) ||
          (Array.isArray(obj1[i]) && !Array.isArray(obj2[i]))
        ) {
          addToChanges(keys, obj1[i], obj2[i], changes)
        } else if (typeof obj1[i] === "object") {
          deepEqualsObject(obj1[i], obj2[i], keys, changes, exactCompare)
        } else if (obj1[i] !== obj2[i]) {
          addToChanges(keys, obj1[i], obj2[i], changes)
        }
        keys.pop()
      }
    } else {
      var beforeSet = arrayToSet(obj1)
      var afterSet = arrayToSet(obj2)
      var keySet = getKeySet(beforeSet, afterSet)
      for (var key in keySet) {
        if (
          (beforeSet.hasOwnProperty(key) && !afterSet.hasOwnProperty(key)) ||
          (!beforeSet.hasOwnProperty(key) && afterSet.hasOwnProperty(key))
        ) {
          addToChanges(keys, beforeSet[key], afterSet[key], changes)
        }
      }
    }
    return
  }
  function arrayToSet(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("hashArray requires an array as input. Given: ", arr)
    }
    var set = {}
    for (var i = 0; i < arr.length; i++) {
      var key = cannonicalJson(arr[i])
      if (!set[key]) {
        set[key] = arr[i]
      }
    }
    return set
  }
  function deepEqualsObject(obj1, obj2, keys, changes, exactCompare) {
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      Array.isArray(obj1) ||
      Array.isArray(obj2)
    ) {
      throw new Error("Input must be two non-array objects")
    }
    exactCompare = arguments.length < 5 ? true : !!exactCompare
    var keySet = getKeySet(obj1, obj2)
    for (var key in keySet) {
      keys.push(key)
      if (typeof obj1[key] !== typeof obj2[key]) {
        addToChanges(keys, obj1[key], obj2[key], changes)
      } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        deepEqualsArray(obj1[key], obj2[key], keys, changes, exactCompare)
      } else if (
        (Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) ||
        (!Array.isArray(obj1[key]) && Array.isArray(obj2[key]))
      ) {
        addToChanges(keys, obj1[key], obj2[key], changes)
      } else if (typeof obj1[key] === "object") {
        deepEqualsObject(obj1[key], obj2[key], keys, changes, exactCompare)
      } else if (obj1[key] !== obj2[key]) {
        addToChanges(keys, obj1[key], obj2[key], changes)
      }
      keys.pop()
    }
    return
  }
  function deepEquals(obj1, obj2, keys, changes, exactCompare) {
    keys = keys || []
    changes = changes || []
    exactCompare = arguments.length < 5 ? true : !!exactCompare
    if (typeof obj1 !== typeof obj2) {
      addToChanges(keys, obj1, obj2, changes)
      return
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      deepEqualsArray(obj1, obj2, keys, changes, exactCompare)
      return
    }
    else if (typeof obj1 === "object" && typeof obj2 == "object") {
      deepEqualsObject(obj1, obj2, keys, changes, exactCompare)
      return
    }
    else if (obj1 !== obj2) {
      addToChanges(keys, obj1, obj2, changes)
      return
    }
  }
}
module.exports = objCompare
