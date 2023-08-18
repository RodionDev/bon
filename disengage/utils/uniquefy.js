import slug from "mollusc"
import keywordExtractor from "keyword-extractor"
export const uniquefy = slimy => {
  var unslime = slug(slimy).split("-").sort().join(" ")
  unslime = keywordExtractor.extract(unslime, {
    language: "english",
    remove_digits: false,
    return_changed_case: false,
    remove_duplicates: true,
  })
  return unslime.join(" ")
}
