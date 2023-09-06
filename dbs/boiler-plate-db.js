const boilerPlateDB = require("boiler-plate-db")
const db = {}
db.log = msg => {} 
db.baseDir = path.join(__dirname, $DATADIR)
db.makeFilePath = packet => {
  let { identifier } = packet
  return path.join(db.baseDir, `${identifier}.json`)
}
db.parseJsonToObject = str => {
  try {
    return JSON.parse(str)
  } catch (parseJsonToObjectErr) {
    return {}
  }
}
db.exists = (packet, cb) => cb(boilerPlateDB.exists(packet))
db.create = (packet, cb) => {
  boilerPlateDB
    .create(packet)
    .then(data => cb(false, helpers.parseJsonToObject(data)))
    .catch(createErr => {
      db.log("db.create", createErr)
      cb(createErr)
    })
}
db.read = (packet, cb) => {
  let data = boilerPlateDB
    .get(packet)
    .then(data => cb(false, helpers.parseJsonToObject(data)))
    .catch(readErr => {
      db.log("db.read", readErr)
      cb(readErr, data)
    })
}
db.list = (things, cb) => {
  var promises = things.map(packet => {
    return new Promise((resolve, reject) => boilerPlateDB.get(packet))
  })
  Promise.all(promises)
    .then(results => {
      let list = results.filter(data => typeof data === "object")
      cb(false, list)
    })
    .catch(promisesErr => {
      db.log("db.list", promisesErr)
      cb("Could not `read` files for list. " + promisesErr, packet)
    })
}
db.update = (packet, cb) => {
  packet.ItemList.numberOfItems = packet.ItemList.itemListElement.length
  boilerPlateDB
    .set(packet)
    .then(data => cb(false, helpers.parseJsonToObject(packet)))
    .catch(updateErr => {
      db.log("db.update", updateErr)
      cb(updateErr, packet)
    })
}
db.delete = (packet, cb) => {
  boilerPlateDB
    .delete(packet)
    .then(data => cb(false, helpers.parseJsonToObject(packet)))
    .catch(deleteErr => {
      db.log("db.delete", deleteErr)
      cb(deleteErr, packet)
    })
}
module.exports = db
