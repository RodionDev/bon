const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const schemaT = require("../ribs/schemaT")
const OK = 103
const NOTOK = 406
describe("schemaT", () => {
  it.only("has Schema models", () => {
    let spareRibs = new Object({ ...mockRibs, schemaT })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.Action.actionStatus.should.exist
      data.Action.actionStatus.should.eql({
        type: "Text",
        enums: [
          "FailedActionStatus",
          "CompletedActionStatus",
          "ActiveActionStatus",
          "PotentialActionStatus",
        ],
      })
    }
    spareRibs.schemaT({ mainEntityOfPage: "Action" }, spareRibs, mockDb, cb)
  })
  it.only("has thinglets", () => {
    let spareRibs = new Object({ ...mockRibs, schemaT })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.additionalType.should.equal("Action")
      data.Action.actionStatus.should.equal("")
    }
    spareRibs.schemaT({ mainEntityOfPage: "action" }, spareRibs, mockDb, cb)
  })
})
