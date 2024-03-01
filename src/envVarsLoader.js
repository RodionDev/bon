const path = require("node:path")
const boneEnvVarsLoader = (readEnvErr, envData, commandDir) => {
   let cfg = {       
      APPIDENTIFIER: commandDir.split(path.sep).pop(),
      DATADIR: path.join(commandDir, ".data"),
      MEDIADIR: path.join(commandDir, "gallery"),
      PORT: 3000,
    }
    let envVars =  {}
    if (!readEnvErr) {
       envVars = envData
              .trim()
              .split("\n")
              .map(line => line.split("="))
              .reduce((acc, [key, value]) => {
                acc[key] = value
                return acc
              }, {})
    }
    return {
      ...cfg, 
      ...envVars,
    }
}
module.exports = boneEnvVarsLoader
