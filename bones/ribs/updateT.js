const { errorPayload, hash } = require("../helpers")
const authT = require("../spine/authT")
const updateT = (packet, db, cb) => {
  authT(
    "updateT",
    { identifier: packet.identifier },
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canExist(engagedData)) {
        if (packet.password) {
          packet.password = hash(password)
        }
        let updatePacket = {
          ...engagedData,
          ...packet,
        }
        console.log({updatePacket})
        db.update(updatePacket, (updateErr,updatedThing) => {
          if (!updateErr) {
            delete updatedThing.password
            cb(200, updatedThing)
          } else {
            let { identifier } = packet
            cb(
              500,
              errorPayload(
                `${identifier} Thing could not be updated`,
                updateErr
              )
            )
          }
        })
      } else {
        cb(404, authError)
      }
    }
  )
}
module.exports = updateT
