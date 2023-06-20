const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const Thing = mongoose.models.Thing
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const settings = require("../bones/settings")
const { PermitLevels } = require("../bones/auth/permits")
const { signupLogin } = require("./suites/signupLogin")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("bones | crudities | listT | GET /:engage/:_id/list/listof", () => {
  beforeEach(() => {
    this.apprentices = ["DanceEvent", "EducationEvent", "SportsEvent"].map(
      actionName => {
        return {
          alternateName: `Student ${actionName}`,
          description: `Attend the ${actionName}.`,
          disambiguatingDescription: `This is the University ${actionName}`,
          identifier: `${actionName}1`,
          name: `University ${actionName}`,
          thing: actionName,
          created: Date.now(),
          flag1: 1,
          permits: { get: PermitLevels.GOD },
          engage: {
            Event: {
              startDate: new Date(2001, 1, 1).toISOString(),
            },
          },
        }
      }
    )
  })
  it("returns 200 and gets a Thing's slim list ", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(this.apprentices, (err, list) => {
          Thing.create(
            {
              name: "Wizard University",
              god: tokenBody._id,
              permits: { get: PermitLevels.GOD },
              list: list.map(doc => doc._id),
            },
            (err, university) => {
              chai
                .request(app)
                .get(`/Thing/${university._id}/list`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
                  res.should.have.status(200)
                  res.body.length.should.equal(3)
                  Object.keys(res.body[0]).should.have.members(
                    Object.keys(settings.slim)
                  )
                  done()
                })
            }
          )
        })
      }
    )
  })
  it("returns 200 and gets a Thing's slim listof filtered by ThingType", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(this.apprentices, (err, list) => {
          Thing.create(
            {
              name: "Wizard University",
              god: tokenBody._id,
              permits: { get: PermitLevels.GOD },
              list: list.map(doc => doc._id),
            },
            (err, university) => {
              chai
                .request(app)
                .get(`/Thing/${university._id}/listof/SportsEvent`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
                  res.should.have.status(200)
                  res.body.length.should.equal(1)
                  res.body[0].thing.should.equal("SportsEvent")
                  Object.keys(res.body[0]).should.have.members(
                    Object.keys(settings.slim)
                  )
                  done()
                })
            }
          )
        })
      }
    )
  })
})
