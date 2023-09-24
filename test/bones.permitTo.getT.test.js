const chai = require("chai")
const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../src/permits")
const should = chai.should()
let Thing = mongoose.models.Thing
describe("bones | ribs | permitTo | getT | GET /:engage/:_id | ANON", () => {
  it.skip("gives permission to get Things when not authenticated", done => {
    Thing.create(
      {
        name: "Wizard's Apprentice",
        permits: { get: PermitLevels.ANON },
      },
      (Err, apprentice) => {
        chai
          .request(app)
          .get(`/Thing/${apprentice._id}`)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(200)
            fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
            done()
          })
      }
    )
  })
})
describe("bones | ribs | permitTo | getT | GET /:engage/:_id/:Thing | AUTH", () => {
  it("denies permission to get Things when not authenticated", done => {
    Thing.create(
      {
        name: "Wizard's Apprentice",
        permits: { get: PermitLevels.AUTH },
      },
      (Err, apprentice) => {
        chai
          .request(app)
          .get(`/Thing/${apprentice._id}`)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(401)
            res.text.should.equal("Unauthorized")
            done()
          })
      }
    )
  })
  it("gives permission to get Things when authenticated", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { get: PermitLevels.AUTH },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(200)
                fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
                done()
              })
          }
        )
      }
    )
  })
})
describe("bones | ribs | permitTo | getT | GET /:engage/:_id/:Thing | AUTH", () => {
  it("denies permission to get if authenticated is not in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { get: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(403)
                fieldsShouldEqual(res.body, {
                  actionStatus: "FailedActionStatus",
                  disambiguatingDescription: `You are not permitted to get this Thing.`,
                  error: "Forbidden",
                  name: 403,
                })
                done()
              })
          }
        )
      }
    )
  })
  it("gives permission to get if authenticated in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            list: [tokenBody._id],
            permits: { get: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(200)
                fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
                done()
              })
          }
        )
      }
    )
  })
  it("gives owner permission to get even if authenticated not in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            god: tokenBody._id,
            permits: { get: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(200)
                fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
                done()
              })
          }
        )
      }
    )
  })
})
describe("bones | ribs | permitTo | getT | GET /:engage/:_id/:Thing | GOD", () => {
  it("denies permission to get Things not owned by authenticated", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { get: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(403)
                fieldsShouldEqual(res.body, {
                  actionStatus: "FailedActionStatus",
                  disambiguatingDescription: `You are not permitted to get this Thing.`,
                  error: "Forbidden",
                  name: 403,
                })
                done()
              })
          }
        )
      }
    )
  })
  it("gives permission to get authenticated's Things", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            god: tokenBody._id,
            permits: { get: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .get(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(200)
                fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
                done()
              })
          }
        )
      }
    )
  })
})
