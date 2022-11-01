const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../bones/app')
const suites = require('./utils/mongoose_suite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.app', function() {
  describe('bones.routes', function() {
    describe('bones.controller', function() {
      beforeEach(function(done) {
        process.env.ENDOSKELETON = 'ThingOnAShoeString'
        process.env.EXOSKELETON = 'jsonApiV1.0'
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })
      describe('/GET engage/:thing', function() {
        it('should GET no Things when there are no Things', function(done) {
          chai.request(app)
            .get('/engage/Thing')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.thing.should.be.an('array')
              let b = []
              b.should.be.an('array')
              b.length.should.be.eql(0)
              res.body.data.should.deep.equal(b)
              res.body.data.length.should.be.eql(0)
              res.body.data.meta.should.not.be.null
              done()
            })
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
          chai.request(app)
            .get('/engage/Thing/')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.data.should.be.a('array')
              res.body.data.length.should.be.eql(2)
              res.body.data.meta.should.not.be.null
              done()
            })
        })
      })
      describe('/POST engage/:thing', function() {
        it('should ADD a Thing', function(done) {
          var mockThing = {
            name: 'should ADD a Thing',
            disambiguatingDescription: 'should ADD a Thing',
            alternateName: 'should ADD a Thing',
            description: 'should ADD a Thing'
          }
          chai.request(app)
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
              res.body.data.meta.should.not.be.null
              done()
            })
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
              res.body.errors[0].should.eql('A record with this alternative name already exists.')
              done()
            })
        })
      })
      describe('/GET engage/:thing/:id', function() {
        it('should GET a Thing', function(done) {
          var mockThing = {
            name: 'should GET a Thing',
            disambiguatingDescription: 'should GET a Thing'
          }
          var thing = new Thing(mockThing)
          thing.save()
          chai.request(app)
            .get(`/engage/Thing/${thing._id}`)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.data.id.should.not.be.null
              res.body.data.type.should.eql('Thing')
              res.body.data.attributes.name.should.eql(mockThing.name)
              res.body.data.attributes.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
              done()
            })
        })
      })
      describe('/PUT engage/:thing', function() {
        it('should UPDATE a Thing', function(done) {
          var mockThing = {
            name: 'should UPDATE a Thing',
            disambiguatingDescription: 'should UPDATE a Thing'
          }
          var thing = new Thing(mockThing)
          thing.save()
          var updateThing = {
            name: 'Thing should be UPDATED',
            disambiguatingDescription: 'Thing should be UPDATED'
          }
          chai.request(app)
            .put(`/engage/Thing/${thing._id}`)
            .send(updateThing)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.data.id.should.not.be.null
              res.body.data.type.should.eql('Thing')
              res.body.data.attributes.name.should.eql(mockThing.name)
              res.body.data.attributes.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
              done()
            })
        })
      })
      describe('/DELETE engage/:thing', function() {
        it('should DELETE a Thing', function(done) {
          var mockThing = {
            name: 'should DELETE a Thing',
            disambiguatingDescription: 'should DELETE a Thing'
          }
          var thing = new Thing(mockThing)
          thing.save()
          chai.request(app)
            .delete(`/engage/Thing/${thing._id}`)
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.data.should.be.null
              res.body.meta.should.not.be.null
              done()
            })
        })
      })
    })
  })
})
