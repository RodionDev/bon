const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const permitT = require("../spine/permitT")
const { accessSpecsMaker, permitMaker } = require("../ribs/inviteT")
const OK = true
const NOTOK = false
let CBTRUE = isPermitted => isPermitted.should.equal(OK)
let CBFALSE = isPermitted => isPermitted.should.equal(NOTOK)
describe("permitT", () => {
  it("doesn't permitT by default", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let mock = {
      identifier: "god",
      mainEntityOfPage: "Person",
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
    }
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
  it("can grant permission anon on any endpoint", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "*"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["*"].join(","),
        eligibleRegion: permitIdentifier,
        ineligibleRegion: "",
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: { itemListElement: [specs] },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE)
  })
  it("can grant permission anon on specific endpoints", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "*"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["testT", "checkT"].join(","),
        eligibleRegion: permitIdentifier,
        ineligibleRegion: "",
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: { itemListElement: [specs] },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE)
    spareRibs.permitT("checkT", mock, spareRibs, mockDb, CBTRUE)
    spareRibs.permitT("breakT", mock, spareRibs, mockDb, CBFALSE)
  })
  it("can grant permission to specific people", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "permitThing"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["testT"].join(","),
        eligibleRegion: permitIdentifier,
        ineligibleRegion: "",
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [specs],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE, permit)
    spareRibs.permitT("breakT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission to specific people", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "permitThing"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["*"].join(","),
        eligibleRegion: "",
        ineligibleRegion: permitIdentifier,
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [specs],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission to otherwise elible people", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "permitThing"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["testT"].join(","),
        eligibleRegion: permitIdentifier,
        ineligibleRegion: permitIdentifier,
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [specs],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission to when otherwise allowing anonymous", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "permitThing"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["*"].join(","),
        eligibleRegion: "*",
        ineligibleRegion: permitIdentifier,
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [specs],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission with competing access rules", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "permitThing"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["*"].join(","),
        eligibleRegion: "*",
        ineligibleRegion: permitIdentifier,
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          accessSpecsMaker({
            identifier: specsIdentifier,
            subjectOf: mockThingIdentifier,
            ActionAccessSpecification: {
              requiresSubscription: ["*"].join(","),
              eligibleRegion: "*",
              ineligibleRegion: "",
            },
          }),
          accessSpecsMaker({
            identifier: specsIdentifier,
            subjectOf: mockThingIdentifier,
            ActionAccessSpecification: {
              requiresSubscription: ["*"].join(","),
              eligibleRegion: permitIdentifier,
              ineligibleRegion: "",
            },
          }),
          specs,
        ],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("revocation is per endpoint", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let specsIdentifier = "specsThing"
    let permitIdentifier = "permitThing"
    let mockThingIdentifier = "mockThing"
    let specs = accessSpecsMaker({
      identifier: specsIdentifier,
      subjectOf: mockThingIdentifier,
      ActionAccessSpecification: {
        requiresSubscription: ["testT"].join(","),
        eligibleRegion: permitIdentifier,
        ineligibleRegion: "",
      },
    })
    let permit = permitMaker(permitIdentifier, specs)
    let mock = {
      identifier: mockThingIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [
          specs,
          accessSpecsMaker({
            identifier: specsIdentifier,
            subjectOf: mockThingIdentifier,
            ActionAccessSpecification: {
              requiresSubscription: ["hopeT"].join(","),
              eligibleRegion: "*",
              ineligibleRegion: permitIdentifier,
            },
          }),
        ],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE, permit)
    spareRibs.permitT("hopeT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
})
