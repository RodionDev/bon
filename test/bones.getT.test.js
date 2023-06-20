const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const Thing = mongoose.models.Thing
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("bones | crudities | getT | GET /:engage/:_id", () => {
  it("returns 200 and gets a Thing", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        let thing = {
          additionalType: "Thing",
          alternateName: "Student 1",
          description: "Apprentice 1 is a very smart student.",
          disambiguatingDescription: "This is Apprentice No.1",
          identifier: "a1",
          image: "avatar1.png",
          mainEntityOfPage: "Wizard University",
          name: "Apprentice 1",
          potentialAction: "Potions Class",
          sameAs: "Student",
          subjectOf: "Magic 101",
          url: "http:
          god: tokenBody._id,
          thing: "Person",
          created: new Date(Date.now()).toISOString(),
          createdBy: tokenBody._id,
          flag1: 1,
          permits: { get: PermitLevels.GOD },
          engage: {
            Person: {
              birthDate: new Date(2001, 1, 1).toISOString(),
              email: "apprentice1@eliomail.com",
            },
          },
        }
        Thing.create(thing, (err, apprentice) => {
          chai
            .request(app)
            .get(`/Person/${apprentice._id}`)
            .set("Authorization", tokenBody.token)
            .end((err, res) => {
              should.not.exist(err)
              res.should.have.status(200)
              fieldsShouldEqual(res.body, thing)
              done()
            })
        })
      }
    )
  })
})
