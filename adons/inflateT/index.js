const fs = require("fs")
const path = require("path")
const OK = 206
const NOTOK = 417
const inflateT = (packet, ribs, db, cb) => {
  const { authT, updateT } = ribs
  authT("inflateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      fs.readdir(db.envVars.DATADIR, (err, files) => {
        let proms = files.map(
          possibleListedPath =>
            new Promise((resolve, reject) => {
              let listedThingPath = path.join(possibleListedPath, "thing.json")
              fs.exists(listedThingPath, exists => {
                if (exists) {
                  fs.readFile(listedThingPath, (err, listedData) => {
                    resolve(JSON.parse(listedData))
                  })
                } else {
                  reject()
                }
              })
            })
        )
        Promise.allSettled(proms)
          .then(listedThings => {
            listedThings
              .filter(p => p.status === "fulfilled")
              .map(p => p.value)
              .forEach(listedThing => {
                if (
                  !engagedData.ItemList.itemListElement
                    .map(t => t.identifier)
                    .includes(listedThing.identifier)
                ) {
                  engagedData.ItemList.itemListElement.push(listedThing)
                }
              })
            saveT("inflateT", engagedData, db, () => {})
          })
          .catch(err => console.assert(!err, err)) 
      }) 
    } else {
      cb(404, authError)
    }
  }) 
}
module.exports = inflateT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
