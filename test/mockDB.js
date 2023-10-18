const path = require("path")
const WITHNOERROR = false
const mockDb = {}
mockDb.log = msg => {}
mockDb.baseDir = path.join(__dirname, "./TESTDATA")
mockDb.makeFilePath = packet =>
  path.join(mockDb.baseDir, `${packet.identifier}.json`)
mockDb.parseJsonToObject = str => JSON.parse(str)
mockDb.canExist = (packet, cb) => true
mockDb.exists = (packet, cb) => true
mockDb.create = (packet, cb) => {
  console.count("the Mock db.create")
  cb(WITHNOERROR, packet)
}
mockDb.read = (packet, cb) => {
  console.count("the Mock db.read")
  cb(WITHNOERROR, packet)
}
mockDb.readBackWhatWasGiven = whatWasGiven => (packet, cb) => {
  console.count("the Mock db.read returning whatWasGiven")
  cb(WITHNOERROR, whatWasGiven)
}
mockDb.readById = packs => (packet, cb) => {
  console.count("the Mock db.readById from my packs")
  cb(WITHNOERROR, packs[packet.identifier])
}
mockDb.list = (packet, cb) => {
  console.count("the Mock db.list")
  cb(WITHNOERROR, packet)
}
mockDb.update = (packet, cb) => {
  console.count("the Mock db.update")
  packet.ItemList = packet.ItemList || { itemListElement: [] }
  packet.ItemList.numberOfItems = packet.ItemList.itemListElement.length
  cb(WITHNOERROR, packet)
}
mockDb.destroy = (packet, cb) => {
  console.count("the Mock db.destroy")
  cb(WITHNOERROR)
}
module.exports = mockDb
