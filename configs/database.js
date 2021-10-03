'use strict';
const mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./settings')[env];
mongoose.connect(config.db, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the things database`);
});
