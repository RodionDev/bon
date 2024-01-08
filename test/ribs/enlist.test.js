const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const enlistT = require("../../ribs/enlistT")
const { authT, engageT } = require("../../spine")
const OK = 302
const NOTOK = 304
describe("enlistT", () => {
  it("enlistTs", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, enlistT })
    let god = { identifier: "god", mainEntityOfPage: "Person" }
    let eden = {
      identifier: "eden",
      subjectOf: "god",
      mainEntityOfPage: "Place",
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ god, eden }),
    })
    let cb = (wasSuccessfullyEngaged, enlistedData) => {
      wasSuccessfullyEngaged.should.eql(OK)
      enlistedData.should.eql({
        identifier: "enlistT_eden",
        subjectOf: "eden",
        mainEntityOfPage: "Action",
        Action: { actionStatus: "CompletedActionStatus" },
      })
    }
    spareRibs.enlistT(eden, spareRibs, spareDb, cb)
  })
})
