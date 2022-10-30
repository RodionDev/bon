'use strict'
process.env.ENDOSKELETON = 'TestVersion'
process.env.EXOSKELETON = 'boney'
process.env.DATABASENAME = 'elioWay'
process.env.MONGODB = 'mongodb:
process.env.PORT = 3030
require('./database')
const app = require('./app')
const port = parseInt(process.env.PORT, 10) || process.env.PORT
const server = app.listen(port, function () {
  console.log(`API is RESTing at: http:
})
