'use strict'
const boney = require('./exoskeletons/boney')
const jsonApi = require('./exoskeletons/jsonApi')
var exoskeletons = {
  'boney': {
    'outOf': boney.outOf,
    'listOutOf': boney.listOutOf,
    'metaOf': boney.metaOf
  },
  'jsonApiV1.0': {
    'outOf': jsonApi.outOf,
    'listOutOf': jsonApi.listOutOf,
    'metaOf': jsonApi.metaOf
  }
}
module.exports = exoskeletons[process.env.EXOSKELETON]
