const { hash } = require("../helpers")
const authT = require("../spine/authT")
const updateT = (packet, db, cb) => {
  authT("updateT", packet, (permitted, err, engagedData) => {
    if (permitted && engagedData) {
      let { identifier, password, mainEntityOfPage } = packet
      if (password) {
        packet.password = hash(password)
      }
      let updatePacket = {
        ...engagedData,
        ...packet,
      }
      db.update(mainEntityOfPage, identifier, updatePacket, err => {
        if (!err) {
          delete updatePacket.password
          cb(200, updatePacket)
        } else {
          cb(500, {
            Error: `${identifier} Thing could not be updated.`,
            Reason: err,
          })
        }
      })
    } else {
      cb(404, err)
    }
  })
}
module.exports = updateT
