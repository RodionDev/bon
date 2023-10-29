const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const pingT = require("../../ribs/pingT")
const OK = 103
describe("pingT", () => {
  it("pongT", () => {
    let spareRibs = new Object({ ...mockRibs, pingT })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.should.eql({
        description: "Not this again!",
        mainEntityOfPage: "Action",
        Action: { actionStatus: "CompletedActionStatus" },
      })
    }
    spareRibs.pingT({}, spareRibs, mockDb, cb)
  })
})
