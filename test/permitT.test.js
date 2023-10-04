const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const permitT = require("../spine/permitT")
describe("permitT", () => {
  it("doesn't permitT by default", () => {
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasPermitted, ifPermissionFailedMessage, permittedData) => {
      wasPermitted.should.be.false
      ifPermissionFailedMessage.should.eql({
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "permitT",
          error: "No `permitIdentifier` and no anonymous access",
        },
        identifier: "No `permitIdentifier` and no anonymous access",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
      })
      should.not.exist(permittedData)
    }
    let macRibs = new Object({ ...mockRibs, permitT: permitT })
    macRibs.permitT("testT", mock, macRibs, mockDb, cb, mock)
  })
})
