const initializeT = argv => {
  let thing = { ...argv } || {}
  delete thing._
  delete thing.$0
  return thing
}
module.exports = initializeT
