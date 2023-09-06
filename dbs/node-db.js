const fs = require("fs")
const path = require("path")
const ThingBuilder = require("@elioway/thing/thing-builder")
const { schemaDomainUrl } = require("@elioway/thing/utils/get-schema")
const WITHNOERROR = false
const db = {}
db.initialize = envVars => {
  db.envVars = envVars
}
db.canExist = packet => typeof packet === "object" && packet.identifier
db.log = (...msg) => {} 
db.baseDir = path.join(__dirname, $DATADIR)
db.makeFilePath = packet => {
  let { identifier } = packet
  if (!fs.existsSync(db.baseDir)) {
    fs.mkdirSync(db.baseDir, { recursive: true })
  }
  return path.join(db.baseDir, `${identifier}.json`)
}
db.parseJsonToObject = str => {
  try {
    return JSON.parse(str)
  } catch (parseJsonToObjectErr) {
    return {}
  }
}
db.exists = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.exists(filePath, cb)
}
db.create = (packet, cb) => {
  db.exists(packet, (exists, existsErr) => {
    if (!exists && !existsErr) {
      const filePath = db.makeFilePath(packet)
      fs.open(filePath, "wx", (openErr, fileRef) => {
        if (!openErr && fileRef) {
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
          fs.writeFile(fileRef, stringData, writeErr => {
            if (!writeErr) {
              fs.close(fileRef, closeErr => {
                if (!closeErr) {
                  cb(WITHNOERROR, createPacket)
                } else {
                  db.log("db.create", closeErr)
                  cb("Could not `close` record for create.")
                }
              })
            } else {
              db.log("db.create", writeErr)
              cb("Could not `writeFile` for create.")
            }
          })
        } else {
          db.log("db.create", openErr)
          cb("Could not `open` record for create.")
        }
      })
    } else {
      db.log("db.create", existsErr)
      cb("Record already `exists`.")
    }
  })
}
db.read = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.readFile(filePath, "utf-8", (readErr, readData) => {
    let readThing = db.parseJsonToObject(readData)
    if (!readErr && db.canExist(readThing)) {
      cb(WITHNOERROR, readThing)
    } else {
      db.log("db.read", readErr)
      console.log({ packet })
      let subjectOf = packet.subjectOf
      if (subjectOf) {
        db.read({ identifier: subjectOf }, (readParentErr, parentThing) => {
          if (!readParentErr && db.canExist(parentThing)) {
            let readIndex = parentThing.ItemList.itemListElement.findIndex(
              p => p.identifier === packet.identifier
            )
            if (readIndex > -1) {
              cb(WITHNOERROR, parentThing.ItemList.itemListElement[readIndex])
            } else {
              cb("Nothing to read. No record found and not listed in parent")
            }
          } else {
            cb("Nothing to read. Neither record nor parent could be found")
          }
        })
      } else {
        cb("Nothing to read.  No record found and it has no parent")
      }
    }
  })
}
db.list = (things, cb) => {
  var promises = things.map(packet => {
    return new Promise((resolve, reject) => {
      db.read(packet, (readErr, readThing) => {
        if (!readErr) {
          resolve(readThing)
        } else {
          reject(readErr)
        }
      })
    })
  })
  Promise.all(promises)
    .then(results => {
      let list = results.filter(readThing => typeof readThing === "object")
      cb(WITHNOERROR, list)
    })
    .catch(promisesErr => {
      db.log("db.list", promisesErr)
      cb("Could not `read` files for list. " + promisesErr)
    })
}
db.update = (packet, cb) => {
  packet.ItemList.numberOfItems = packet.ItemList.itemListElement.length
  const filePath = db.makeFilePath(packet)
  fs.open(filePath, "r+", (openErr, fileRef) => {
    if (!openErr && fileRef) {
      let stringData = JSON.stringify(packet, null, "\t")
      fs.ftruncate(fileRef, ftruncateErr => {
        if (!ftruncateErr) {
          fs.writeFile(fileRef, stringData, writeErr => {
            if (!writeErr) {
              fs.close(fileRef, closeErr => {
                if (!closeErr) {
                  cb(WITHNOERROR, packet)
                } else {
                  db.log("db.update", closeErr)
                  cb("Could not `close` record for update.")
                }
              })
            } else {
              db.log("db.update", writeErr)
              cb("Could not `writeFile` for update.")
            }
          })
        } else {
          db.log("db.update", ftruncateErr)
          cb("Could not `truncate` record for update.")
        }
      })
    } else {
      db.log("db.update", openErr)
      let subjectOf = packet.subjectOf
      if (subjectOf) {
        db.read({ identifier: subjectOf }, (readParentErr, parentThing) => {
          if (!readParentErr && db.canExist(parentThing)) {
            let updateIndex = parentThing.ItemList.itemListElement.findIndex(
              p => p.identifier === packet.identifier
            )
            if (updateIndex > -1) {
              parentThing.ItemList.itemListElement[updateIndex] = {
                ...parentThing.ItemList.itemListElement[updateIndex],
                ...packet,
              }
              db.update(parentThing, (updateParentErr, updatedParent) => {
                if (!updateParentErr && db.canExist(updatedParent)) {
                  cb(
                    WITHNOERROR,
                    updatedParent.ItemList.itemListElement[updateIndex]
                  )
                } else {
                  db.log("db.update", updateParentErr)
                  cb(
                    "Could not even update this record directly in the parent",
                    updateParentErr
                  )
                }
              })
            } else {
              db.log("db.update", updateIndex)
              cb("Nothing to update. No record found and not listed in parent")
            }
          } else {
            db.log("db.update", readParentErr)
            cb(
              "Nothing to update. Neither record nor parent could be found",
              readParentErr
            )
          }
        })
      } else {
        cb("Nothing to update.  No record found and it has no parent")
      }
    }
  })
}
db.delete = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.unlink(filePath, deleteErr => {
    if (!deleteErr) {
      cb(WITHNOERROR)
    } else {
      db.log("db.delete", deleteErr)
      cb("Could not `delete` record.")
    }
  })
}
module.exports = db
