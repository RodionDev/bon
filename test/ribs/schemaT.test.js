const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const schemaT = require("../../ribs/schemaT")
const OK = 103
const NOTOK = 406
describe("schemaT", () => {
  it("has Schema models", () => {
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
  it("has thinglets", () => {
    let spareRibs = new Object({ ...mockRibs, schemaT })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.mainEntityOfPage.should.equal("Action")
      data.Action.actionStatus.should.equal("")
    }
    spareRibs.schemaT({ mainEntityOfPage: "action" }, spareRibs, mockDb, cb)
  })
})
