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
  "bones | crudities | permitTo | createT | POST /:engage/:_id/:Thing | ANON",
  () => {
    it.skip("gives permission to create Things when not authenticated", done => {
      Thing.create(
        {
          name: "Wizard University",
          permits: { create: PermitLevels.ANON },
        },
        (Err, wizardUniversity) => {
          chai
            .request(app)
            .post(`/Thing/${wizardUniversity._id}/Thing`)
            .send({ name: "Wizard's Apprentice" })
            .end((Err, res) => {
              should.not.exist(Err)
              res.should.have.status(201)
              fieldsShouldEqual(res.body, {
                name: "Wizard's Apprentice",
              })
              done()
            })
        }
      )
    })
  }
)
mochaSuite(
  "bones | crudities | permitTo | createT | POST /:engage/:_id/:Thing | AUTH",
  () => {
    it("denies permission to create Things when not authenticated", done => {
      Thing.create(
        {
          name: "Wizard University",
          permits: { create: PermitLevels.AUTH },
        },
        (Err, wizardUniversity) => {
          chai
            .request(app)
            .post(`/Thing/${wizardUniversity._id}/Thing`)
            .send({ name: "Wizard's Apprentice" })
            .end((Err, res) => {
              should.not.exist(Err)
              res.should.have.status(401)
              res.text.should.equal("Unauthorized")
              done()
            })
        }
      )
    })
    it("gives permission to create Things when authenticated", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard University",
              permits: { create: PermitLevels.AUTH },
            },
            (Err, wizardUniversity) => {
              chai
                .request(app)
                .post(`/Thing/${wizardUniversity._id}/Thing`)
                .send({ name: "Wizard's Apprentice" })
                .set("Authorization", tokenBody.token)
                .end((Err, res) => {
                  should.not.exist(Err)
                  res.should.have.status(201)
                  fieldsShouldEqual(res.body, {
                    name: "Wizard's Apprentice",
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
  "bones | crudities | permitTo | createT | POST /:engage/:_id/:Thing | LISTED",
  () => {
    it("denies permission to create if authenticated is not in Thing's list", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard University",
              permits: { create: PermitLevels.LISTED },
            },
            (Err, wizardUniversity) => {
              chai
                .request(app)
                .post(`/Thing/${wizardUniversity._id}/Thing`)
                .send({ name: "Wizard's Apprentice" })
                .set("Authorization", tokenBody.token)
                .end((Err, res) => {
                  should.not.exist(Err)
                  res.should.have.status(403)
                  fieldsShouldEqual(res.body, {
                    actionStatus: "FailedActionStatus",
                    disambiguatingDescription: `You are not permitted to create this Thing.`,
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
    it("gives permission to create if authenticated in Thing's list", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard University",
              list: [tokenBody._id],
              permits: { create: PermitLevels.LISTED },
            },
            (Err, wizardUniversity) => {
              chai
                .request(app)
                .post(`/Thing/${wizardUniversity._id}/Thing`)
                .send({ name: "Wizard's Apprentice" })
                .set("Authorization", tokenBody.token)
                .end((Err, res) => {
                  should.not.exist(Err)
                  res.should.have.status(201)
                  fieldsShouldEqual(res.body, { name: "Wizard's Apprentice" })
                  done()
                })
            }
          )
        }
      )
    })
    it("gives owner permission to create even if authenticated not in Thing's list", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard University",
              god: tokenBody._id,
              permits: { create: PermitLevels.LISTED },
            },
            (Err, wizardUniversity) => {
              chai
                .request(app)
                .post(`/Thing/${wizardUniversity._id}/Thing`)
                .send({ name: "Wizard's Apprentice" })
                .set("Authorization", tokenBody.token)
                .end((Err, res) => {
                  should.not.exist(Err)
                  res.should.have.status(201)
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
  "bones | crudities | permitTo | createT | POST /:engage/:_id/:Thing | GOD",
  () => {
    it("denies permission to create Things not owned by authenticated", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard University",
              permits: { create: PermitLevels.GOD },
            },
            (Err, wizardUniversity) => {
              chai
                .request(app)
                .post(`/Thing/${wizardUniversity._id}/Thing`)
                .send({ name: "Wizard's Apprentice" })
                .set("Authorization", tokenBody.token)
                .end((Err, res) => {
                  should.not.exist(Err)
                  res.should.have.status(403)
                  fieldsShouldEqual(res.body, {
                    actionStatus: "FailedActionStatus",
                    disambiguatingDescription: `You are not permitted to create this Thing.`,
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
    it("gives permission to create authenticated's Things", done => {
      signupLogin(
        { name: "Wizard", username: "tester", password: "letmein" },
        tokenBody => {
          Thing.create(
            {
              name: "Wizard University",
              god: tokenBody._id,
              permits: { create: PermitLevels.GOD },
            },
            (Err, wizardUniversity) => {
              chai
                .request(app)
                .post(`/Thing/${wizardUniversity._id}/Thing`)
                .send({ name: "Wizard's Apprentice" })
                .set("Authorization", tokenBody.token)
                .end((Err, res) => {
                  should.not.exist(Err)
                  res.should.have.status(201)
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
