const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
describe("Never Fails", () => {
  it("really really never fails", () => {
    true.should.be.ok
  })
})
describe("mockRibs | endpoint which NeverFail", () => {
  Object.entries(mockRibs).forEach(([ribName, ribT]) => {
    it(`mock endpoint \`${ribName}\` should not ever fail`, () => {
      let packet = { identifier: { type: "Text" } }
      let cb = (code, t) => t.should.eql(packet)
      ribT(packet, mockRibs, mockDb, cb)
    })
  })
})
describe("mockDB NeverFails", () => {
  it("mock \`exists\` should not ever fail", () => {
    let { exists } = mockDb
    let packet = { identifier: 1 }
    let cb = (isError, t) => t.should.eql(packet)
    exists(packet, cb)
  })
  it(`mock \`destroy\` should not ever fail`, () => {
    let { destroy } = mockDb
    let packet = { identifier: 1 }
    let cb = (isError, t) => {
      isError.should.be.false
      should.not.exist(t)
    }
    destroy(packet, cb)
  })
  new Array("create", "read", "list", "update").forEach(dbCommandName=> {
    it(`mock db ${dbCommandName} should not ever fail`, () => {
      let packet = { identifier: 1 }
      let cb = (isError, t) => t.should.eql(packet)
      mockDb[dbCommandName](packet, cb)
    })
  })
})
