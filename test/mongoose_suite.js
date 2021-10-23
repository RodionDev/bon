let mongoose = require("mongoose");
exports.moogooseTestSuite = function(name, tests) {
  describe(name, function() {
    before(function(done) {
      mongoose.connect("mongodb:
        useNewUrlParser: true
      });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error"));
      db.once("open", function() {
        done();
        console.log("Mongoose here");
      });
    });
    tests();
    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        mongoose.connection.close(done);
        console.log("Mongoose gone");
      });
    });
  });
}
