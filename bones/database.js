'use strict'
const nconf = require('nconf')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB + process.env.DATABASENAME, {
  useNewUrlParser: true
})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`Connected to the ${process.env.DATABASENAME} database`)
})
