const chai = require("chai")
const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const { signupLogin } = require("./suites/signupLogin")
const should = chai.should()
describe("bones | ribs | logoutT | GET /auth/logout", () => {
  it("returns 203 when logging out then prevents further access", done => {
    signupLogin(
      { name: "Tester", username: "tester", password: "letmein" },
      tokenBody => {
        chai
          .request(app)
          .get("/auth/logout")
          .set("Authorization", tokenBody.token)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(206)
            fieldsShouldEqual(res.body, {
              actionStatus: "CompletedActionStatus",
              disambiguatingDescription: "The session has been expired.",
              name: 206,
            })
            chai
              .request(app)
              .get("/")
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(401)
                res.text.should.equal("Unauthorized")
                done()
              })
          })
      }
    )
  })
})
