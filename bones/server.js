'use strict';
const app = require('./app')
var env = process.env.NODE_ENV || 'development';
var config = require('../configs/settings')[env];
const port = parseInt(process.env.PORT, 10) || config.port;
const server = app.listen(port, () => {
  console.log(`App is running at: http:
});
