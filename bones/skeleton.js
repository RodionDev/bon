'use strict'
const boney = require('./exoskeletons/boney')
const jsonApi = require('./exoskeletons/jsonApi')
var exoskeletons = {
  'boney': boney,
  'jsonApiV1.0': jsonApi
}
module.exports = exoskeletons[process.env['EXOSKELETON']]
