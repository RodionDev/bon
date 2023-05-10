const slug = require("mollusc")
var uniquefy = require("../../lib/uniquefy")
module.exports = exports = function adon(schema, options) {
  schema.add({
    slug: {
      type: String,
      unique: [
        true,
        "A Thing with this description cannot be disambiguated from another record.",
      ],
      index: true,
      maxlength: [255, "A 255 character or less unique slug for the item."],
    },
    seoKeywords: {
      type: String,
      maxlength: [
        255,
        "A 255 character or less unique set of keywords for the item.",
      ],
    },
    engaged: {
      type: String,
      default: "false",
    },
  })
  schema.path("name").required(true)
  schema.path("disambiguatingDescription").required(true)
  schema.pre("save", function (next) {
    this.slug = slug(this.disambiguatingDescription)
    this.seoKeywords = uniquefy.uniquefy(this.slug)
    next()
  })
  schema.method("engage", function (callback) {
    return this.update({
      engaged: true,
    }).exec(callback)
  })
  schema.method("disengage", function (callback) {
    return this.update({
      engaged: false,
    }).exec(callback)
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
