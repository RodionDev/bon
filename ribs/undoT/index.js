const fs = require("fs")
const path = require("path")
const { pick } = require("lodash")
function inflateT() {
  let engagedThingPath = path.join(__dirname, "./thing.json")
  fs.readFile(engagedThingPath, (err, engagedData) => {
    if (err) throw err
    let engagedThing = JSON.parse(engagedData)
    fs.readdir("./", (err, files) => {
      let proms = files.map(
        possibleListedPath =>
          new Promise((resolve, reject) => {
            let listedThingPath = path.join(
              __dirname,
              possibleListedPath,
              "thing.json"
            )
            fs.exists(listedThingPath, exists => {
              if (exists) {
                fs.readFile(listedThingPath, (err, listedData) => {
                  let listedThing = pick(JSON.parse(listedData), [
                    "additionalType",
                    "name",
                    "identifier",
                    "image",
                    "url",
                  ])
                  resolve(listedThing)
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
                !engagedThing.ItemList.itemListElement
                  .map(t => t.identifier)
                  .includes(listedThing.identifier)
              ) {
                engagedThing.ItemList.itemListElement.push(listedThing)
              }
            })
          fs.writeFileSync(
            engagedThingPath,
            JSON.stringify(engagedThing, null, "  ")
          )
        })
        .catch(err => console.log({ err })) 
    }) 
  }) 
}
inflateT()
