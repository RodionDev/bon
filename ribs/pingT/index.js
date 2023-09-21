const pingT = (packet, db, cb) => {
  cb(200, {
    description: "Hello! Will you stay and be my friend?",
    mainEntityOfPage: "Action",
    Action: { actionStatus: "CompletedActionStatus" },
    ...packet,
  })
}
module.exports = pingT
