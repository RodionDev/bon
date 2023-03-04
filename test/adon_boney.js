require('dotenv').config()
const Thing = require('../bones/endoskeletons/ThingOnAShoeString/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.adon.boney', function() {
  describe('bones.routes.adon.boney', function() {
    describe('bones.controller.adon.boney', function() {
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = 'ThingOnAShoeString'
        process.env['EXOSKELETON'] = 'boney'
        importFresh('../bones/controller')
        Thing.deleteOne({}, err => {
          should.not.exist(err)
          done()
        })
      })
      describe('/POST engage/:thing', function() {
        it('adon should ADD a Thing once', function(done) {
          var mockThing = {
            name: 'should ADD a Thing once',
            disambiguatingDescription: 'should ADD a Thing once',
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            chai
              .request(importFresh('../bones/app.js'))
              .post('/engage/Thing')
              .set('content-type', 'application/vnd.api+json')
              .send(mockThing)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(409)
                res.should.be.json
                res.body.msg.should.eql(
                  'Thing E11000 duplicate key error collection: bonesadonboneyDb.things index: slug_1 dup key: { : "should-add-a-thing-once" }',
                )
                done()
              })
          })
        })
      })
    })
  })
})
