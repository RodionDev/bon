'use strict'
const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const chai = require('chai')
chai.should()
const jsonApi = require('../../bones/exoskeletons/jsonApi')
const bad = {
  '_id': '5b72c7d7f5ee795f924421b2',
  'name': 'Thing Blue',
  'disambiguatingDescription': 'Thing is blue',
  '__v': 0
}
const gud = {
  'jsonapi': {
    'version': '1.0'
  },
  'data': {
    'type': 'Thing',
    'id': '5b72c7d7f5ee795f924421b2',
    'attributes': {
      'name': 'Thing Blue',
      'disambiguatingDescription': 'Thing is blue'
    }
  },
  'meta': Thing.schema.paths
}
describe('jsonApi.jsonApiOfThing', function() {
  it('Make bones standard output conform to JSONAPI', function() {
    var jsonApied = jsonApi.outOf(Thing, bad, 'Thing')
    jsonApied.should.deep.eql(gud)
  })
})
