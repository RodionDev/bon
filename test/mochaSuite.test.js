const chai = require("chai")
const { ribT } = require("../ribs")
const { login, signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../src/permits")
const should = chai.should()
describe("describe | signupLogin | Usage Example Test", () => {
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
          .end((Err, res) => {
            should.not.exist(Err)
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
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
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
