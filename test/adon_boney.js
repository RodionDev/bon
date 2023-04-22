require('dotenv').config()
const Thing = require('../bones/endoskeletons/ThingOnAShoeString/models/Thing')
const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/moogooseTestSuite')
const should = chai.should()
chai.use(chaiHttp)
suites.moogooseTestSuite('bones.adon.boney', function () {
  describe('bones.routes.adon.boney', function () {
    describe('bones.controller.adon.boney', function () {
      beforeEach(function (done) {
        process.env['ENDOSKELETON'] = 'ThingOnAShoeString'
        process.env['EXOSKELETON'] = 'boney'
        importFresh('../bones/controller')
        Thing.deleteOne({}, err => {
          should.not.exist(err)
          done()
        })
      })
    })
  })
})
