let Thing = require('../../bones/models/thing')
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../../bones/app')
let suites = require('../mongoose_suite')
let should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('Thing Routes', function () {
  beforeEach(function (done) {
    Thing.remove({}, (err) => {
      should.not.exist(err)
      done()
    })
  })
  describe('/GET nonexistent-route/:thing', function () {
    it('should 404', function (done) {
      chai.request(app)
        .get('/nonexistent-route/thing')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(404)
          done()
        })
    })
  })
  describe('/GET engage/:thing', function () {
    it('should GET no Things when there are no Things', function (done) {
      chai.request(app)
        .get('/engage/thing')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })
  describe('/GET engage/:thing', function () {
    it('should GET many Things when there are many Things', function (done) {
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
        .get('/engage/thing/')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(2)
          done()
        })
    })
  })
  describe('/POST engage/:thing', function () {
    it('should ADD a Thing', function (done) {
      var mockThing = {
        name: 'should ADD a Thing',
        disambiguatingDescription: 'should ADD a Thing',
        alternateName: 'should ADD a Thing',
        description: 'should ADD a Thing'
      }
      chai.request(app)
        .post('/engage/thing')
        .send(mockThing)
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.should.be.json
          res.body.name.should.eql(mockThing.name)
          res.body.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
          res.body.alternateName.should.eql(mockThing.alternateName)
          res.body.description.should.eql(mockThing.description)
          res.body.slug.should.eql('should-add-a-thing')
          res.body.seoKeywords.should.eql('add thing')
          res.body.engaged.should.be.false
          res.body._id.should.not.be.null
          done()
        })
    })
  })
  describe('/POST engage/:thing', function () {
    it('should ADD a Thing once', function (done) {
      var mockThing = {
        name: 'should ADD a Thing once',
        disambiguatingDescription: 'should ADD a Thing once'
      }
      var thing = new Thing(mockThing)
      thing.save()
      chai.request(app)
        .post('/engage/thing')
        .send(mockThing)
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.should.be.json
          res.body.message.should.eql('A record with this alternative name already exists.')
          done()
        })
    })
  })
  describe('/GET engage/:thing/:id', function () {
    it('should GET a Thing', function (done) {
      var mockThing = {
        name: 'should GET a Thing',
        disambiguatingDescription: 'should GET a Thing'
      }
      var thing = new Thing(mockThing)
      thing.save()
      chai.request(app)
        .get(`/engage/thing/${thing._id}`)
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.should.be.json
          res.body.name.should.eql(mockThing.name)
          res.body.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
          res.body.slug.should.eql('should-get-a-thing')
          res.body.seoKeywords.should.eql('thing')
          res.body.engaged.should.be.false
          res.body._id.should.not.be.null
          done()
        })
    })
  })
  describe('/PUT engage/:thing', function () {
    it('should UPDATE a Thing', function (done) {
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
        .put(`/engage/thing/${thing._id}`)
        .send(updateThing)
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.should.be.json
          res.body.name.should.eql(updateThing.name)
          res.body.disambiguatingDescription.should.eql(updateThing.name)
          done()
        })
    })
  })
  describe('/DELETE engage/:thing', function () {
    it('should DELETE a Thing', function (done) {
      var mockThing = {
        name: 'should DELETE a Thing',
        disambiguatingDescription: 'should DELETE a Thing'
      }
      var thing = new Thing(mockThing)
      thing.save()
      chai.request(app)
        .delete(`/engage/thing/${thing._id}`)
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.should.be.json
          res.body.message.should.eql('Thing successfully deleted')
          done()
        })
    })
  })
})
