const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const request = require("supertest")
const { MongoMemoryServer } = require("mongodb-memory-server")
const app = require("../../bones/app")
const mongooseConnect = require("../../bones/database")
const should = chai.should()
chai.use(chaiHttp)
module.exports = (testDescription, testsCallBack) => {
  describe(testDescription, () => {
    const clearDB = () => {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].deleteMany(() => {})
      }
    }
    before(async () => {
      let mongoServer = new MongoMemoryServer()
      const mongoUri = await mongoServer.getUri()
      process.env.MONGODB_URL = mongoUri
      process.env.JWT_SECRET = "letmein"
      await mongooseConnect.dbconnect()
    })
    beforeEach(async () => {
      await clearDB()
    })
    after(async () => {
      await clearDB()
      await mongooseConnect.dbclose()
    })
    testsCallBack()
  })
}
