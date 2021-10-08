'use strict';
const mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./settings')[env];
let options = {
  useNewUrlParser: true,
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};
mongoose.connect(config.db, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
