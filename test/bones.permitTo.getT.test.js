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
  "bones | crudities | permitTo | getT | GET /:engage/:_id | ANON",
  () => {
    it.skip("gives permission to get Things when not authenticated", done => {
      Thing.create(
        {
          name: "Wizard's Apprentice",
          permits: { get: PermitLevels.ANON },
        },
        (err, apprentice) => {
          chai
            .request(app)
            .get(`/Thing/${apprentice._id}`)
            .end((err, res) => {
              should.not.exist(err)
              res.should.have.status(200)
              fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
              done()
            })
        }
      )
    })
  }
)
mochaSuite(
  "bones | crudities | permitTo | getT | GET /:engage/:_id/:Thing | AUTH",
  () => {
    it("denies permission to get Things when not authenticated", done => {
      Thing.create(
        {
          name: "Wizard's Apprentice",
          permits: { get: PermitLevels.AUTH },
        },
        (err, apprentice) => {
          chai
            .request(app)
            .get(`/Thing/${apprentice._id}`)
            .end((err, res) => {
              should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .get(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
                  res.should.have.status(200)
                  fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
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
  "bones | crudities | permitTo | getT | GET /:engage/:_id/:Thing | AUTH",
  () => {
    it("denies permission to get if authenticated is not in Thing's list", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard's Apprentice",
              permits: { get: PermitLevels.LISTED },
            },
            (err, apprentice) => {
              chai
                .request(app)
                .get(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .get(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .get(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
                  res.should.have.status(200)
                  fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
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
  "bones | crudities | permitTo | getT | GET /:engage/:_id/:Thing | GOD",
  () => {
    it("denies permission to get Things not owned by authenticated", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard's Apprentice",
              permits: { get: PermitLevels.GOD },
            },
            (err, apprentice) => {
              chai
                .request(app)
                .get(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
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
            (err, apprentice) => {
              chai
                .request(app)
                .get(`/Thing/${apprentice._id}`)
                .set("Authorization", tokenBody.token)
                .end((err, res) => {
                  should.not.exist(err)
                  res.should.have.status(200)
                  fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
                  done()
                })
            }
          )
        }
      )
    })
  }
)
