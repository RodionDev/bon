const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
describe("Test | Never Fails", () => {
  it("didn't fail! if other tests are failing - that's on you", () => {
    true.should.have.and.have.been.and.of.that.same.same.is.that.same.to.be.true
  })
})
describe("mockRibs | TURDy and LUTEy endpoints which Never Fail", () => {
  new Array(
    "pingT",
    "readT",
    "takeonT",
    "takeupT",
    "unlistT",
    "updateT",
    "inflateT",
    "optimizeT",
    "undoT"
  ).forEach(ribName => {
    it(`mock rib \`${ribName}\` should never fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: 1 }
      let cb = (code, thing) => thing.should.eql(packet)
      ribT(packet, mockRibs, mockDb, cb)
    })
  })
  it(`mock rib \`schemaT\` should never fail`, () => {
    let ribT = mockRibs.schemaT
    let packet = { identifier: { type: "Text" } }
    let cb = (code, thing) => thing.should.eql(packet)
    ribT(packet, mockRibs, mockDb, cb)
  })
})
describe("mockSpine | SPINEY endpoints which Never Fail", () => {
  new Array("authT", "engageT", "permitT").forEach(ribName => {
    it(`mock spine \`${ribName}\` should never fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: 1 }
      let cb = (result, ifFailErrMessage, thing) => {
        result.should.be.true
        ifFailErrMessage.should.eql("")
        thing.should.eql(packet)
      }
      let resultOfEngageT = packet
      let args = ribT(ribName, packet, mockRibs, mockDb, cb, resultOfEngageT) 
    })
  })
  new Array("noAuthT", "notEngagedT", "notPermittedT").forEach(ribName => {
    it(`mock spine \`${ribName}\` should always fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: 1 }
      let cb = (result, ifFailErrMessage, thing) => {
        result.should.be.false
        ifFailErrMessage.should.be.a("string")
        should.not.exist(thing)
      }
      let resultOfEngageT = packet
      ribT(ribName, packet, mockRibs, mockDb, cb, resultOfEngageT)
    })
  })
})
describe("mockDB | An airquotes DB which Never Fails", () => {
  it("mock `exists` should never fail", () => {
    let { exists } = mockDb
    let packet = { identifier: 1 }
    let cb = (isError, thing) => thing.should.eql(packet)
    exists(packet, cb)
  })
  it(`mock \`destroy\` should never fail`, () => {
    let { destroy } = mockDb
    let packet = { identifier: 1 }
    let cb = (isError, thing) => {
      isError.should.be.false
      should.not.exist(thing)
    }
    destroy(packet, cb)
  })
  new Array("create", "read", "list", "update").forEach(dbCommandName => {
    it(`mock db ${dbCommandName} should never fail`, () => {
      let packet = { identifier: 1 }
      let cb = (isError, thing) => thing.should.eql(packet)
      mockDb[dbCommandName](packet, cb)
    })
  })
})
