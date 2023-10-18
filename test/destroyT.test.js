const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const destroyT = require("../ribs/destroyT")
const { authT, engageT } = require("../spine")
const OK = 308
const NOTOK = 423
describe("destroyT", () => {
  it("callsback to nothing", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, destroyT })
    let original = { identifier: "god" }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readBackWhatWasGiven(original),
    })
    let cb = (code, data) => {
      code.should.equal(OK)
      data.should.not.exist(original)
    }
    spareRibs.destroyT({ identifier: 1 }, spareRibs, spareDb, cb)
  })
})
