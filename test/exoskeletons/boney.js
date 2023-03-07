'use strict'
const chai = require('chai')
chai.should()
const Thing = require('../../bones/endoskeletons/ThingOnAShoeString/models/Thing')
const boney = require('../../bones/exoskeletons/boney')
var badData = require('../utils/badData.json')
badData['toObject'] = function() {
  return badData
}
var meta = {
  schemaName: 'Thing',
  Thing: Thing,
}
describe('exoskeleton.boney', function() {
  it('.outOf() should leave the data untouched', function() {
    var boned = boney.outOf(meta, badData)
    boned.should.deep.eql(badData)
  })
  it('.listOutOf() should leave the data untouched', function() {
    var boned = boney.listOutOf(meta, [badData, badData, badData])
    boned.should.deep.eql([badData, badData, badData])
  })
  it('.metaOf() should return the mongoose schema', function() {
    var boned = boney.metaOf(meta)
    boned.should.deep.eql(Thing.schema.paths)
  })
  it('.deleteOf() return a simple message', function() {
    var boned = boney.deleteOf(meta, badData)
    boned.should.deep.eql({
      msg: 'Thing successfully deleted',
    })
  })
  it('.errorOf() return a simple message', function() {
    var boned = boney.errorOf(meta, 'This is an error.')
    boned.should.deep.eql({
      msg: 'Thing This is an error.',
    })
  })
  it('.thenMongoose() should set some parameters for the mongooseCall', function() {
    var mock_req = {
      params: {
        thing: 'Thing',
      },
    }
    var mock_res = {}
    boney.thenMongoose('GET', mock_req, mock_res, function(
      req,
      res,
      Thing,
      meta,
    ) {
      req.should.deep.eql(mock_req)
      meta.schemaName.should.eql('Thing')
    })
  })
})
