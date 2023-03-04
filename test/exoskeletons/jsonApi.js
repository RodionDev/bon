'use strict'
const chai = require('chai')
chai.should()
const Thing = require('../../bones/endoskeletons/ThingOnAShoeString/models/Thing')
const jsonApi = require('../../bones/exoskeletons/jsonApi')
var gudData = require('../utils/gudData.json')
var badData = require('../utils/badData.json')
badData['toObject'] = function() {
  return badData
}
const gudMeta = {
  jsonapi: {
    version: '1.0',
  },
  meta: Thing.schema.paths,
}
var meta = {
  schemaName: 'Thing',
  Thing: Thing,
}
describe('exoskeleton.jsonApi', function() {
  it('.outOf() should convert to jsonApi single data key format.', function() {
    var jsowned = jsonApi.outOf(meta, badData)
    var gudDatad = {
      jsonapi: gudMeta['jsonapi'],
      meta: gudMeta['meta'],
      data: gudData,
    }
    jsowned.should.deep.eql(gudDatad)
  })
  it('.listOutOf() should convert to jsonApi data keyed list format.', function() {
    var jsowned = jsonApi.listOutOf(meta, [badData, badData, badData])
    var gudDatad = {
      jsonapi: gudMeta['jsonapi'],
      meta: gudMeta['meta'],
      data: [gudData, gudData, gudData],
    }
    jsowned.should.deep.eql(gudDatad)
  })
  it('.metaOf() should return the meta keyed mongoose schema.', function() {
    var jsowned = jsonApi.metaOf(meta)
    jsowned.should.deep.eql(gudMeta)
  })
  it('.deleteOf() should return the meta keyed mongoose schema.', function() {
    var jsowned = jsonApi.deleteOf(meta, badData)
    jsowned.should.deep.eql(gudMeta)
  })
  it('.errorOf() should return an error keyed mongoose schema.', function() {
    var jsowned = jsonApi.errorOf(meta, "This is an error.")
    var errMeta = {
      jsonapi: {
        version: '1.0',
      },
      errors: ['Thing This is an error.'],
    }
    jsowned.should.deep.eql(errMeta)
  })
})
