const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const takeonT = require("../../ribs/takeonT")
const { authT, engageT } = require("../../spine")
const OK = 201
const NOTOK = 406
describe("takeonT", () => {
  it("takeonTs", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, takeonT })
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
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, takenonData) => {
      wasSuccessfullyEngaged.should.equal(OK)
      ifFailErrMessage.should.equal("")
      takenonData.ItemList.numberOfItems.should.equal(1)
      takenonData.ItemList.itemListElement.length.should.equal(1)
      takenonData.ItemList.itemListElement[0].identifier.should.equal("eden")
      takenonData.should.eql({
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
    spareRibs.takeonT(eden, spareRibs, spareDb, cb)
  })
  it("takeonTs hardly anything", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, takeonT })
    let god = { identifier: "god", mainEntityOfPage: "Person" }
    let eden = {
      identifier: "eden",
      subjectOf: "god",
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ god, eden }),
    })
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, takenonData) => {
      wasSuccessfullyEngaged.should.equal(OK)
      ifFailErrMessage.should.equal("")
      takenonData.ItemList.numberOfItems.should.equal(1)
      takenonData.ItemList.itemListElement.length.should.equal(1)
      takenonData.ItemList.itemListElement[0].identifier.should.equal("eden")
      takenonData.should.eql({
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
    spareRibs.takeonT(eden, spareRibs, spareDb, cb)
  })
})
