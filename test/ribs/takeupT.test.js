const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const takeupT = require("../../ribs/takeupT")
const { authT, engageT } = require("../../spine")
const OK = 201
const NOTOK = 406
describe("takeupT", () => {
  it("creates something original", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, takeupT })
    let mock = {
      identifier: "god",
      mainEntityOfPage: "Action",
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
        identifier: "god",
        mainEntityOfPage: "Place",
        ItemList: {
          itemListElement: [],
          itemListOrder: "",
          numberOfItems: 0, 
        },
        ActionAccessSpecification: {
          identifier: "eveCanTakeABone",
        },
        Something: {
          complicated: {
            here: "be careful",
            changed: true,
            added: true,
          },
          notSoComplicated: {
            here: "its fine",
          },
        },
      })
    }
    spareRibs.takeupT(update, spareRibs, spareDb, cb)
  })
})
