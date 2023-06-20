const chai = require("chai")
const chaiHttp = require("chai-http")
const request = require("supertest")
const app = require("../../bones/app")
const should = chai.should()
chai.use(chaiHttp)
const login = (credentials, testCallBack) => {
  chai
    .request(app)
    .post("/auth/login")
    .send(credentials)
    .end((err, res) => {
      should.not.exist(err)
      res.should.have.status(200)
      res.body.token.should.include("Bearer ")
      testCallBack(res.body)
    })
}
module.exports = {
  signupLogin: (credentials, testCallBack) => {
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send(credentials)
      .end((err, res) => {
        login(credentials, testCallBack)
      })
  },
  login: login,
}
