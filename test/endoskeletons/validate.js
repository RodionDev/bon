'use strict'
var expect = require('chai').expect
let Thing = require('../../bones/endoskeletons/ThingOnAShoeString/models/Thing.js')
describe('validate adon required fields', function () {
  it('name is required', function (done) {
    const thing = new Thing({
      disambiguatingDescription: 'This disambiguates Thing 1',
    })
    thing.validate(function (err) {
      expect(err.errors.name).to.exist
    })
    done()
  })
  it('disambiguatingDescription is required', function (done) {
    const thing = new Thing({
      name: 'Thing 1',
    })
    thing.validate(function (err) {
      expect(err.errors.disambiguatingDescription).to.exist
    })
    done()
  })
})
