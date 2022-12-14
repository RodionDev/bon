'use strict'
require('./database')
const app = require('./app')
const port = parseInt(process.env.PORT, 10) || 3030
const server = app.listen(port, function () {
  console.log(`API is RESTing at: http:
})
