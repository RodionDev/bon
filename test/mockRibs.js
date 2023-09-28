const mockRibs = {}
mockRibs.destroyT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.enlistT = (packet, ribs, db, cb) => {
  delete packet.password
  cb(200, packet)
}
mockRibs.listT = (listData, ribs, db, cb) => cb(200, listData)
mockRibs.pingT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.readT = (packet, ribs, db, cb) => {
  delete packet.password
  let { sameAs } = packet
  if (sameAs) {
    cb(200, packet[sameAs])
  } else {
    cb(200, packet)
  }
}
mockRibs.schemaT = (packet, ribs, db, cb) =>
  cb(200, { identifier: { type: "Text" } })
mockRibs.takeonT = (packet, ribs, db, cb) => ribs.enlistT(packet, ribs, db, cb)
mockRibs.takeupT = (packet, ribs, db, cb) => {
  delete packet.password
  cb(200, packet)
}
mockRibs.unlistT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.updateT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.inflateT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.optimizeT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.undoT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.engageT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.authT = (rib, packet, ribs, db, cb) => cb(200, packet)
mockRibs.permitT = (rib, packet, ribs, db, cb) => cb(200, packet)
module.exports = mockRibs
