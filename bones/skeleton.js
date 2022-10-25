'use strict'
var config = require('config')
const default = require('anatomy/default')
const jsonApi = require('anatomy/jsonApi')
var exoskeletons = {
  'default': {
    outOf: default.outOf,
    listOutOf: default.listOutOf,
  },
  'jsonapi': {
    outOf: jsonApi.outOf,
    listOutOf: jsonApi.listOutOf,
  },
}
module.exports = skeletons[config.get('BONES.exoskeleton')]
