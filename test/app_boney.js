require('dotenv').config();
const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.app.boney', function() {
  describe('bones.routes.boney', function() {
    describe('bones.controller.boney', function() {
      this.app = null
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = 'TestVersion'
        process.env['EXOSKELETON'] = 'boney'
        this.app = importFresh('../bones/app')
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })
      describe('/GET engage/:thing', function() {
        it('should GET many Things when there are many Things', function(done) {
          var manyThings = [{
              name: 'should GET many Things',
              disambiguatingDescription: 'should GET many Things'
            },
            {
              name: 'when there are many Things',
              disambiguatingDescription: 'when there are many Things'
            }
          ]
          Thing.create(manyThings)
          chai.request(this.app)
            .get('/engage/Thing/')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(2)
              done()
            })
        })
      })
    })
  })
})
