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
        description:
          '\nAll sorts are here that all the Earth yields,\nVariety without end; but of the tree,\nWhich, tasted, works knowledge of good and evil,\nThou mayest not"',
        mainEntityOfPage: "Action",
        name: "pingT",
        potentialAction: "bones permitT",
        Action: { actionStatus: "CompletedActionStatus" },
      })
    }
    spareRibs.pingT({}, spareRibs, mockDb, cb)
  })
})
