const importFresh = require('import-fresh');
var foo = null
foo = require('./foo')
console.log(foo.eyeeye())
foo = require('./foo')
console.log(foo.eyeeye())
foo = importFresh('./foo')
console.log(foo.eyeeye())
foo = importFresh('./foo')
console.log(foo.eyeeye())
