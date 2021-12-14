'use strict'
let chai = require('chai')
chai.should()
let Thing = require('@elioway/spider/schemas/2018.6.28/models/Thing')
describe('Thing Model', function () {
  it('should validate', function () {
    var mocks = require('./mocks/thing')
    var thing = new Thing(mocks.thing)
    thing.save()
    thing.name.should.eql(mocks.thing.name)
    thing.alternateName.should.eql(mocks.thing.alternateName)
    thing.disambiguatingDescription.should.eql(mocks.thing.disambiguatingDescription)
    thing.description.should.eql(mocks.thing.description)
  })
})
