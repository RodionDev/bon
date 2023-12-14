const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const permitT = require("../../spine/permitT")
const { authT, engageT } = require("../../spine")
const OK = true
const NOTOK = false
let CBTRUE = isPermitted => isPermitted.should.equal(OK)
let CBFALSE = isPermitted => isPermitted.should.equal(NOTOK)
describe("permitT", () => {
  it("doesn't permitT by default", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let mock = {
      identifier: "heaven",
      mainEntityOfPage: "Place",
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
  it("permitTs by password", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ascendantPassword = "letmein"
    let gatesOfHeaven = "gatesOfHeaven"
    let heaven = "heaven"
    let passwordPermit = {
      identifier: gatesOfHeaven,
      subjectOf: heaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: heaven,
        issuedThrough: gatesOfHeaven,
        permitAudience: ascendantPassword,
        validFor: "*",
      },
    }
    let mock = {
      identifier: heaven,
      mainEntityOfPage: "Place",
      ItemList: {
        itemListElement: [passwordPermit],
        itemListOrder: "",
        numberOfItems: 1,
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE, {
      Permit: ascendantPassword,
    })
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, { Permit: "" })
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, {
      Permit: "notthepassword",
    })
  })
  it("can grant permission anon on any endpoint", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let gatesOfHeaven = "gatesOfHeaven"
    let heaven = "heaven"
    let anonGovPermit = {
      identifier: gatesOfHeaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        permitAudience: "*",
        validFor: "*",
      },
    }
    let mock = {
      identifier: heaven,
      mainEntityOfPage: "Place",
      ItemList: { itemListElement: [anonGovPermit] },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE)
  })
  it("can grant permission anon on specific endpoints", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let gatesOfHeaven = "gatesOfHeaven"
    let heaven = "heaven"
    let endpointPermit = {
      identifier: gatesOfHeaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        permitAudience: "*",
        validFor: "testT,checkT",
      },
    }
    let mock = {
      identifier: heaven,
      mainEntityOfPage: "ItemList",
      ItemList: { itemListElement: [endpointPermit] },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE)
    spareRibs.permitT("checkT", mock, spareRibs, mockDb, CBTRUE)
    spareRibs.permitT("breakT", mock, spareRibs, mockDb, CBFALSE)
  })
  it("can grant permission to specific things", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ascendant = "ascendant"
    let gatesOfHeaven = "gatesOfHeaven"
    let heaven = "heaven"
    let oneThingPermit = {
      identifier: gatesOfHeaven,
      subjectOf: heaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: heaven,
        issuedThrough: gatesOfHeaven,
        permitAudience: ascendant,
        validFor: "testT",
      },
    }
    let permit = {
      ...oneThingPermit,
      identifier: ascendant,
      mainEntityOfPage: "Permit",
    }
    let mock = {
      identifier: heaven,
      mainEntityOfPage: "Place",
      ItemList: {
        itemListElement: [oneThingPermit],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBTRUE, permit)
    spareRibs.permitT("breakT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("can revoke permission when otherwise allowed", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let ascendant = "ascendant"
    let gatesOfHeaven = "gatesOfHeaven"
    let heaven = "heaven"
    let anonPermit = {
      identifier: gatesOfHeaven,
      subjectOf: heaven,
      Permit: {
        issuedBy: heaven,
        issuedThrough: gatesOfHeaven,
        permitAudience: ascendant,
        validFor: "*",
      },
    }
    let permit = {
      ...anonPermit,
      identifier: ascendant,
      mainEntityOfPage: "Permit",
    }
    let blockingException = {
      identifier: gatesOfHeaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: heaven,
        issuedThrough: gatesOfHeaven,
        permitAudience: ascendant,
        validFor: "-",
      },
    }
    let mock = {
      identifier: heaven,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [anonPermit, blockingException],
      },
    }
    spareRibs.permitT("testT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("revocation is per endpoint", () => {
    let spareRibs = new Object({ ...mockRibs, permitT: permitT })
    let gatesOfHeaven = "gatesOfHeaven"
    let ascendant = "ascendant"
    let heaven = "heaven"
    let heavenPermit = {
      identifier: gatesOfHeaven,
      subjectOf: heaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: heaven,
        issuedThrough: gatesOfHeaven,
        permitAudience: ascendant,
        validFor: "hopeT,knowT",
      },
    }
    let permit = {
      ...heavenPermit,
      identifier: ascendant,
      mainEntityOfPage: "Permit",
    }
    let blockingException = {
      identifier: gatesOfHeaven,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: heaven,
        issuedThrough: gatesOfHeaven,
        permitAudience: ascendant,
        validFor: "-hopeT",
      },
    }
    let mock = {
      identifier: heaven,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [heavenPermit, blockingException],
      },
    }
    spareRibs.permitT("knowT", mock, spareRibs, mockDb, CBTRUE, permit)
    spareRibs.permitT("hopeT", mock, spareRibs, mockDb, CBFALSE, permit)
  })
  it("endpoints allowed via subjectOf's permission", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, permitT })
    let gatesOfHeavenIdentifier = "gatesOfHeaven"
    let ascendantIdentifier = "ascendant"
    let heavenIdentifier = "heaven"
    let godIdentifier = "god"
    let heavenPermit = {
      identifier: gatesOfHeavenIdentifier,
      subjectOf: heavenIdentifier,
      mainEntityOfPage: "GovernmentPermit",
      Permit: {
        issuedBy: heavenIdentifier,
        issuedThrough: gatesOfHeavenIdentifier,
        permitAudience: ascendantIdentifier,
        validFor: "hopeT,knowT",
      },
    }
    let permit = {
      ...heavenPermit,
      identifier: ascendantIdentifier,
      mainEntityOfPage: "Permit",
      subjectOf: gatesOfHeavenIdentifier,
    }
    let god = {
      identifier: godIdentifier,
      subjectOf: heavenIdentifier,
      mainEntityOfPage: "Person",
      ItemList: { itemListElement: [] },
    }
    let heaven = {
      identifier: heavenIdentifier,
      mainEntityOfPage: "ItemList",
      ItemList: {
        itemListElement: [heavenPermit, god],
      },
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ heaven, god }),
    })
    spareRibs.permitT("hopeT", god, spareRibs, spareDb, CBTRUE, permit)
  })
})
