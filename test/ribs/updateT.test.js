const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const updateT = require("../../ribs/updateT")
const { authT, engageT } = require("../../spine")
const OK = 202
const NOTOK = 400
describe("updateT", () => {
  it("changes the original", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, updateT })
    let mock = {
      identifier: "god",
      mainEntityOfPage: "Person",
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
      Something: {
        complicated: {
          here: "be careful",
          changed: false,
        },
      },
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readBackWhatWasGiven(mock),
    })
    let update = {
      identifier: "god",
      mainEntityOfPage: "Place",
      ActionAccessSpecification: {
        identifier: "eveCanTakeABone",
      },
      ItemList: {
        numberOfItems: 2,
      },
      Something: {
        complicated: {
          changed: true,
          added: true,
        },
        notSoComplicated: {
          here: "its fine",
        },
      },
    }
    let cb = (code, data) => {
      code.should.equal(OK)
      data.should.eql({
        identifier: "updateT_god",
        mainEntityOfPage: "Action",
        subjectOf: "god",
        Action: {
          actionStatus: "CompletedActionStatus",
        },
      })
    }
    spareRibs.updateT(update, spareRibs, spareDb, cb)
  })
  it("can clear fields", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, updateT })
    let mock = {
      identifier: "god",
      mainEntityOfPage: "Person",
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
      Something: {
        complicated: {
          here: "something is here",
          changed: true,
        },
      },
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readBackWhatWasGiven(mock),
    })
    let update = {
      identifier: "god",
      mainEntityOfPage: "Place",
      Something: {
        complicated: {
          here: "",
          changed: false,
        },
      },
    }
    let cb = (code, data) => {
      code.should.equal(OK)
      data.should.eql({
        identifier: "updateT_god",
        mainEntityOfPage: "Action",
        subjectOf: "god",
        Action: {
          actionStatus: "CompletedActionStatus",
        },
      })
    }
    spareRibs.updateT(update, spareRibs, spareDb, cb)
  })
})
