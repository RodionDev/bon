'use strict'
const slug = require('mollusc')
const keywordExtractor = require('keyword-extractor')
exports.uniquefy = function(slimy) {
  var unslime = slug(slimy)
    .split('-')
    .sort()
    .join(' ')
  unslime = keywordExtractor.extract(unslime, {
    language: 'english',
    remove_digits: false,
    return_changed_case: false,
    remove_duplicates: true,
  })
  return unslime.join(' ')
}
