'use strict'
let chai = require("chai");
var suites = require("../mongoose_suite");
let should = chai.should();
var Thing = require("../../bones/models/thing");
describe('Thing Model', function() {
  it('should validate', function() {
    var mocks = require('./mocks/thing');
    var thing = new Thing(mocks.thing);
    thing.save();
    thing.name.should.eql(mocks.thing.name);
    thing.alternateName.should.eql(mocks.thing.alternateName);
    thing.disambiguatingDescription.should.eql(mocks.thing.disambiguatingDescription);
    thing.description.should.eql(mocks.thing.description);
  });
})
