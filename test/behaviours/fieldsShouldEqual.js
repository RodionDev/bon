"use strict"
const should = require("chai").should()
module.exports = (body, expected) => {
  for (let [field, mockVal] of Object.entries(expected)) {
    if (typeof mockVal === "object") {
      for (let [engage, mockAdonVal] of Object.entries(mockVal)) {
        body[field][engage].should.be.eql(mockAdonVal)
      }
    } else {
      body[field].should.be.equal(mockVal)
    }
  }
}
