'use strict'
var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
mongoose.plugin(require("../../bones/models/adon"));
require('../../bones/models/thing');
let thing1 = {
  name: "Thing 1",
  alternateName: "This is really Thing 1",
  description: "This describes Thing 1",
  disambiguatingDescription: "This disambiguates Thing 1",
  engaged: false
}
describe('Callbacks example', function() {
  var Thing = mongoose.model('thing');
  it('#findByDisambiguating', function(done) {
    var ThingMock = sinon.mock(Thing);
    ThingMock.expects('findOne')
      .withArgs({
        slug: 'disambiguating-description'
      })
      .chain('exec')
      .yields(null, 'RESULT')
    Thing.findByDisambiguating('DISAMBIGUATING DESCRIPTION', function(err, result) {
      ThingMock.verify()
      ThingMock.restore()
      assert.equal(result, 'RESULT')
      done()
    })
  })
  it('#engage', function(done) {
    var thingMock = sinon.mock(
      new Thing(thing1)
    )
    var thing = thingMock.object
    thingMock
      .expects('update')
      .withArgs({
        engaged: true
      })
      .chain('exec')
      .yields(null, 'RESULT')
    thing.engage(function(err, result) {
      thingMock.verify()
      thingMock.restore()
      assert.equal(result, 'RESULT')
      done()
    })
  })
  it('#disengage', function(done) {
    var thingMock = sinon.mock(
      new Thing(thing1)
    );
    var thing = thingMock.object
    thingMock
      .expects('update')
      .withArgs({
        engaged: false
      })
      .chain('exec')
      .yields(null, 'RESULT')
    thing.disengage(function(err, result) {
      thingMock.verify()
      thingMock.restore()
      assert.equal(result, 'RESULT')
      done()
    })
  })
})
