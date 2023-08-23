const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const mongoose = require("mongoose")
let Thing = mongoose.models.Thing
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const settings = require("../bones/settings")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("bones | crudities | createT | POST /:engage/:_id/:Thing/", () => {
  it("returns 201 and creates one", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "tester",
        password: "letmein",
        permits: { create: PermitLevels.GOD },
      },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard University",
            god: tokenBody._id,
            permits: { get: PermitLevels.GOD },
          },
          (Err, university) => {
            chai
              .request(app)
              .post(`/Thing/${university._id}/Person`)
              .send({
                alternateName: "First student wizard",
                disambiguatingDescription: "Apprentice1",
                Person: {
                  birthDate: "1967-03-06",
                  email: "apprentice1@eliomail.com",
                },
                name: "Apprentice1",
              })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(201)
                should.not.exist(res.body.password)
                Object.keys(res.body).should.have.members([
                  "_id",
                  "__v",
                  "alternateName",
                  "created",
                  "createdBy",
                  "disambiguatingDescription",
                  "god",
                  "ItemList",
                  "name",
                  "permits",
                  "thing",
                ])
                fieldsShouldEqual(res.body, {
                  alternateName: "First student wizard",
                  disambiguatingDescription: "Apprentice1",
                  Person: {
                    birthDate: "1967-03-06",
                    email: "apprentice1@eliomail.com",
                  },
                  name: "Apprentice1",
                  permits: settings.permits,
                  thing: "Person",
                })
                res.body._id.should.be.ok
                res.body.created
                  .slice(0, 4)
                  .should.be.equal(new Date().getFullYear().toString())
                university._id.equals(res.body.createdBy).should.be.true
                res.body.god.should.equal(tokenBody._id)
                done()
              })
          }
        )
      }
    )
  })
  it("returns 201 and creates one nested Schema.org Type", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "tester",
        password: "letmein",
        permits: { create: PermitLevels.GOD },
      },
      tokenBody => {
        chai
          .request(app)
          .post(`/Thing/${tokenBody._id}/ConsumeAction/`)
          .send({
            disambiguatingDescription: "Eat victuals.",
            Action: {
              actionStatus: "ActiveActionStatus",
              startTime: "2030-10-10T01:02:03.000Z",
            },
            ConsumeAction: {
              expectsAcceptanceOf: "Taste",
            },
            name: "Victuals",
          })
          .set("Authorization", tokenBody.token)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(201)
            fieldsShouldEqual(res.body, {
              disambiguatingDescription: "Eat victuals.",
              Action: {
                actionStatus: "ActiveActionStatus",
                startTime: "2030-10-10T01:02:03.000Z",
              },
              ConsumeAction: {
                expectsAcceptanceOf: "Taste",
              },
              name: "Victuals",
              thing: "ConsumeAction",
            })
            done()
          })
      }
    )
  })
  it("returns 400 with any ValidationError", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "tester",
        password: "letmein",
        permits: { create: PermitLevels.GOD },
      },
      tokenBody => {
        chai
          .request(app)
          .post(`/Thing/${tokenBody._id}/Thing`)
          .send({ alternateName: "some words" })
          .set("Authorization", tokenBody.token)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(400)
            fieldsShouldEqual(res.body, {
              actionStatus: "FailedActionStatus",
              disambiguatingDescription:
                "Thing validation failed: name: Path `name` is required.",
              error: "ValidationError",
              name: 400,
            })
            done()
          })
      }
    )
  })
  it("returns 409 and will not create a different Type", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "tester",
        password: "letmein",
        permits: { create: PermitLevels.GOD },
      },
      tokenBody => {
        chai
          .request(app)
          .post(`/Thing/${tokenBody._id}/Person`)
          .send({
            disambiguatingDescription: "Hire an apprentice.",
            Action: {
              actionStatus: "ActiveActionStatus",
              startTime: "2030-10-10T01:02:03.000Z",
            },
            name: "Apprentices",
          })
          .set("Authorization", tokenBody.token)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(409)
            fieldsShouldEqual(res.body, {
              actionStatus: "FailedActionStatus",
              disambiguatingDescription: "Cannot create Person.",
              error: "Type Conflict Error",
              name: 409,
            })
            done()
          })
      }
    )
  })
})
