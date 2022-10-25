let Thing = require('@elioway/spider/schemas/TestVersion/models/Thing')
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../bones/app')
let suites = require('./utils/mongoose_suite')
let should = chai.should()
process.env.NODE_CONFIG = JSON.stringify({
  BONES: {
    endoskeleton: "TestVersion",
    exoskeleton: "default",
  }
});
const testConfig = importFresh("config");
expect(
  testConfig.get("BONES.exoskeleton"),
  "config value not set to 1"
).to.equal("default");
mockRequire("config", testConfig);
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.app', function() {
  describe('bones.routes', function() {
    describe('bones.controller', function() {
      beforeEach(function(done) {
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })
      describe('/POST engage/:thing', function() {
        it('should ADD a Thing once', function(done) {
          var mockThing = {
            name: 'should ADD a Thing once',
            disambiguatingDescription: 'should ADD a Thing once'
          }
          var thing = new Thing(mockThing)
          thing.save()
          chai.request(app)
            .post('/engage/Thing')
            .send(mockThing)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.thing.should.eql('A record with this alternative name already exists.')
              done()
            })
        })
      })
    })
  })
})
