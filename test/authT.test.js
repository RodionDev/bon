const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const authT = require("../spine/authT")
describe("authT", () => {
  it("authTs if permitT permits", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyAuthed, ifFailErrMessage, authData) => {
      wasSuccessfullyAuthed.should.be.true
      ifFailErrMessage.should.eql("")
      authData.should.eql(mock)
    }
    let macRibs = new Object({ ...mockRibs, authT: authT })
    macRibs.authT("testT", mock, macRibs, mockDb, cb)
  })
  it("doesn't authTs if permitT doesn't permit", () => {
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
    let macRibs = new Object({
      ...mockRibs,
      authT: authT,
      permitT: mockRibs.notPermittedT,
    })
    macRibs.authT("testT", mock, macRibs, mockDb, cb)
  })
})
describe("The authT Permit system", () => {
  it("can allow ", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
  })
})
describe("How it is rib agnostic.", () => {
  it("can allow ", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
  })
})
