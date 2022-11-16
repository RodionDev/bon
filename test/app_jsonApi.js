require('dotenv').config();
const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.app.jsonApi', function() {
  describe('bones.routes.jsonApi', function() {
    describe('bones.controller.jsonApi', function() {
      this.app = null
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = 'ThingOnAShoeString'
        process.env['EXOSKELETON'] = 'jsonApi'
        this.app = importFresh('../bones/app')
        console.log(process.env['EXOSKELETON'])
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
              res.body.data.should.be.a('array')
              res.body.data.length.should.be.eql(2)
              res.body.meta.should.not.be.null
              done()
            })
        })
      })
    })
  })
})
