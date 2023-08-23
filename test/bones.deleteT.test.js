const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
let Thing = mongoose.models.Thing
mochaSuite("bones | crudities | deleteT | DELETE /:engage/:_id", () => {
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
