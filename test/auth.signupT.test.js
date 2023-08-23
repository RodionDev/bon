const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const settings = require("../bones/settings")
const { signupLogin } = require("./suites/signupLogin")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("POST /auth/Thing/signup", () => {
  it("returns 201 and signups people", done => {
    chai
      .request(app)
      .post("/auth/Person/signup")
      .send({
        name: "Wizard",
        password: "letmein",
        username: "wizard",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((Err, res) => {
        should.not.exist(Err)
        res.should.have.status(201)
        should.not.exist(res.body.password)
        Object.keys(res.body).should.have.members([
          "_id",
          "name",
          "created",
          "list",
          "permits",
          "thing",
          "username",
        ])
        res.body._id.should.be.ok
        res.body.created.should.be.ok
        res.body.created
          .slice(0, 4)
          .should.be.equal(new Date().getFullYear().toString())
        fieldsShouldEqual(res.body, {
          name: "Wizard",
          permits: settings.permits,
          thing: "Person",
          username: "wizard",
        })
        done()
      })
  })
  it("returns 201 and signups any Thing", done => {
    chai
      .request(app)
      .post("/auth/Action/signup")
      .send({
        disambiguatingDescription: "Hire an apprentice.",
        name: "Apprentices",
        password: "letmein",
        username: "wizard",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((Err, res) => {
        should.not.exist(Err)
        res.should.have.status(201)
        should.not.exist(res.body.password)
        Object.keys(res.body).should.have.members([
          "_id",
          "created",
          "list",
          "name",
          "permits",
          "thing",
          "username",
          "disambiguatingDescription",
        ])
        res.body._id.should.be.ok
        res.body.created.should.be.ok
        res.body.created
          .slice(0, 4)
          .should.be.equal(new Date().getFullYear().toString())
        fieldsShouldEqual(res.body, {
          disambiguatingDescription: "Hire an apprentice.",
          name: "Apprentices",
          permits: settings.permits,
          thing: "Action",
          username: "wizard",
        })
        done()
      })
  })
  it("returns 400 and prevents signup with invalid input", done => {
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send({ name: "" })
      .set("Accept", "application/json")
      .end((Err, res) => {
        should.not.exist(Err)
        res.should.have.status(400)
        fieldsShouldEqual(res.body, {
          actionStatus: "FailedActionStatus",
          disambiguatingDescription: "Requires username and password.",
          error: "Invalid",
          name: 400,
        })
        done()
      })
  })
  it("returns 400 and prevents signup when username duplicated", done => {
    let Thing = mongoose.models.Thing
    Thing({
      disambiguatingDescription: "Hire an apprentice.",
      name: "Apprentices",
      password: "letmein",
      username: "wizard1",
    }).save()
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send({
        disambiguatingDescription: "Hire an apprentice.",
        name: "Apprentices",
        password: "letmein",
        username: "wizard1",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((Err, res) => {
        should.not.exist(Err)
        res.should.have.status(500)
        fieldsShouldEqual(res.body, {
          actionStatus: "FailedActionStatus",
          disambiguatingDescription:
            'E11000 duplicate key error collection: elioway.things index: username_1 dup key: { : "wizard1" }',
          error: "MongoError",
          name: 500,
        })
        done()
      })
  })
  it("returns 409 and will not signup a different Type", done => {
    chai
      .request(app)
      .post("/auth/Person/signup")
      .send({
        Action: {
          actionStatus: "ActiveActionStatus",
        },
        name: "Wizard",
        password: "letmein",
        username: "wizard1",
      })
      .end((Err, res) => {
        should.not.exist(Err)
        res.should.have.status(409)
        fieldsShouldEqual(res.body, {
          actionStatus: "FailedActionStatus",
          disambiguatingDescription: "Cannot signup Person.",
          error: "Type Conflict Error",
          name: 409,
        })
        done()
      })
  })
})
