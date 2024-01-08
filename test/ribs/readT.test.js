const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const Person = require("../mocks/Person.js")
const readT = require("../../ribs/readT")
const { authT, engageT } = require("../../spine")
const OK = 200
const NOTOK = 404
describe("readT", () => {
  it("reads the original", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, readT })
    let original = {
      ...Person,
      identifier: "god",
      mainEntityOfPage: "Person",
      alternateName: "The Almighty",
      Original: {
        changed: false,
      },
    }
    let fragment = { identifier: "god" }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readBackWhatWasGiven(original),
    })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.should.eql(original)
    }
    spareRibs.readT(fragment, spareRibs, spareDb, cb)
  })
})
