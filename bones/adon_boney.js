let Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../bones/app')
let suites = require('./utils/mongoose_suite')
let should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.app', function() {
  describe('bones.routes', function() {
    describe('bones.controller', function() {
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = "TestVersion"
        process.env['EXOSKELETON'] = "boney"
        process.env['DATABASENAME'] = "elioWay"
        process.env['TESTDATABASENAME'] = "testElio"
        process.env['MONGODB'] = "mongodb:
        process.env['PORT'] = 3060
        process.env.ENDOSKELETON = 'TestVersion'
        process.env.EXOSKELETON = 'boney'
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
