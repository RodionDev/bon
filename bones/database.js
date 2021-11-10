'use strict'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb:
  useNewUrlParser: true
})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`Connected to the things database`)
})
mongoose.plugin(require('./models/adon'))
