"use strict";
const mongoose = require("mongoose");
function dbconnect(mongoDbUrl) {
  mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  return mongoose.connection;
}
function dbclose() {
  return mongoose.disconnect();
}
function dbclear() {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].deleteMany(() => {})
  }
}
module.exports = {
  dbconnect,
  dbclose,
  dbclear
};
