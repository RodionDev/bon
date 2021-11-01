const slug = require("mollusc");
const uniquefy = require("../../lib/uniquefy");
module.exports = exports = function adon(schema, options) {
  schema.add({
    slug: {
      type: String,
      unique: [true, "A record with this alternative name already exists."],
      maxlength: [255, "A 255 character or less unique slug for the item."]
    },
    seoKeywords: {
      type: String,
      maxlength: [255, "A 255 character or less unique set of keywords for the item."]
    },
  });
  schema.pre("save", function(next) {
    this.slug = slug(this.disambiguatingDescription);
    this.seoKeywords = uniquefy.uniquefy(this.slug);
    next();
  });
  if (options && options.index) {
    schema.path("slug").index(options.index);
  }
  schema.static('findByDisambiguating', function(disambiguatingDescription, callback) {
    return this.findOne({
        slug: slug(disambiguatingDescription)
      })
      .exec(callback);
  });
}
