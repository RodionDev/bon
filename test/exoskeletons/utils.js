'use strict'
const chai = require('chai')
chai.should()
const utils = require('../../bones/exoskeletons/utils')
describe('exoskeleton.utils', function() {
  it('.singularPronoun() show remove plural things', function() {
    var utiled = utils.singularPronoun('Things')
    utiled.should.eql('Thing')
  })
  it('.singularPronoun() show capitalize things', function() {
    var utiled = utils.singularPronoun('thing')
    utiled.should.eql('Thing')
  })
})
