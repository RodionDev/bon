const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const inviteT = require("../../adons/inviteT")
const OK = 206
const NOTOK = 417
describe("inviteT", () => {
  it("takeson an GovernmentPermit and issues a matching Permit for it", () => {
    let spareRibs = new Object({ ...mockRibs, inviteT: inviteT })
    let mockPermiter = "heaven"
    let mockPermitee = "ascendant"
    let mock = {
      identifier: mockPermiter,
      mainEntityOfPage: "Place",
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ mock }),
    })
    let cb = (code, permit) => {
      code.should.eql(OK)
      permit.identifier.should.eql(mockPermitee)
      permit.mainEntityOfPage.should.eql("Permit")
      permit.subjectOf.should.eql(`permits:${mockPermitee}`)
      permit.Permit.issuedBy.should.eql(mockPermiter)
      permit.Permit.issuedThrough.should.eql(`permits:${mockPermitee}`)
      permit.Permit.permitAudience.should.eql(mockPermitee)
      permit.Permit.validFrom.should.eql("1970-01-01")
      permit.Permit.validUntil.should.eql("2040-01-01")
    }
    spareRibs.inviteT(
      {
        identifier: mockPermitee,
        subjectOf: mockPermiter,
      },
      spareRibs,
      mockDb,
      cb
    )
  })
  it("parameters config the accessSpec and issue the correct permit", () => {
    let spareRibs = new Object({ ...mockRibs, inviteT: inviteT })
    let mockPermiter = "heaven"
    let mockPermitee = "ascendant"
    let mock = {
      identifier: mockPermiter,
      mainEntityOfPage: "Place",
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ mock }),
    })
    let cb = (code, permit) => {
      code.should.eql(OK)
      permit.identifier.should.eql(mockPermitee)
      permit.mainEntityOfPage.should.eql("Permit")
      permit.subjectOf.should.eql(`permits:${mockPermitee}`)
      permit.Permit.issuedBy.should.eql(mockPermiter)
      permit.Permit.issuedThrough.should.eql(`permits:${mockPermitee}`)
      permit.Permit.permitAudience.should.eql(mockPermitee)
      permit.Permit.validFor.should.eql("listT,readT")
      permit.Permit.validFrom.should.eql("1999-01-01")
      permit.Permit.validUntil.should.eql("2001-01-01")
    }
    spareRibs.inviteT(
      {
        identifier: mockPermitee,
        subjectOf: mockPermiter,
        Permit: {
          validFor: "listT,readT",
          validFrom: "1999-01-01",
          validUntil: "2001-01-01",
        },
      },
      spareRibs,
      spareDb,
      cb
    )
  })
  it("issues a password by default", () => {
    let spareRibs = new Object({ ...mockRibs, inviteT: inviteT })
    let mockPermiter = "heaven"
    let mock = {
      identifier: mockPermiter,
      mainEntityOfPage: "Place",
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ mock }),
    })
    let cb = (code, permit) => {
      code.should.eql(OK)
      permit.identifier.should.be.a("string")
      permit.identifier.length.should.be.gt(16)
      permit.mainEntityOfPage.should.eql("Permit")
      permit.subjectOf.should.eql(`permits:${permit.identifier}`)
      permit.Permit.issuedBy.should.eql(mockPermiter)
      permit.Permit.issuedThrough.should.eql(`permits:${permit.identifier}`)
      permit.Permit.permitAudience.should.eql(permit.identifier)
    }
    spareRibs.inviteT({ subjectOf: mockPermiter }, spareRibs, spareDb, cb)
  })
})
