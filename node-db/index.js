const fs = require("fs")
const path = require("path")
const ThingBuilder = require("@elioway/thing/thing-builder")
const { schemaDomainUrl } = require("@elioway/thing/utils/get-schema")
const helpers = require("../bones/helpers")
const db = {}
db.log = msg => {} 
db.baseDir = path.join(__dirname, "/../.data")
db.makeFilePath = packet => {
  let { identifier } = packet
  if (!fs.existsSync(db.baseDir)) {
    fs.mkdirSync(db.baseDir, { recursive: true })
  }
  return path.join(db.baseDir, `${identifier}.json`)
}
db.exists = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.exists(filePath, cb)
}
db.create = (packet, cb) => {
  db.exists(packet, (exists, err) => {
    if (!exists && !err) {
      const filePath = db.makeFilePath(packet)
      fs.open(filePath, "wx", (err, fileRef) => {
        if (!err && fileRef) {
          let thingBuilder = new ThingBuilder(
            "schemaorg/data/releases/9.0/schemaorg-all-http",
            schemaDomainUrl
          )
          let Thing = thingBuilder.Thing([packet.mainEntityOfPage])
          let thinglet = thingBuilder.thinglet(
            Thing[packet.mainEntityOfPage],
            packet.mainEntityOfPage
          )
          let createPacket = {
            ...thinglet,
            ...packet,
          }
          let stringData = JSON.stringify(createPacket, null, "\t")
          fs.writeFile(fileRef, stringData, err => {
            if (!err) {
              fs.close(fileRef, err => {
                if (!err) {
                  cb(false, createPacket)
                } else {
                  db.log("db.create", err)
                  cb("Could not `close` file for create.")
                }
              })
            } else {
              cb("Could not `writeFile` for create.")
            }
          })
        } else {
          db.log("db.create", err)
          cb("Could not `open` file for create.")
        }
      })
    } else {
      cb("File already `exists`.")
    }
  })
}
db.read = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (!err && data) {
      cb(false, helpers.parseJsonToObject(data))
    } else {
      db.log("db.read", err)
      cb(err, data)
    }
  })
}
db.list = (things, cb) => {
  var promises = things.map(packet => {
    return new Promise((resolve, reject) => {
      db.read(packet, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  })
  Promise.all(promises)
    .then(results => {
      let list = results.filter(data => typeof data === "object")
      cb(false, list)
    })
    .catch(err => {
      db.log("db.list", err)
      cb("Could not `read` files for list. " + err)
    })
}
db.update = (packet, cb) => {
  packet.ItemList.numberOfItems = packet.ItemList.itemListElement.length
  const filePath = db.makeFilePath(packet)
  fs.open(filePath, "r+", (err, fileRef) => {
    if (!err && fileRef) {
      let stringData = JSON.stringify(packet, null, "\t")
      fs.ftruncate(fileRef, err => {
        if (!err) {
          fs.writeFile(fileRef, stringData, err => {
            if (!err) {
              fs.close(fileRef, err => {
                if (!err) {
                  cb(false, packet)
                } else {
                  db.log("db.update", err)
                  cb("Could not `close` file for update.")
                }
              })
            } else {
              cb("Could not `writeFile` for update.")
            }
          })
        } else {
          cb("Could not `truncate` file for update.")
        }
      })
    } else {
      db.log("db.update", err)
      cb("Could not `open` file for update.")
    }
  })
}
db.delete = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.unlink(filePath, err => {
    if (!err) {
      cb(false)
    } else {
      db.log(err)
      cb("Could not `delete` file.")
    }
  })
}
module.exports = db
