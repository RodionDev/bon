const { errorPayload, hash } = require("../../src/helpers")
const { authT } = require("../../spine")
const readT = require("../readT")
const undoT = (packet, db, cb) => {
  authT("undoT", packet, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      cb(200, {
        identifier: "undoT",
        name: "Coming Soon",
      })
    } else {
      cb(404, authError)
    }
  })
}
const savePointT = (packet, db, cb) => {
  authT("savePointT", packet, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      readT({
        identifier: "savePointT",
        name: "Coming Soon",
      })
    } else {
      cb(404, authError)
    }
  })
}
module.exports = {
  undoT,
  savePointT
}
