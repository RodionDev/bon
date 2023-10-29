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
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, enlistedData) => {
      wasSuccessfullyEngaged.should.equal(OK)
      ifFailErrMessage.should.equal("")
      enlistedData.ItemList.numberOfItems.should.equal(1)
      enlistedData.ItemList.itemListElement.length.should.equal(1)
      enlistedData.ItemList.itemListElement[0].identifier.should.equal("eden")
      enlistedData.should.eql({
        ...god,
        mainEntityOfPage: "Person",
        ItemList: {
          itemListElement: [
            {
              ...eden,
              ItemList: {
                itemListElement: [],
              },
            },
          ],
          numberOfItems: 1,
        },
      })
    }
    spareRibs.enlistT(eden, spareRibs, spareDb, cb)
  })
})
