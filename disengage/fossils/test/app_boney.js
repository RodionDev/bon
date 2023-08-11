require("dotenv").config()
const Thing = require("../bones/endoskeletons/ThingOnAShoeString/models/Thing")
const chai = require("chai")
const chaiHttp = require("chai-http")
const importFresh = require("import-fresh")
const suites = require("./utils/moogooseTestSuite")
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite("bones.app.boney", function () {
  describe("bones.controller.boney", function () {
    beforeEach(function (done) {
      process.env["ENDOSKELETON"] = "ThingOnAShoeString"
      process.env["EXOSKELETON"] = "boney"
      importFresh("../bones/controller")
      Thing.deleteOne({}, err => {
        should.not.exist(err)
        done()
      })
    })
    describe("/GET nonexistent-route/:thing", function () {
      it("boney should 404", function (done) {
        chai
          .request(importFresh("../bones/app"))
          .get("/nonexistent-route/Thing")
          .end(function (err, res) {
            should.not.exist(err)
            res.should.have.status(404)
            done()
          })
      })
    })
    describe("/GET schema", function () {
      it("boney should return schema for a Thing", function (done) {
        chai
          .request(importFresh("../bones/app"))
          .get("/schema/Thing")
          .end(function (err, res) {
            should.not.exist(err)
            res.should.have.status(200)
            res.body._id.should.not.be.null
            res.body.name.should.not.be.null
            res.body.disambiguatingDescription.should.not.be.null
            res.body.slug.should.not.be.null
            res.body.seoKeywords.should.not.be.null
            res.body.engaged.should.not.be.null
            done()
          })
      })
    })
    describe("/GET engage/:thing", function () {
      it("boney should GET no Things when there are no boney Things", function (done) {
        chai
          .request(importFresh("../bones/app"))
          .get("/engage/Thing")
          .end(function (err, res) {
            should.not.exist(err)
            res.should.have.status(200)
            res.body.should.be.an("array")
            let b = []
            b.should.be.an("array")
            b.length.should.be.eql(0)
            res.body.should.deep.equal(b)
            res.body.length.should.be.eql(0)
            done()
          })
      })
      it("boney should GET many Things when there are many Things", function (done) {
        var manyThings = [
          {
            name: "should GET many boney Things",
            disambiguatingDescription: "should GET many boney Things",
          },
          {
            name: "when there are many boney Things",
            disambiguatingDescription: "when there are many boney Things",
          },
        ]
        Thing.create(manyThings, function () {
          chai
            .request(importFresh("../bones/app"))
            .get("/engage/Thing/")
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.should.be.a("array")
              res.body.length.should.be.eql(2)
              done()
            })
        })
      })
    })
    describe("/GET engage/:thing/:id", function () {
      it("boney should GET a Thing", function (done) {
        var mockThing = {
          name: "should GET a boney Thing",
          disambiguatingDescription: "should GET a boney Thing",
        }
        var thing = new Thing(mockThing)
        thing.save(function () {
          chai
            .request(importFresh("../bones/app"))
            .get(`/engage/Thing/${thing._id}`)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.name.should.eql(mockThing.name)
              res.body.disambiguatingDescription.should.eql(
                mockThing.disambiguatingDescription
              )
              res.body.slug.should.eql("should-get-a-boney-thing")
              res.body.seoKeywords.should.eql("boney thing")
              res.body.engaged.should.be.eql("false")
              res.body._id.should.not.be.null
              done()
            })
        })
      })
      it("boney should catch GET a Thing errors", function (done) {
        chai
          .request(importFresh("../bones/app"))
          .get(`/engage/Thing/nosuchthing`)
          .end(function (err, res) {
            should.not.exist(err)
            res.should.have.status(404)
            res.should.be.json
            res.body.msg.should.eql(
              'Thing Cast to ObjectId failed for value "nosuchthing" at path "_id" for model "thing"'
            )
            done()
          })
      })
    })
    describe("/POST engage/:thing", function () {
      it("boney should ADD a Thing", function (done) {
        let mockThing = {
          name: "should ADD a boney Thing",
          disambiguatingDescription: "should ADD a boney Thing",
        }
        chai
          .request(importFresh("../bones/app"))
          .post("/engage/Thing")
          .set("content-type", "application/vnd.api+json")
          .send(mockThing)
          .end(function (err, res) {
            should.not.exist(err)
            res.should.have.status(200)
            res.should.be.json
            res.body.disambiguatingDescription.should.eql(
              mockThing.disambiguatingDescription
            )
            res.body.slug.should.eql("should-add-a-boney-thing")
            res.body.seoKeywords.should.eql("add boney thing")
            res.body.engaged.should.be.eql("false")
            done()
          })
      })
      it("adon should ADD a Thing once", function (done) {
        var mockThing = {
          name: "should ADD a Thing once",
          disambiguatingDescription: "should ADD a Thing once",
        }
        var thing = new Thing(mockThing)
        thing.save(function () {
          chai
            .request(importFresh("../bones/app.js"))
            .post("/engage/Thing")
            .set("content-type", "application/vnd.api+json")
            .send(mockThing)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(409)
              res.should.be.json
              res.body.msg.should.eql(
                'Thing E11000 duplicate key error collection: bonesappboneyDb.things index: slug_1 dup key: { : "should-add-a-thing-once" }'
              )
              done()
            })
        })
      })
      it("boney should catch ADD a Thing errors", function (done) {
        let mockThing = {
          disambiguatingDescription: "should ADD a boney Thing",
        }
        chai
          .request(importFresh("../bones/app"))
          .post("/engage/Thing")
          .set("content-type", "application/vnd.api+json")
          .send(mockThing)
          .end(function (err, res) {
            should.not.exist(err)
            res.should.have.status(400)
            res.should.be.json
            res.body.msg.should.eql(
              "Thing thing validation failed: name: Path `name` is required."
            )
            done()
          })
      })
    })
    describe("/PATCH engage/:thing", function () {
      it("boney should UPDATE a Thing", function (done) {
        var mockThing = {
          name: "should UPDATE a boney Thing",
          disambiguatingDescription: "should UPDATE a boney Thing",
        }
        var thing = new Thing(mockThing)
        thing.save(function () {
          var updateThing = {
            name: "boney Thing should be UPDATED",
            disambiguatingDescription: "boney Thing should be UPDATED",
          }
          chai
            .request(importFresh("../bones/app"))
            .patch(`/engage/Thing/${thing._id}`)
            .set("content-type", "application/vnd.api+json")
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
      it("boney should catch UPDATE a Thing errors", function (done) {
        var mockThing = {
          name: "should UPDATE a boney Thing",
          disambiguatingDescription: "should UPDATE a boney Thing",
        }
        var thing = new Thing(mockThing)
        thing.save(function () {
          var updateThing = {
            name: "boney Thing should be UPDATED",
            disambiguatingDescription: "boney Thing should be UPDATED",
          }
          chai
            .request(importFresh("../bones/app"))
            .patch(`/engage/Thing/nosuchthing`)
            .set("content-type", "application/vnd.api+json")
            .send(updateThing)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(404)
              res.should.be.json
              res.body.msg.should.eql(
                'Thing Cast to ObjectId failed for value "nosuchthing" at path "_id" for model "thing"'
              )
              done()
            })
        })
      })
    })
    describe("/DELETE engage/:thing", function () {
      it("boney should DELETE a Thing", function (done) {
        var mockThing = {
          name: "should DELETE a boney Thing",
          disambiguatingDescription: "should DELETE a boney Thing",
        }
        var thing = new Thing(mockThing)
        thing.save(function () {
          chai
            .request(importFresh("../bones/app"))
            .delete(`/engage/Thing/${thing._id}`)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.msg.should.eql("Thing successfully deleted")
              done()
            })
        })
      })
      it("boney should catch DELETE a Thing errors", function (done) {
        var mockThing = {
          name: "should DELETE a boney Thing",
          disambiguatingDescription: "should DELETE a boney Thing",
        }
        var thing = new Thing(mockThing)
        thing.save(function () {
          chai
            .request(importFresh("../bones/app"))
            .delete(`/engage/Thing/nosuchthing`)
            .set("content-type", "application/vnd.api+json")
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(404)
              res.should.be.json
              res.body.msg.should.eql(
                'Thing Cast to ObjectId failed for value "nosuchthing" at path "_id" for model "thing"'
              )
              done()
            })
        })
      })
    })
  })
})
