'use strict'
const mongoose = require('mongoose')
let cnnStr = '' + process.env['MONGODB'] + process.env['DATABASENAME']
mongoose.Promise = global.Promise
mongoose.connect(cnnStr, {
  useNewUrlParser: true,
})
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(
    `bones is connected to ${process.env['MONGODB']}${
      process.env.DATABASENAME
    }`,
  )
})
