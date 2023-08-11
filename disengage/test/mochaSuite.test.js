const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../bones/app")
const mochaSuite = require("./suites/mochaSuite")
const { login, signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
mochaSuite("mochaSuite | signupLogin | Usage Example Test", () => {
  it("bloody well gets the token which I can use in my tests", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "wizard",
        password: "letmein",
      },
      tokenBody => {
        tokenBody.token.should.be.ok
        tokenBody.token.should.contain("Bearer ")
        done()
      }
    )
  })
  it("flipping works when I use the bloody token", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "maybeimportantdependingonyourtest",
        password: "doesn'tmatterbeccausethisisusedtobothsignupandlogin",
      },
      tokenBody => {
        chai
          .request(app)
          .post(`/Thing/${tokenBody._id}/Thing`)
          .send({ name: "Apprentice" })
          .set("Authorization", tokenBody.token)
          .end((err, res) => {
            should.not.exist(err)
            res.should.have.status(201)
            res.body.name.should.be.equal("Apprentice")
            done()
          })
      }
    )
  })
  it("allows Documents to be created to access via endpoints", done => {
    signupLogin(
      {
        name: "Wizard",
        username: "wizard",
        password: "letmein",
      },
      tokenBody => {
        let Thing = mongoose.models.Thing
        Thing.create(
          { name: "The Wizard's Apprentice", god: tokenBody._id },
          (err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((err, res) => {
                should.not.exist(err)
                res.should.have.status(200)
                res.body.name.should.be.equal("The Wizard's Apprentice")
                done()
              })
          }
        )
      }
    )
  })
})
