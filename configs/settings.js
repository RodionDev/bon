var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
module.exports = {
  development: {
    db: 'mongodb:
    port: 3000
  },
  test: {
    db: 'mongodb:
    port: 8888
  },
  production: {
  }
}
