let mongoose = require('mongoose')
exports.moogooseTestSuite = function (name, tests) {
  describe(name, function () {
    before(function (done) {
      mongoose.connect(process.env.MONGODB + process.env.TESTDATABASENAME, {
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
