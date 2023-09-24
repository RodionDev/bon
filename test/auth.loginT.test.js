const chai = require("chai")
const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const { signupLogin } = require("./suites/signupLogin")
const should = chai.should()
describe("bones | ribs | loginT | POST /auth/login", () => {
  it("returns 200 when login correct", done => {
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send({
        name: "Wizard",
        username: "wizard",
        password: "letmein",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((Err, res) => {
        chai
          .request(app)
          .post("/auth/login")
          .send({ username: "wizard", password: "letmein" })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(200)
            should.not.exist(res.body.password)
            Object.keys(res.body).should.have.members([
              "_id",
              "name",
              "success",
              "token",
              "username",
            ])
            res.body._id.should.be.ok
            res.body.token.should.be.ok
            res.body.token.should.include("Bearer ")
            fieldsShouldEqual(res.body, {
              name: "Wizard",
              success: true,
              username: "wizard",
            })
            done()
          })
      })
  })
  it("returns 400 if missing password field", done => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        username: "wizard",
      })
      .set("Content-Type", "application/json")
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
  it("returns 400 if missing username field", done => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        password: "wrongpass",
      })
      .set("Content-Type", "application/json")
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
  it("returns 401 if wrong password", done => {
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send({
        name: "Wizard",
        username: "wizard",
        password: "letmein",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((Err, res) => {
        chai
          .request(app)
          .post("/auth/login")
          .send({ username: "wizard", password: "wrongpass" })
          .set("Accept", "application/json")
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(401)
            fieldsShouldEqual(res.body, {
              actionStatus: "FailedActionStatus",
              disambiguatingDescription:
                "The username or password was not correct. Please try again.",
              error: "Unauthorized",
              name: 401,
            })
            done()
          })
      })
  })
  it("returns 404 if login username does not exist", done => {
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send({
        name: "Wizard",
        username: "wizard",
        password: "letmein",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((Err, res) => {
        chai
          .request(app)
          .post("/auth/login")
          .send({
            username: "wronguser",
            password: "letmein",
          })
          .set("Accept", "application/json")
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(401)
            fieldsShouldEqual(res.body, {
              actionStatus: "FailedActionStatus",
              disambiguatingDescription:
                "The username or password was not correct. Please try again.",
              error: "Unauthorized",
              name: 401,
            })
            done()
          })
      })
  })
})
