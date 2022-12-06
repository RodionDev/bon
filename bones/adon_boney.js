require('dotenv').config();
const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.adon.boney', function() {
  describe('bones.routes.adon.boney', function() {
    describe('bones.controller.adon.boney', function() {
      this.app = null
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = "TestVersion"
        process.env['EXOSKELETON'] = "boney"
        this.app = importFresh('../bones/app')
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
          chai.request(this.app)
            .post('/engage/Thing')
            .send(mockThing)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.errors.should.eql(['A record with this alternative name already exists.'])
              done()
            })
        })
      })
    })
  })
})
