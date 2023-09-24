const chai = require("chai")
const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../src/permits")
const should = chai.should()
let Thing = mongoose.models.Thing
describe("bones | ribs | permitTo | destroyT | DELETE /:Thing/:_id | ANON", () => {
  it.skip("gives permission to delete Things when not authenticated", done => {
    Thing.create(
      {
        name: "Wizard's Apprentice",
        permits: { delete: PermitLevels.ANON },
      },
      (Err, apprentice) => {
        chai
          .request(app)
          .delete(`/Thing/${apprentice._id}`)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(206)
            fieldsShouldEqual(res.body, {
              actionStatus: "CompletedActionStatus",
              disambiguatingDescription: "Thing has been deleted.",
              name: 206,
            })
            done()
          })
      }
    )
  })
})
describe("bones | ribs | permitTo | destroyT | DELETE /:Thing/:_id | AUTH", () => {
  it("denies permission to delete Things when not authenticated", done => {
    Thing.create(
      {
        name: "Wizard's Apprentice",
        permits: { delete: PermitLevels.AUTH },
      },
      (Err, apprentice) => {
        chai
          .request(app)
          .delete(`/Thing/${apprentice._id}`)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(401)
            res.text.should.equal("Unauthorized")
            done()
          })
      }
    )
  })
  it("gives permission to delete Things when authenticated", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { delete: PermitLevels.AUTH },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been deleted.",
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
describe("bones | ribs | permitTo | destroyT | DELETE /:Thing/:_id | LISTED", () => {
  it("denies permission to delete if authenticated is not in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { delete: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(403)
                fieldsShouldEqual(res.body, {
                  actionStatus: "FailedActionStatus",
                  disambiguatingDescription: `You are not permitted to delete this Thing.`,
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
  it("gives permission to delete if authenticated in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            list: [tokenBody._id],
            permits: { delete: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been deleted.",
                  name: 206,
                })
                done()
              })
          }
        )
      }
    )
  })
  it("gives owner permission to delete even if authenticated not in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            god: tokenBody._id,
            permits: { delete: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been deleted.",
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
describe("bones | ribs | permitTo | destroyT | DELETE /:Thing/:_id | GOD", () => {
  it("denies permission to delete Things not owned by authenticated", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { delete: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(403)
                fieldsShouldEqual(res.body, {
                  actionStatus: "FailedActionStatus",
                  disambiguatingDescription: `You are not permitted to delete this Thing.`,
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
  it("gives permission to delete authenticated's Things", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            god: tokenBody._id,
            permits: { delete: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .delete(`/Thing/${apprentice._id}`)
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been deleted.",
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
