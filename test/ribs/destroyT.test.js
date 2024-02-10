const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const destroyT = require("../../ribs/destroyT")
const { authT, engageT } = require("../../spine")
const OK = 308
const NOTOK = 423
describe("destroyT", () => {
  it("callsback nothing", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, destroyT })
    let original = { identifier: "god" }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readBackWhatWasGiven(original),
    })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.should.eql({
        identifier: "tokenFemaleRole Thing destroyed",
        mainEntityOfPage: "Action",
        potentialAction: {
          identifier: "unlist tokenFemaleRole",
          Action: {
            agent: "unlist tokenFemaleRole",
            actionStatus: "PotentialActionStatus",
          },
        },
        Action: { agent: "destroyT", actionStatus: "CompletedActionStatus" },
      })
    }
    spareRibs.destroyT(
      { identifier: "tokenFemaleRole" },
      spareRibs,
      spareDb,
      cb
    )
  })
})
