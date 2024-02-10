# Testing ribs
## TURD Test
TURDS operate on the fields of the **engaged** thing, and only take the **engaged** thing's identifier as a fixed parameter.
```
const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const turdT = require("../../ribs/turdT")
const OK = 7
const NOTOK = 666
describe("turdT", () => {
  it("turdify T", () => {
    let spareRibs = new Object({ ...mockRibs, turdT })
    let god = { identifier: "god", mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyTurded, ifFailErrMessage, turdyData) => {
      wasSuccessfullyTurded.should.equal(OK)
      ifFailErrMessage.should.equal("")
      turdyData.subjectOf.should.equal("heaven")
    }
    spareRibs.luteT({ ...god, subjectOf:"heaven"}, spareRibs, mockDb, cb)
  })
})
```
## LUTE Test
LUTES operate on the **list** of an **engaged** thing, and take the **engaged** thing's identifier as a fixed parameter followed by the identifier of any specific **listed** thing you are trying to "unlist" or "promote" or "makeKingOfTheList", etc.
Differences from TURD test:
1. We should use the real `authT` and `engageT` so that listed objects instantiate the normal way.
2. So must use a special "read" mock to ensure the "stored" things gets returned, not the "packet".
```
const should = require("chai").should()
const mockDb = require("../mocks/mockDb.js")
const mockRibs = require("../mocks/mockRibs.js")
const luteT = require("../../ribs/luteT")
const { authT, engageT } = require("../../spine")
const OK = 7
const NOTOK = 666
describe("luteT", () => {
  it("lutes T's list", () => {
    let spareRibs = new Object({ ...mockRibs, authT, engageT, luteT })
    let god = { identifier: "god", mainEntityOfPage: "Person" }
    let eden = {
      identifier: "eden",
      subjectOf: "god",
      mainEntityOfPage: "Place",
    }
    let spareDb = new Object({
      ...mockDb,
      read: mockDb.readById({ god, eden }),
    })
    let cb = (wasSuccessfullyLuted, ifFailErrMessage, luteyData) => {
      wasSuccessfullyLuted.should.equal(OK)
      ifFailErrMessage.should.equal("")
      luteyData.ItemList.numberOfItemslength.should.equal(1)
      luteyData.ItemList.itemListElement[0].identifier.should.equal("eden")
    }
    spareRibs.luteT(eden, spareRibs, spareDb, cb)
  })
})
```
