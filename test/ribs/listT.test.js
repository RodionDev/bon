const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const listT = require("../../ribs/listT")
const { authT, engageT } = require("../../spine")
const OK = 200
const NOTOK = 404
describe("listT", () => {
  it("reads the original", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, listT })
    let eve = { identifier: "eve", mainEntityOfPage: "Person" }
    let adam = { identifier: "adam", mainEntityOfPage: "Person" }
    let lucifer = { identifier: "lucifer", mainEntityOfPage: "Person" }
    let snake = { identifier: "snake", mainEntityOfPage: "Thing" }
    let apple = { identifier: "apple", mainEntityOfPage: "Thing" }
    let god = {
      identifier: "god",
      mainEntityOfPage: "Person",
      ItemList: {
        itemListElement: [eve, adam, lucifer, snake, apple],
      },
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ eve, adam, lucifer, snake, apple, god }),
    })
    let cb = (code, listedData) => {
      code.should.equal(OK)
      listedData.should.eql([eve, adam, lucifer, snake, apple])
    }
    spareRibs.listT(god, spareRibs, spareDb, cb)
  })
})
