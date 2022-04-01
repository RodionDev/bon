'use strict'
const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
  .use(bodyParser.json())
var routes = require('./routes') 
routes(app) 
module.exports = app
