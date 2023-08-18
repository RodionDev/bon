const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("bones | crudities | schemaT | GET /schema/:Thing", () => {
  it.skip("gets schema of Thing", done => {
    chai
      .request(app)
      .get(`/schema/Person`)
      .end((err, res) => {
        should.not.exist(err)
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
