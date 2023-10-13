const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const { destroyT, STATUSCODE } = require("../ribs/destroyT")
const { authT, engageT } = require("../spine")
describe("destroyT", () => {
  it("callsback to nothing", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, destroyT })
    let original = {      identifier: "god"    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readBackWhatWasGiven(original),
    })
    let cb = (code, data) => {
      code.should.equal(STATUSCODE)
      data.should.not.exist(original)
    }
    spareRibs.destroyT(fragment, spareRibs, spareDb, cb)
  })
})
