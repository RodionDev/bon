const { errorPayload, hash } = require("../../src/helpers")
const updateT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("updateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      if (packet.password) {
        packet.password = hash(password)
      }
      let updatePacket = {
        ...engagedData,
        ...packet,
      }
      db.update(updatePacket, (updateErr, updatedThing) => {
        if (!updateErr) {
          delete updatedThing.password
          cb(200, updatedThing)
        } else {
          let { identifier } = packet
          cb(
            500,
            errorPayload(
              "updateT",
              `${identifier} Thing could not be updated`,
              updateErr
            )
          )
        }
      })
    } else {
      cb(404, authError)
    }
  })
}
module.exports = updateT
