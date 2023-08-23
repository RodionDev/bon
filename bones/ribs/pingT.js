const pingT = (packet, db, cb) =>
  cb(200, {
    identifier: "pingT",
    mainEntityOfPage: "Action",
    Action: { actionStatus: "CompletedActionStatus" },
  })
module.exports = pingT
