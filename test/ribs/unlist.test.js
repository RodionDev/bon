const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const unlistT = require("../../ribs/unlistT")
const { authT, engageT } = require("../../spine")
const OK = 301
const NOTOK = 304
describe("unlistT", () => {
  it("unlistTs", () => {
    let spareRibs = new Object({ ...mockRibs, unlistT, authT, engageT })
    let eden = {
      identifier: "eden",
      subjectOf: "god",
      mainEntityOfPage: "Place",
    }
    let god = {
      identifier: "god",
      mainEntityOfPage: "Person",
      ItemList: { itemListElement: [eden] },
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ eden, god }),
    })
    let cb = (wasSuccessfullyEngaged, unlistedData) => {
      wasSuccessfullyEngaged.should.eql(OK)
      unlistedData.should.eql({
        identifier: "unlistT_god",
        subjectOf: "god",
        mainEntityOfPage: "Action",
        Action: { actionStatus: "CompletedActionStatus" },
      })
    }
    spareRibs.unlistT(eden, spareRibs, spareDb, cb)
  })
})
