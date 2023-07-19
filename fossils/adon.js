const slug = require("mollusc")
var uniquefy = require("../../lib/uniquefy")
module.exports = exports = function adon(schema, options) {
  schema.path("name").required(true)
  schema.path("disambiguatingDescription").required(true)
  schema.pre("save", function (next) {
    next()
  })
  schema.static("findByDisambiguating", function (
    disambiguatingDescription,
    callback
  ) {
    return this.findOne({
      slug: slug(disambiguatingDescription),
    }).exec(callback)
  })
}
