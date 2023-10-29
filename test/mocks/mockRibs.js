const { cultify } = require("../../src/helpers")
const mockRibs = {}
mockRibs.authT = (rib, packet, ribs, db, cb) => {
  const { OK } = require("../../spine/authT")
  console.count("the Mock authT")
  cb(OK, "", cultify(packet))
}
mockRibs.noAuthT = (rib, packet, ribs, db, cb) => {
  const { NOTOK } = require("../../spine/authT")
  console.count("the Mock noAuthT")
  cb(NOTOK, "noAuthT Mock")
}
mockRibs.engageT = (rib, packet, ribs, db, cb) => {
  const { OK } = require("../../spine/engageT")
  console.count("the Mock engageT")
  cb(OK, "", cultify(packet))
}
mockRibs.notEngagedT = (rib, packet, ribs, db, cb) => {
  console.count("the Mock notEngagedT")
  const { NOTOK } = require("../../spine/engageT")
  cb(NOTOK, "notEngagedT Mock")
}
mockRibs.permitT = (rib, packet, ribs, db, cb, engagedData) => {
  const { OK } = require("../../spine/permitT")
  console.count("the Mock permitT")
  cb(OK, "", engagedData)
}
mockRibs.notPermittedT = (rib, packet, ribs, db, cb, engagedData) => {
  console.count("the Mock notPermittedT")
  const { NOTOK } = require("../../spine/permitT")
  cb(NOTOK, "notPermittedT Mock")
}
mockRibs.destroyT = (packet, ribs, db, cb) => {
  console.count("the Mock destroyT")
  const { OK } = require("../../ribs/destroyT")
  cb(OK, packet)
}
mockRibs.enlistT = (packet, ribs, db, cb) => {
  console.count("the Mock enlistT")
  let mockEngagedData = { identifier: packet.subjectOf }
  mockEngagedData.ItemList = { itemListElement: [packet] }
  const { OK } = require("../../ribs/enlistT")
  cb(OK, packet)
}
mockRibs.listT = (listData, ribs, db, cb) => {
  console.count("the Mock listT")
  const { OK } = require("../../ribs/listT")
  cb(OK, listData)
}
mockRibs.pingT = (packet, ribs, db, cb) => {
  console.count("the Mock pingT")
  const { OK } = require("../../ribs/pingT")
  cb(OK, packet)
}
mockRibs.readT = (packet, ribs, db, cb) => {
  console.count("the Mock readT")
  const { OK } = require("../../ribs/readT")
  let { sameAs } = packet
  if (sameAs) {
    cb(OK, packet[sameAs])
  } else {
    cb(OK, packet)
  }
}
mockRibs.schemaT = (packet, ribs, db, cb) => {
  console.count("the Mock schemaT")
  const { OK } = require("../../ribs/schemaT")
  cb(OK, { identifier: { type: "Text" } })
}
mockRibs.takeonT = (packet, ribs, db, cb) => {
  console.count("the Mock takeonT")
  const { OK } = require("../../ribs/takeonT")
  ribs.enlistT(packet, ribs, db, enlistedPacket => {
    cb(OK, packet)
  })
}
mockRibs.takeupT = (packet, ribs, db, cb) => {
  console.count("the Mock takeupT")
  const { OK } = require("../../ribs/takeupT")
  cb(OK, packet)
}
mockRibs.unlistT = (packet, ribs, db, cb) => {
  console.count("the Mock unlistT")
  const { OK } = require("../../ribs/unlistT")
  cb(OK, packet)
}
mockRibs.updateT = (packet, ribs, db, cb) => {
  console.count("the Mock updateT")
  const { OK } = require("../../ribs/updateT")
  cb(OK, packet)
}
mockRibs.inflateT = (packet, ribs, db, cb) => {
  console.count("the Mock inflateT")
  const { OK } = require("../../ribs/inflateT")
  cb(OK, packet)
}
mockRibs.optimizeT = (packet, ribs, db, cb) => {
  console.count("the Mock optimizeT")
  const { OK } = require("../../ribs/optimizeT")
  cb(OK, packet)
}
mockRibs.undoT = (packet, ribs, db, cb) => {
  console.count("the Mock undoT")
  const { OK } = require("../../ribs/undoT")
  cb(OK, packet)
}
module.exports = mockRibs
