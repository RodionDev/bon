const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const engageT = require("../spine/engageT")
describe("engageT", () => {
  it("engageTs", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
      ifFailErrMessage.should.equal("")
      engagedData.should.eql(mock)
    }
    let macRibs = new Object({ ...mockRibs, engageT: engageT })
    macRibs.engageT("testT", mock, macRibs, mockDb, cb)
  })
  it("only engageTs with objects", () => {
    let mock = "object"
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
      ifFailErrMessage.should.eql({
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "engageT",
          error: "No `identifier` parameter was included in the data packet",
        },
        identifier: "Missing `identifier`",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
      })
      should.not.exist(engagedData)
    }
    let macRibs = new Object({ ...mockRibs, engageT: engageT })
    macRibs.engageT("testT", mock, macRibs, mockDb, cb)
  })
  it("only engageTs with identifier", () => {
    let mock = { mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
      ifFailErrMessage.should.eql({
        identifier: "Missing `identifier`",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "engageT",
          error: "No `identifier` parameter was included in the data packet",
        },
      })
      should.not.exist(engagedData)
    }
    let macRibs = new Object({ ...mockRibs, engageT: engageT })
    macRibs.engageT("testT", mock, macRibs, mockDb, cb)
  })
})
