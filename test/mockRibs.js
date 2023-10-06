const mockRibs = {}
mockRibs.authT = (rib, packet, ribs, db, cb) => {
  console.log("the Mock authT")
  cb(true, "", packet)
}
mockRibs.noAuthT = (rib, packet, ribs, db, cb) => {
  console.log("the Mock noAuthT")
  cb(false, "noAuthT Mock")
}
mockRibs.engageT = (rib, packet, ribs, db, cb) => {
  console.log("the Mock engageT")
  cb(true, "", packet)
}
mockRibs.notEngagedT = (rib, packet, ribs, db, cb) => {
  console.log("the Mock notEngagedT")
  cb(false, "notEngagedT Mock")
}
mockRibs.permitT = (rib, packet, ribs, db, cb, engagedData) => {
  console.log("the Mock permitT")
  cb(true, "", engagedData)
}
mockRibs.notPermittedT = (rib, packet, ribs, db, cb, engagedData) => {
  console.log("the Mock notPermittedT")
  cb(false, "notPermittedT Mock")
}
mockRibs.destroyT = (packet, ribs, db, cb) => {
  console.log("the Mock destroyT")
  cb(200, packet)
}
mockRibs.enlistT = (packet, ribs, db, cb) => {
  console.log("the Mock enlistT")
  delete packet.password
  cb(200, packet)
}
mockRibs.listT = (listData, ribs, db, cb) => {
  console.log("the Mock listT")
  cb(200, listData)
}
mockRibs.pingT = (packet, ribs, db, cb) => {
  console.log("the Mock pingT")
  cb(200, packet)
}
mockRibs.readT = (packet, ribs, db, cb) => {
  console.log("the Mock readT")
  delete packet.password
  let { sameAs } = packet
  if (sameAs) {
    cb(200, packet[sameAs])
  } else {
    cb(200, packet)
  }
}
mockRibs.schemaT = (packet, ribs, db, cb) => {
  console.log("the Mock schemaT")
  cb(200, { identifier: { type: "Text" } })
}
mockRibs.takeonT = (packet, ribs, db, cb) => {
  console.log("the Mock takeonT")
  ribs.enlistT(packet, ribs, db, cb)
}
mockRibs.takeupT = (packet, ribs, db, cb) => {
  console.log("the Mock takeupT")
  delete packet.password
  cb(200, packet)
}
mockRibs.unlistT = (packet, ribs, db, cb) => {
  console.log("the Mock unlistT")
  cb(200, packet)
}
mockRibs.updateT = (packet, ribs, db, cb) => {
  console.log("the Mock updateT")
  cb(200, packet)
}
mockRibs.inflateT = (packet, ribs, db, cb) => {
  console.log("the Mock inflateT")
  cb(200, packet)
}
mockRibs.optimizeT = (packet, ribs, db, cb) => {
  console.log("the Mock optimizeT")
  cb(200, packet)
}
mockRibs.undoT = (packet, ribs, db, cb) => {
  console.log("the Mock undoT")
  cb(200, packet)
}
module.exports = mockRibs