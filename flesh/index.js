module.exports = function flesh(statusCode, payload) {
  console.count("Status:", statusCode)
  console.table(payload)
}
