let mongoose = require('mongoose')
const importFresh = require('import-fresh')
exports.moogooseTestSuite = function(testname, tests) {
  describe(testname, function() {
    before(function(done) {
      let cnnStr = '' + process.env['MONGODB'] + testname.split(".").join("") + "Db"
      mongoose.connect(cnnStr, {
        useNewUrlParser: true
      })
      const db = mongoose.connection
      db.on('error', console.error.bind(console, 'connection error'))
      db.once('open', function() {
        done()
      })
    })
    tests()
    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        mongoose.connection.close(done)
      })
    })
  })
}
