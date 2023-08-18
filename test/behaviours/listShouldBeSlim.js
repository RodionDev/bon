"use strict"
const should = require("chai").should()
module.exports = list => {
  console.log(list)
  list[0].should.have.members(Object.values(options.slim))
}
