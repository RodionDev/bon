'use strict'
let assert = require('assert')
let sinon = require('sinon')
let mongoose = require('mongoose')
require('sinon-mongoose')
let Thing = require('../../bones/endoskeletons/ThingOnAShoeString/models/Thing.js')
console.log(Thing)
let mockThing = {
  name: 'Thing 1',
  alternateName: 'This is really Thing 1',
  disambiguatingDescription: 'This disambiguates Thing 1',
  description: 'This describes Thing 1',
}
describe('Model adon methods', function() {
  it('findsByDisambiguating', function(done) {
    var ThingMock = sinon.mock(Thing)
    ThingMock.expects('findOne')
      .withArgs({
        slug: 'disambiguating-description',
      })
      .chain('exec')
      .yields(null, 'RESULT')
    Thing.findByDisambiguating('DISAMBIGUATING DESCRIPTION', function(
      err,
      result,
    ) {
      ThingMock.verify()
      ThingMock.restore()
      assert.equal(result, 'RESULT')
      assert.equal(err, null)
      done()
    })
  })
})
describe('Model adon statics', function() {
  it('engages', function(done) {
    var thingMock = sinon.mock(new Thing(mockThing))
    var thing = thingMock.object
    thingMock
      .expects('update')
      .withArgs({
        engaged: true,
      })
      .chain('exec')
      .yields(null, 'RESULT')
    thing.engage(function(err, result) {
      thingMock.verify()
      thingMock.restore()
      assert.equal(result, 'RESULT')
      assert.equal(err, null)
      done()
    })
  })
  it('disengages', function(done) {
    var thingMock = sinon.mock(new Thing(mockThing))
    var thing = thingMock.object
    thingMock
      .expects('update')
      .withArgs({
        engaged: false,
      })
      .chain('exec')
      .yields(null, 'RESULT')
    thing.disengage(function(err, result) {
      thingMock.verify()
      thingMock.restore()
      assert.equal(result, 'RESULT')
      assert.equal(err, null)
      done()
    })
  })
})
