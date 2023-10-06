const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const authT = require("../spine/authT")
describe("authT", () => {
  it("authTs if permitT permits", () => {
    let spareRibs = new Object({ ...mockRibs, authT: authT })
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyAuthed, ifFailErrMessage, authData) => {
      wasSuccessfullyAuthed.should.be.true
      ifFailErrMessage.should.eql("")
      authData.should.eql(mock)
    }
    spareRibs.authT("testT", mock, spareRibs, mockDb, cb)
  })
  it("doesn't authTs if permitT doesn't permit", () => {
    let spareRibs = new Object({
      ...mockRibs,
      authT: authT,
      permitT: mockRibs.notPermittedT,
    })
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyAuthed, ifFailErrMessage, authData) => {
      wasSuccessfullyAuthed.should.be.false
      ifFailErrMessage.should.eql({
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "authT",
          error: "notPermittedT Mock",
        },
        identifier: "notPermittedT Mock",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
      })
      should.not.exist(authData)
    }
    spareRibs.authT("testT", mock, spareRibs, mockDb, cb)
  })
})
