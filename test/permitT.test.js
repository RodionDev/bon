const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const permitT = require("../spine/permitT")
let CBTRUE = isPermitted => isPermitted.should.be.true
let CBFALSE = isPermitted => isPermitted.should.be.false
describe("permitT", () => {
  it("doesn't permitT by default", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let mock = { identifier: 1, mainEntityOfPage: "Person" }
    let cb = (wasPermitted, ifPermissionFailedMessage, permittedData) => {
      wasPermitted.should.be.false
      ifPermissionFailedMessage.should.eql({
        identifier: "Permission not granted",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "permitT",
          error: "Permission not granted",
        },
      })
      should.not.exist(permittedData)
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, cb, mock)
  })
  it("can grant permission to anyone on any endpoint", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing"
    let ACCESSFOR = "*"
    let ACCESSTO = "mockThing"
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(["*"], ACCESSCODE, ACCESSFOR, ""),
        ],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE)
  })
  it("can grant permission to anyone on specific endpoints", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing"
    let ACCESSFOR = "*"
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(
            ["testT", "checkT"],
            ACCESSCODE,
            ACCESSFOR,
            ""
          ),
        ],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE)
    spareRibs.permitT("checkT", mock, spareRibs, mockDb, CBTRUE)
    spareRibs.permitT("breakT", mock, spareRibs, mockDb, CBFALSE)
  })
  it("can grant permission to specific people", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing" 
    let ACCESSFOR = "permitThing" 
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(["testT"], ACCESSCODE, ACCESSFOR, ""),
        ],
      },
    }
    let permit = permitMaker(ACCESSFOR, ACCESSTO, ACCESSCODE)
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE, permit)
    spareRibs.permitT("breakT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission to specific people", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing" 
    let ACCESSFOR = "permitThing" 
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(["testT"], ACCESSCODE, "", ACCESSFOR),
        ],
      },
    }
    let permit = permitMaker(ACCESSFOR, ACCESSTO, ACCESSCODE)
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission to otherwise elible people", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing" 
    let ACCESSFOR = "permitThing" 
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(
            ["testT"],
            ACCESSCODE,
            ACCESSFOR,
            ACCESSFOR
          ),
        ],
      },
    }
    let permit = permitMaker(ACCESSFOR, ACCESSTO, ACCESSCODE)
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission to when otherwise allowing anonymous", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing" 
    let ACCESSFOR = "permitThing" 
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(["testT"], ACCESSCODE, "*", ACCESSFOR),
        ],
      },
    }
    let permit = permitMaker(ACCESSFOR, ACCESSTO, ACCESSCODE)
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission with competing access rules", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing" 
    let ACCESSFOR = "permitThing" 
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(["*"], ACCESSCODE, "*", ""),
          actionAccessSpecification(["testT"], ACCESSCODE, ACCESSFOR, ""),
          actionAccessSpecification(["testT"], ACCESSCODE, "*", ACCESSFOR),
        ],
      },
    }
    let permit = permitMaker(ACCESSFOR, ACCESSTO, ACCESSCODE)
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("revocation is per endpoint", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ACCESSCODE = "actionAccessThing" 
    let ACCESSFOR = "permitThing" 
    let ACCESSTO = "mockThing" 
    let mock = {
      identifier: ACCESSTO,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          actionAccessSpecification(["testT"], ACCESSCODE, ACCESSFOR, ""),
          actionAccessSpecification(["hopeT"], ACCESSCODE, "*", ACCESSFOR),
        ],
      },
    }
    let permit = permitMaker(ACCESSFOR, ACCESSTO, ACCESSCODE)
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE, permit)
    spareRibs.permitT("hopeT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
})
function actionMaker(identifier) {
return  new Object({
    identifier,
    mainEntityOfPage: "Action",
    Action: { instrument: "endpoint" },
  })
}
function permitMaker(
  permitIdentifier,
  engagedThingIdentifier,
  actionAccessSpecificationIdentifier
) {
  return new Object({
    identifier: permitIdentifier,
    mainEntityOfPage: "Permit",
    Permit: {
      issuedBy: engagedThingIdentifier,
      issuedThrough: actionAccessSpecificationIdentifier,
      permitAudience: permitIdentifier,
      validFor: "",
      validFrom: new Date(1970, 1, 1),
      validIn: "",
      validUntil: new Date(2040, 1, 1),
    },
  })
}
function actionAccessSpecification(
  ribs,
  actionAccessSpecificationIdentifier,
  eligibleRegion,
  ineligibleRegion
) {
  return new Object({
    identifier: actionAccessSpecificationIdentifier,
    mainEntityOfPage: "ActionAccessSpecification",
    ItemList: { itemListElement: ribs.map(actionMaker) },
    ActionAccessSpecification: {
      availabilityEnds: new Date(1970, 1, 1),
      availabilityStarts: new Date(2040, 1, 1),
      category: "endpointT",
      eligibleRegion: eligibleRegion,
      expectsAcceptanceOf: "Terms",
      ineligibleRegion: ineligibleRegion,
      requiresSubscription: 0,
    },
  })
}
