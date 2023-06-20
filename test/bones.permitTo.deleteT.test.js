const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const app = require("../bones/app")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
const mochaSuite = require("./suites/mochaSuite")
const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../bones/auth/permits")
const should = chai.should()
chai.use(chaiHttp)
let Thing = mongoose.models.Thing
mochaSuite(
  "bones | crudities | permitTo | deleteT | DELETE /:Thing/:_id | ANON",
  () => {
    it.skip("gives permission to delete Things when not authenticated", done => {
      Thing.create(
        {
          name: "Wizard's Apprentice",
          permits: { delete: PermitLevels.ANON },
        },
        (err, apprentice) => {
          chai
            .request(app)
            .delete(`/Thing/${apprentice._id}`)
            .end((err, res) => {
              should.not.exist(err)
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
  }
)
mochaSuite(
  "bones | crudities | permitTo | deleteT | DELETE /:Thing/:_id | AUTH",
  () => {
    it("denies permission to delete Things when not authenticated", done => {
      Thing.create(
        {
          name: "Wizard's Apprentice",
          permits: { delete: PermitLevels.AUTH },
        },
        (err, apprentice) => {
          chai
            .request(app)
            .delete(`/Thing/${apprentice._id}`)
            .end((err, res) => {
              should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .delete(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
  }
)
mochaSuite(
  "bones | crudities | permitTo | deleteT | DELETE /:Thing/:_id | LISTED",
  () => {
    it("denies permission to delete if authenticated is not in Thing's list", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard's Apprentice",
              permits: { delete: PermitLevels.LISTED },
            },
            (err, apprentice) => {
              chai
                .request(app)
                .delete(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .delete(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .delete(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
  }
)
mochaSuite(
  "bones | crudities | permitTo | deleteT | DELETE /:Thing/:_id | GOD",
  () => {
    it("denies permission to delete Things not owned by authenticated", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard's Apprentice",
              permits: { delete: PermitLevels.GOD },
            },
            (err, apprentice) => {
              chai
                .request(app)
                .delete(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .delete(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
  }
)
