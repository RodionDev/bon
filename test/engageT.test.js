const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const engageT = require("../spine/engageT")
describe("engageT", () => {
  it("engageT", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (isError, errorMessage, engagedData) => {
      engagedData.should.equal(mock)
      isError.should.be.false
    }
    mockRibs.engageT(mock, mockRibs, mockDb, cb)
  })
})
