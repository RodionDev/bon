let mongoose = require("mongoose");
let Thing = require("../bones/models/thing");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../bones/app");
let should = chai.should();
chai.use(chaiHttp);
describe("Thing Routes", function() {
  before(function(done) {
    mongoose.connect("mongodb:
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function() {
      done();
    });
  });
  beforeEach(function(done) {
    Thing.remove({}, (err) => {
      done();
    });
  });
  describe("/GET thing", function() {
    it("should GET no Things when there are no Things", function(done) {
      chai.request(app)
        .get("/engage/things")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  afterEach(function() {
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});
