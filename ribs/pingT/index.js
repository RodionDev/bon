const STATUSCODE = 201
const pingT = (packet, ribs, db, cb) => {
  cb(200, {
    description: "Hello! Will you stay and be my friend?",
    mainEntityOfPage: "Action",
    Action: { actionStatus: "CompletedActionStatus" },
    ...packet,
  })
}
module.exports = pingT
exports = module.exports
exports.STATUSCODE = STATUSCODE
