const path = require("path")
const WITHNOERROR = false
const mockDb = {}
mockDb.log = msg => {}
mockDb.baseDir = path.join(__dirname, "./TESTDATA")
mockDb.makeFilePath = packet =>
  path.join(mockDb.baseDir, `${packet.identifier}.json`)
mockDb.parseJsonToObject = str => JSON.parse(str)
mockDb.exists = (packet, cb) => true
mockDb.create = (packet, cb) => cb(WITHNOERROR, packet)
mockDb.read = (packet, cb) => cb(WITHNOERROR, packet)
mockDb.list = (packet, cb) => cb(WITHNOERROR, packet)
mockDb.update = (packet, cb) => {
  packet.ItemList = packet.ItemList || { itemListElement: []}
  packet.ItemList.numberOfItems = packet.ItemList.itemListElement.length
  cb(WITHNOERROR, packet)
}
mockDb.destroy = (packet, cb) => cb(WITHNOERROR)
module.exports = mockDb
