const chai = require("chai")
const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const { PermitLevels } = require("../src/permits")
const should = chai.should()
describe("bones | ribs | schemaT | GET /schema/:Thing", () => {
  it.skip("gets schema of Thing", done => {
    chai
      .request(app)
      .get(`/schema/Person`)
      .end((Err, res) => {
        should.not.exist(Err)
        res.should.have.status(200)
        fieldsShouldEqual(res.body, {
          actionStatus: "CompletedActionStatus",
          name: "Delete Message",
          disambiguatingDescription: "`Action` has been deleted.",
        })
        done()
      })
  })
})
