const should = require("chai").should()
const mockDb = require("./mocks/mockDb.js")
const mockRibs = require("./mocks/mockRibs.js")
const Thing = require("./mocks/Thing.js")
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
    "updateT"
  ).forEach(ribName => {
    it(`mock rib \`${ribName}\` should never fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: "god" }
      let cb = (code, thing) => {
        const { OK } = require(`../ribs/${ribName}`)
        code.should.eql(OK)
        thing.should.eql(packet)
      }
      ribT(packet, mockRibs, mockDb, cb)
    })
  })
  new Array("undoT", "inflateT").forEach(ribName => {
    it(`mock rib \`${ribName}\` should never fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: "god" }
      let cb = (code, thing) => {
        const { OK } = require(`../adons/${ribName}`)
        code.should.eql(OK)
        thing.should.eql(packet)
      }
      ribT(packet, mockRibs, mockDb, cb)
    })
  })
  it(`mock rib \`schemaT\` should never fail`, () => {
    let ribT = mockRibs.schemaT
    let packet = { identifier: { type: "Text" } }
    let cb = (code, thing) => {
      const { OK } = require(`../ribs/schemaT`)
      code.should.equal(OK)
      thing.should.eql(packet)
    }
    ribT(packet, mockRibs, mockDb, cb)
  })
})
describe("mockSpine | SPINEY endpoints which Never Fail", () => {
  new Array("authT", "engageT").forEach(ribName => {
    it(`mock spine \`${ribName}\` should never fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: "god" }
      let cb = (code, ifFailErrMessage, thing) => {
        const { OK } = require(`../spine/${ribName}`)
        code.should.equal(OK)
        ifFailErrMessage.should.eql("")
        thing.should.eql({ ...Thing, ...packet })
      }
      let resultOfEngageT = packet
      let args = ribT(ribName, packet, mockRibs, mockDb, cb, resultOfEngageT) 
    })
  })
  new Array("permitT").forEach(ribName => {
    it(`mock spine \`${ribName}\` should never fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: "god" }
      let cb = (code, ifFailErrMessage, thing) => {
        const { OK } = require(`../spine/${ribName}`)
        code.should.equal(OK)
        ifFailErrMessage.should.eql("")
        thing.should.eql(packet)
      }
      let resultOfEngageT = packet
      let args = ribT(ribName, packet, mockRibs, mockDb, cb, resultOfEngageT) 
    })
  })
  new Array(
    ["noAuthT", "authT"],
    ["notEngagedT", "engageT"],
    ["notPermittedT", "permitT"]
  ).forEach(([ribName, sub]) => {
    it(`mock spine \`${ribName}\` should always fail`, () => {
      let ribT = mockRibs[ribName]
      let packet = { identifier: "god" }
      let cb = (code, ifFailErrMessage, thing) => {
        const { NOTOK } = require(`../spine/${sub}`)
        code.should.equal(NOTOK)
        ifFailErrMessage.should.be.a("string")
        should.not.exist(thing)
      }
      let resultOfEngageT = packet
      ribT(ribName, packet, mockRibs, mockDb, cb, resultOfEngageT)
    })
  })
})
describe("mockDb | An airquotes DB which Never Fails", () => {
  it("mock `exists` should never fail", () => {
    let { exists } = mockDb
    let packet = { identifier: "god" }
    let cb = (isError, thing) => thing.should.eql(packet)
    exists(packet, cb)
  })
  it(`mock \`destroy\` should never fail`, () => {
    let { destroy } = mockDb
    let packet = { identifier: "god" }
    let cb = (isError, thing) => {
      isError.should.be.false
      should.not.exist(thing)
    }
    destroy(packet, cb)
  })
  it(`mock \`read\` to \`readBackWhatWasGiven\``, () => {
    let { readBackWhatWasGiven } = mockDb
    let packet = { identifier: "god" }
    let cb = (isError, thing) => {
      isError.should.be.false
      thing.should.eql({ identifier: "lucifer" })
    }
    readBackWhatWasGiven({ identifier: "lucifer" })(packet, cb)
  })
  new Array("create", "read", "list", "update").forEach(dbCommandName => {
    it(`mock db ${dbCommandName} should never fail`, () => {
      let packet = { identifier: "god" }
      let cb = (isError, thing) => {
        thing.should.eql(packet)
      }
      mockDb[dbCommandName](packet, cb)
    })
  })
})
