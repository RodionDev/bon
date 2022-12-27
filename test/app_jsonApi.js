require('dotenv').config();
const Thing = require('@elioway/spider/endoskeletons/ThingOnAShoeString/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.app.jsonApi', function() {
  describe('bones.routes.jsonApi', function() {
    describe('bones.controller.jsonApi', function() {
      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = 'ThingOnAShoeString'
        process.env['EXOSKELETON'] = 'jsonApi'
        importFresh('../bones/controller')
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })
      describe('/GET engage/:thing', function() {
        it('should GET no Things when there are no Things', function(done) {
          chai.request(importFresh('../bones/app'))
            .get('/engage/Thing')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.data.should.be.an('array')
              let b = []
              b.should.be.an('array')
              b.length.should.be.eql(0)
              res.body.data.should.deep.equal(b)
              res.body.data.length.should.be.eql(0)
              res.body.meta.should.not.be.null
              done()
            })
        })
      })
      describe('/GET engage/:thing', function() {
        it('should GET many Things when there are many Things', function(done) {
          var manyThings = [{
              name: 'should GET many jsonApi Things',
              disambiguatingDescription: 'should GET many jsonApi Things'
            },
            {
              name: 'when there are many jsonApi Things',
              disambiguatingDescription: 'when there are many jsonApi Things'
            }
          ]
          Thing.create(manyThings, function() {
            chai.request(importFresh('../bones/app'))
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
      describe('/POST engage/:thing', function() {
        it('should ADD a Thing', function(done) {
          var mockThing = {
            name: 'should ADD a jsonApi Thing',
            disambiguatingDescription: 'should ADD a jsonApi Thing'
          }
          chai.request(importFresh('../bones/app'))
            .post('/engage/Thing')
            .send(mockThing)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.data.id.should.not.be.null
              res.body.data.type.should.eql('Thing')
              res.body.data.attributes.name.should.eql(mockThing.name)
              res.body.data.attributes.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
              res.body.meta.should.not.be.null
              done()
            })
        })
      })
      describe('/GET engage/:thing/:id', function() {
        it('should GET a Thing', function(done) {
          var mockThing = {
            name: 'should GET a jsonApi Thing',
            disambiguatingDescription: 'should GET a jsonApi Thing'
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            chai.request(importFresh('../bones/app'))
              .get(`/engage/Thing/${thing._id}`)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.data.id.should.not.be.null
                res.body.data.type.should.eql('Thing')
                res.body.data.attributes.name.should.eql(mockThing.name)
                res.body.data.attributes.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
                res.body.meta.should.not.be.null
                done()
              })
          })
        })
      })
      describe('/PUT engage/:thing', function() {
        it('should UPDATE a Thing', function(done) {
          var mockThing = {
            name: 'should UPDATE a jsonApi Thing',
            disambiguatingDescription: 'should UPDATE a jsonApi Thing'
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            var updateThing = {
              name: 'jsonApi Thing should be UPDATED',
              disambiguatingDescription: 'jsonApi Thing should be UPDATED'
            }
            chai.request(importFresh('../bones/app'))
              .put(`/engage/Thing/${thing._id}`)
              .send(updateThing)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.data.id.should.not.be.null
                res.body.data.type.should.eql('Thing')
                res.body.data.attributes.name.should.eql(updateThing.name)
                res.body.data.attributes.disambiguatingDescription.should.eql(updateThing.disambiguatingDescription)
                res.body.meta.should.not.be.null
                done()
              })
          })
        })
      })
      describe('/DELETE engage/:thing', function() {
        it('should DELETE a Thing', function(done) {
          var mockThing = {
            name: 'should DELETE a jsonApi Thing',
            disambiguatingDescription: 'should DELETE a jsonApi Thing'
          }
          var thing = new Thing(mockThing)
          thing.save(function() {
            chai.request(importFresh('../bones/app'))
              .delete(`/engage/Thing/${thing._id}`)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.meta.should.not.be.null
                done()
              })
          })
        })
      })
    })
  })
})
