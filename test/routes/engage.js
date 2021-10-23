let Thing = require("../../bones/models/thing");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../bones/app");
var suites = require("../mongoose_suite");
let should = chai.should();
chai.use(chaiHttp);
suites.moogooseTestSuite("Thing Routes", function() {
    beforeEach(function(done) {
      Thing.remove({}, (err) => {
        done();
      });
    });
    describe("/GET nonexistent-route/thing", function() {
      it("should 404", function(done) {
        chai.request(app)
          .get("/nonexistent-route/thing")
          .end(function(err, res) {
            res.should.have.status(404);
            done();
          });
      });
    });
    describe("/GET engage/thing", function() {
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
});
