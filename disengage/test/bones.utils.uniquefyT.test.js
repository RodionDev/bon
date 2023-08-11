let chai = require("chai")
var uniquefyT = require("../bones/utils/uniquefyT")
chai.should()
describe("uniquefyT function", function () {
  it("should deslug a slug or str", function () {
    uniquefyT("ant-bee-cat").should.eql("ant bee cat")
    uniquefyT("ant bee cat").should.eql("ant bee cat")
  })
  it("should sort the slug", function () {
    uniquefyT
      .uniquefyT("dog-cat-bee-ant-wasp-mole-zebra")
      .should.eql("ant bee cat dog mole wasp zebra")
  })
  it("should remove duplicate words", function () {
    uniquefyT
      .uniquefyT("cat-bee-cat-bee-ant-ant-ant-cat-cat")
      .should.eql("ant bee cat")
    uniquefyT
      .uniquefyT("cat bee cat bee-ant-ant ant-cat-cat")
      .should.eql("ant bee cat")
  })
  it("should remove stop words", function () {
    uniquefyT
      .uniquefyT(
        "the-cat-ate-the-zebra-while-the-bee-and-the-ant-looked-on-horrified"
      )
      .should.eql("ant ate bee cat horrified looked zebra")
    uniquefyT
      .uniquefyT(
        "all the kings horses and all the kings men couldn't put humpty together again"
      )
      .should.eql("couldnt horses humpty kings men put")
  })
})
