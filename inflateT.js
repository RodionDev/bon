const fs = require("fs")
const path = require("path")
function inflateT() {
  let engagedThingPath = path.join(__dirname, "./thing.json")
  fs.readFile(engagedThingPath, (err, data) => {
    if (err) throw err
    let engagedThing = JSON.parse(data)
    fs.readdir("./", (err, files) => {
      files.forEach(file => {
        fs.exists(path.join(__dirname, file, "thing.json"), err => {
          if (!err) {
            if (
              !engagedThing.ItemList.itemListElement
                .map(t => t.identifier)
                .includes(engagedThing.identifier)
            ) {
              engagedThing.ItemList.itemListElement.push(engagedThing)
            }
          }
        })
      })
      fs.writeFileSync(
        engagedThingPath,
        JSON.stringify(engagedThing, null, "  ")
      )
    })
  })
}
inflateT()
