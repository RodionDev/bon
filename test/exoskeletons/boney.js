'use strict'
const chai = require('chai')
chai.should()
const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')
const boney = require('../../bones/exoskeletons/boney')
var bad_data = require('../utils/bad_data.json')
bad_data['toObject'] = function() {
  return bad_data
}
var meta = {
  schemaName: 'Thing',
  Thing: Thing
}
describe('exoskeleton.boney', function() {
  it('.outOf() should leave the data untouched', function() {
    var boned = boney.outOf(meta, bad_data)
    boned.should.deep.eql(bad_data)
  })
  it('.listOutOf() should leave the data untouched', function() {
    var boned = boney.listOutOf(meta, [bad_data, bad_data, bad_data])
    boned.should.deep.eql([bad_data, bad_data, bad_data])
  })
  it('.metaOf() should return the mongoose schema', function() {
    var boned = boney.metaOf(meta)
    boned.should.deep.eql(Thing.schema.paths)
  })
  it('.deleteOf() return a simple message', function() {
    var boned = boney.deleteOf(meta, bad_data)
    boned.should.deep.eql({
      msg: 'Thing successfully deleted'
    })
  })
  it('.anatomyOf() should set some parameters for the mongooseCall', function() {
    var mock_req = {
      params: {
        thing: 'Thing'
      }
    }
    var mock_res = {}
    boney.anatomyOf('GET', mock_req, mock_res, function(req, res, Thing, meta) {
      req.should.deep.eql(mock_req)
      meta.schemaName.should.eql('Thing')
    })
  })
})
