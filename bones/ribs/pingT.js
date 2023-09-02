const pingT = (packet, db, cb) => {
  cb(200, {
    ...packet,
    mainEntityOfPage: "Action",
    Action: { actionStatus: "CompletedActionStatus" },
  })
}
module.exports = pingT
