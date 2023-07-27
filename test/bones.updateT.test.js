const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const mongoose = require("mongoose")
let Thing = mongoose.models.Thing
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("bones | crudities | updateT | PATCH /:engage/:_id", () => {
  it("returns 206 and updates successfully", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            god: tokenBody._id,
            identifier: "APPRTC1",
            image: "avatar1.png",
            name: "The Wizard's Apprentice",
            permits: { update: PermitLevels.GOD },
          },
          (err, apprentice) => {
            console.log(err)
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({
                alternateName: "First student wizard", 
                image: "", 
                name: "Apprentice1", 
                permits: { update: PermitLevels.AUTH }, 
              })
              .set("Authorization", tokenBody.token)
              .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been updated.",
                  name: 206,
                })
                chai
                  .request(app)
                  .get(`/Thing/${apprentice._id}`)
                  .set("Authorization", tokenBody.token)
                  .end((err, res) => {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.updated
                      .slice(0, 4)
                      .should.be.equal(new Date().getFullYear().toString())
                    res.body.updatedBy.should.equal(tokenBody._id)
                    fieldsShouldEqual(res.body, {
                      alternateName: "First student wizard", 
                      identifier: "APPRTC1", 
                      image: "", 
                      name: "Apprentice1", 
                      permits: { update: PermitLevels.AUTH }, 
                    })
                    done()
                  })
              })
          }
        )
      }
    )
  })
  it("returns 206 and updates a nested ThingType successfully", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            disambiguatingDescription: "Eat victuals.",
              Action: {
                actionStatus: "ActiveActionStatus",
                startTime: "2030-10-10T01:02:03.000Z",
              },
              ConsumeAction: {
                expectsAcceptanceOf: "Taste",
              },
            god: tokenBody._id,
            name: "Victuals",
            permits: { update: PermitLevels.GOD },
            thing: "ConsumeAction",
          },
          (err, apprentice) => {
            chai
              .request(app)
              .patch(`/ConsumeAction/${apprentice._id}`)
              .send({
                  Action: {
                    actionStatus: "CompletedActionStatus", 
                    endTime: "2030-10-31T01:02:03.000Z", 
                    startTime: "2030-10-10T01:02:03.000Z", 
                  },
                  ConsumeAction: {
                    expectsAcceptanceOf: "Taste",
                  },
                name: "Food tasting", 
              })
              .set("Authorization", tokenBody.token)
              .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "ConsumeAction has been updated.",
                  name: 206,
                })
                chai
                  .request(app)
                  .get(`/Thing/${apprentice._id}`)
                  .set("Authorization", tokenBody.token)
                  .end((err, res) => {
                    should.not.exist(err)
                    res.should.have.status(200)
                    fieldsShouldEqual(res.body, {
                      disambiguatingDescription: "Eat victuals.",
                        Action: {
                          actionStatus: "CompletedActionStatus",
                          endTime: "2030-10-31T01:02:03.000Z",
                          startTime: "2030-10-10T01:02:03.000Z",
                        },
                        ConsumeAction: {
                          expectsAcceptanceOf: "Taste",
                        },
                      name: "Food tasting", 
                    })
                    done()
                  })
              })
          }
        )
      }
    )
  })
})
