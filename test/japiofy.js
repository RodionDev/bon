let chai = require('chai')
var japiofy = require('../lib/japiofy')
chai.should()
var bad = {
  "_id": "5b72c7d7f5ee795f924421b2",
  "name": "Thing Blue",
  "disambiguatingDescription": "Thing is blue",
  "__v": 0
}
var gud = {
  type: 'Thing',
  id: '5b72c7d7f5ee795f924421b2',
  attributes: {
    name: 'Thing Blue',
    disambiguatingDescription: 'Thing is blue'
  }
}
describe('japiofy function', function() {
  it('Make bones standard output conform to JSONAPI', function() {
    var japiofied = japiofy.jsonApiOrgify(bad, "Thing")
    japiofied.should.deep.eql(gud)
  })
})
