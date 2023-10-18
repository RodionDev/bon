const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const unlistT = require("../ribs/unlistT")
const { authT, engageT } = require("../spine")
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
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, unlistedData) => {
      console.log({ ifFailErrMessage })
      wasSuccessfullyEngaged.should.equal(OK)
      ifFailErrMessage.should.equal("")
      unlistedData.ItemList.numberOfItems.should.equal(0)
      unlistedData.ItemList.itemListElement.length.should.equal(0)
      unlistedData.should.eql({
        ...god,
        mainEntityOfPage: "Place",
        ItemList: {
          itemListElement: [],
          numberOfItems: 0,
        },
      })
    }
    spareRibs.unlistT(eden, spareRibs, spareDb, cb)
  })
})
