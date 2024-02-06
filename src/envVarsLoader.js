const envVarsLoader = envData =>
  envData
    .trim()
    .split("\n")
    .map(line => line.split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
module.exports = envVarsLoader
