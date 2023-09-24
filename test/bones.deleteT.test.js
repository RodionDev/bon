const chai = require("chai")
const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../src/permits")
const should = chai.should()
let Thing = mongoose.models.Thing
describe("bones | ribs | destroyT | DELETE /:engage/:_id", () => {
  it("returns 206 and deletes successfully", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "The Wizard's Apprentice",
            god: tokenBody._id,
            permits: { delete: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Action/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Action has been deleted.",
                  name: 206,
                })
                done()
              })
          }
        )
      }
    )
  })
})
