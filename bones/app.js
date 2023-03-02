'use strict'
require('request')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')({
  origin: true
})
const app = express()
app
  .use(cors)
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(
    bodyParser.json({
      type: 'application/vnd.api+json'
    })
  )
var routes = require('./routes') 
routes(app) 
module.exports = app
