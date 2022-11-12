'use strict'
const chai = require('chai')
chai.should()
const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const jsonApi = require('../../bones/exoskeletons/jsonApi')
var gud_data = require('../utils/gud_data.json')
var bad_data = require('../utils/bad_data.json')
bad_data['toObject'] = function () {
  return bad_data
}
const gud_meta = {
  'jsonapi': {
    'version': '1.0'
  },
  'meta': Thing.schema.paths
}
var meta = {
  schemaName: 'Thing',
  Thing: Thing,
}
describe('exoskeleton.jsonApi', function() {
  it('.outOf() should convert to jsonApi single data key format.', function() {
    var jsowned = jsonApi.outOf(meta, bad_data)
    var gud_datad = {
      'jsonapi': gud_meta['jsonapi'],
      'meta': gud_meta['meta'],
      'data': gud_data
    }
    jsowned.should.deep.eql(gud_datad)
  })
  it('.listOutOf() should convert to jsonApi data keyed list format.', function() {
    var jsowned = jsonApi.listOutOf(meta, [bad_data, bad_data, bad_data])
    var gud_datad = {
      'jsonapi': gud_meta['jsonapi'],
      'meta': gud_meta['meta'],
      'data': [gud_data, gud_data, gud_data]
    }
    jsowned.should.deep.eql(gud_datad)
  })
  it('.metaOf() should return the meta keyed mongoose schema.', function() {
    var jsowned = jsonApi.metaOf(meta)
    jsowned.should.deep.eql(gud_meta)
  })
  it('.deleteOf() should return the meta keyed mongoose schema.', function() {
    var jsowned = jsonApi.deleteOf(meta, bad_data)
    jsowned.should.deep.eql(gud_meta)
  })
})
