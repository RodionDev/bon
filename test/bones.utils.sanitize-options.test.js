const should = require("chai").should()
const sanitizeOptions = require("../bones/utils/sanitize-options")
const settings = require("../bones/settings")
let commentTests = [
  [{}, { comment: false }],
  [{ comment: false }, { comment: false }],
  [{ comment: "false" }, { comment: false }],
  [{ comment: undefined }, { comment: true }],
  [{ comment: true }, { comment: true }],
  [{ comment: "true" }, { comment: true }],
  [{ comment: "notfalse" }, { comment: true }],
]
describe("utils | sanitizers.comment()", () => {
  for (let [dirtyOption, expectSanity] of commentTests) {
    it(`sanitizes ${JSON.stringify(
      dirtyOption
    )} comment option as expected`, () => {
      dirtyOption = settings.sanitizers.comment(dirtyOption)
      dirtyOption.should.eql(expectSanity)
    })
  }
})
let depthTests = [
  [{}, { depth: 0 }],
  [{ depth: undefined }, { depth: 0 }],
  [{ depth: "0" }, { depth: 0 }],
  [{ depth: "0" }, { depth: 0 }],
  [{ depth: 1 }, { depth: 1 }],
  [{ depth: "1" }, { depth: 1 }],
  [{ depth: 2 }, { depth: 2 }],
]
describe("utils | sanitizers.depth()", () => {
  for (let [dirtyOption, expectSanity] of depthTests) {
    it(`sanitizes depth option as expected`, () => {
      dirtyOption = settings.sanitizers.depth(dirtyOption)
      dirtyOption.should.eql(expectSanity)
    })
  }
})
let sanitizeOptionsTests = [
  [{}, { comment: false, depth: 0 }],
  [{ depth: undefined }, { comment: false, depth: 0 }],
  [{ depth: "0" }, { comment: false, depth: 0 }],
  [{ depth: "0" }, { comment: false, depth: 0 }],
  [{ depth: 1 }, { comment: false, depth: 1 }],
  [{ depth: "1" }, { comment: false, depth: 1 }],
  [{ depth: 2 }, { comment: false, depth: 2 }],
]
describe("ThingBuilder | sanitizeOptions()", () => {
  for (let [dirtyOption, expectSanity] of sanitizeOptionsTests) {
    it(`sanitizes ${JSON.stringify(
      dirtyOption
    )} depth option as expected`, () => {
      dirtyOption = sanitizeOptions(dirtyOption)
      dirtyOption.should.eql(expectSanity)
    })
  }
})
