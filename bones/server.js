'use strict'
require('dotenv').config()
require('./database')
const app = require('./app')
const port = parseInt(process.env.PORT, 10) || process.env['PORT']
const server = app.listen(port, function () {
  console.log(`API is RESTing at: http:
})
