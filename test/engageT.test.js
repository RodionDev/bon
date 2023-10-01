const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const engageT = require("../spine/engageT")
describe("engageT", () => {
  it.only("engageT", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasTicketyBoo, errorMessage, engagedData) => {
      wasTicketyBoo.should.be.true
      engagedData.should.equal(mock)
    }
    mockRibs.engageT = engageT
    mockRibs.engageT(mock, mockRibs, mockDb, cb)
  })
})
