const OK = 103
const NOTOK = 406
const pingT = (_, ribs, db, cb) => {
  console.count("the Real pingT")
  cb(OK, {
    name: "pingT",
    description:
      `\nAll sorts are here that all the Earth yields,\n` +
      `Variety without end; but of the tree,\n` +
      `Which, tasted, works knowledge of good and evil,\n` +
      `Thou mayest not"`,
    mainEntityOfPage: "Action",
    potentialAction: "bones permitT",
    Action: { actionStatus: "CompletedActionStatus" },
  })
}
module.exports = pingT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK
