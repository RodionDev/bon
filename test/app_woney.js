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
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = 'TestVersion'
        process.env['EXOSKELETON'] = 'boney'
        importFresh('../bones/controller')
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })
      describe('/GET nonexistent-route/:thing', function() {
        it('should 404', function(done) {
          chai.request(importFresh('../bones/app'))
            .get('/nonexistent-route/Thing')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(404)
              done()
            })
        })
      })
      describe('/GET engage/:thing', function() {
        it('should GET no Things when there are no boney Things', function(done) {
          chai.request(importFresh('../bones/app'))
            .get('/engage/Thing')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.should.be.an('array')
              let b = []
              b.should.be.an('array')
              b.length.should.be.eql(0)
              res.body.should.deep.equal(b)
              res.body.length.should.be.eql(0)
              done()
            })
        })
      })
      describe('/GET engage/:thing', function() {
        it('should GET many Things when there are many Things', function(done) {
          var manyThings = [{
              name: 'should GET many boney Things',
              disambiguatingDescription: 'should GET many boney Things'
            },
            {
              name: 'when there are many boney Things',
              disambiguatingDescription: 'when there are many boney Things'
            }
          ]
          Thing.create(manyThings, function() {
            chai.request(importFresh('../bones/app'))
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
      describe('/POST engage/:thing', function() {
        it('should ADD a Thing', function(done) {
          var mockThing = {
            name: 'should ADD a boney Thing',
            disambiguatingDescription: 'should ADD a boney Thing',
            alternateName: 'should ADD a boney Thing',
            description: 'should ADD a boney Thing'
          }
          chai.request(importFresh('../bones/app'))
            .post('/engage/Thing')
            .send(mockThing)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.name.should.eql(mockThing.name)
              res.body.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
              res.body.alternateName.should.eql(mockThing.alternateName)
              res.body.description.should.eql(mockThing.description)
              res.body.slug.should.eql('should-add-a-boney-thing')
              res.body.seoKeywords.should.eql('add boney thing')
              res.body.engaged.should.be.eql('false')
              res.body._id.should.not.be.null
              done()
            })
        })
      })
      describe('/GET engage/:thing/:id', function() {
        it('should GET a Thing', function(done) {
          var mockThing = {
            name: 'should GET a boney Thing',
            disambiguatingDescription: 'should GET a boney Thing'
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            chai.request(importFresh('../bones/app'))
              .get(`/engage/Thing/${thing._id}`)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.name.should.eql(mockThing.name)
                res.body.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
                res.body.slug.should.eql('should-get-a-boney-thing')
                res.body.seoKeywords.should.eql('boney thing')
                res.body.engaged.should.be.eql('false')
                res.body._id.should.not.be.null
                done()
              })
          })
        })
      })
      describe('/PUT engage/:thing', function() {
        it('should UPDATE a Thing', function(done) {
          var mockThing = {
            name: 'should UPDATE a boney Thing',
            disambiguatingDescription: 'should UPDATE a boney Thing'
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            var updateThing = {
              name: 'boney Thing should be UPDATED',
              disambiguatingDescription: 'boney Thing should be UPDATED'
            }
            chai.request(importFresh('../bones/app'))
              .put(`/engage/Thing/${thing._id}`)
              .send(updateThing)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.name.should.eql(updateThing.name)
                res.body.disambiguatingDescription.should.eql(updateThing.name)
                done()
              })
          })
        })
      })
      describe('/DELETE engage/:thing', function() {
        it('should DELETE a Thing', function(done) {
          var mockThing = {
            name: 'should DELETE a boney Thing',
            disambiguatingDescription: 'should DELETE a boney Thing'
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            chai.request(importFresh('../bones/app'))
              .delete(`/engage/Thing/${thing._id}`)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.msg.should.eql('Thing successfully deleted')
                done()
              })
          })
        })
      })
    })
  })
})
