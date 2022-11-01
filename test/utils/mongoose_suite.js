let mongoose = require('mongoose')
require('dotenv').config()
exports.moogooseTestSuite = function (name, tests) {
  describe(name, function () {
    before(function (done) {
      let cnnStr = '' + process.env['MONGODB'] + process.env['DATABASENAME']
      mongoose.connect(cnnStr, {
        useNewUrlParser: true
      })
      const db = mongoose.connection
      db.on('error', console.error.bind(console, 'connection error'))
      db.once('open', function () {
        done()
      })
    })
    tests()
    after(function (done) {
      mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(done)
      })
    })
  })
}
