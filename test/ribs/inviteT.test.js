const should = require("chai").should()
const mockDb = require("../mocks/mockDB.js")
const mockRibs = require("../mocks/mockRibs.js")
const inviteT = require("../../ribs/inviteT")
const OK = 206
const NOTOK = 417
describe("inviteT", () => {
  it("takeson an accessSpec and issues a permit", () => {
    let spareRibs = new Object({ ...mockRibs, inviteT: inviteT })
    let mock = {
      identifier: "god",
      mainEntityOfPage: "Person",
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
    }
    let cb = (code, permit) => {
      code.should.eql(OK)
      permit.identifier.should.be.a("string")
      permit.mainEntityOfPage.should.eql("Permit")
      permit.subjectOf.should.eql(permit.Permit.permitAudience)
      permit.Permit.issuedBy.should.eql("god")
      permit.Permit.issuedThrough.should.be.a("string")
      permit.Permit.permitAudience.should.be.a("string")
      permit.Permit.validFrom.should.eql("1970-01-01")
      permit.Permit.validUntil.should.eql("2040-01-01")
    }
    spareRibs.inviteT(mock, spareRibs, mockDb, cb)
  })
  it("parameters config the accessSpec and issue the correct permit", () => {
    let spareRibs = new Object({ ...mockRibs, inviteT: inviteT })
    let mock = {
      identifier: "adam",
      mainEntityOfPage: "Person",
      subjectOf: "god",
      ActionAccessSpecification: {
        availabilityEnds: "2030-01-01",
        eligibleRegion: "eve",
        identifier: "eveCanTakeABone",
        requiresSubscription: "unlistT",
      },
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
    }
    let cb = (code, permit) => {
      code.should.eql(OK)
      permit.identifier.should.be.a("string")
      permit.identifier.length.should.be.gt(16)
      permit.subjectOf.should.eql(permit.Permit.permitAudience)
      permit.mainEntityOfPage.should.eql("Permit")
      permit.Permit.issuedBy.should.eql("adam")
      permit.Permit.issuedThrough.should.eql("eveCanTakeABone")
      permit.Permit.permitAudience.should.eql("eve")
      permit.Permit.validFrom.should.eql("1970-01-01")
      permit.Permit.validUntil.should.eql("2030-01-01")
      requiresSubscription: "unlistT"
    }
    spareRibs.inviteT(mock, spareRibs, mockDb, cb)
  })
})
