const { errorPayload, makePermitIdentifier } = require("../../src/helpers")
const { OK: TAKEONSTATUSOK } = require("../../ribs/takeonT")
const { OK: TAKEUPSTATUSOK } = require("../../ribs/takeupT")
const OK = 206
const NOTOK = 417
const findFirstExisting = o => !!o
const inviteT = (packet, ribs, db, cb) => {
  console.count("the Real inviteT")
  let { authT, takeonT, takeupT } = ribs
  authT(
    "inviteT",
    { identifier: packet.subjectOf },
    ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canStore(engagedData)) {
        let packetPermit = packet.Permit
        let permitIdentifier = [
          packet.identifier,
          packetPermit?.permitAudience,
          makePermitIdentifier(),
        ].find(findFirstExisting)
        let govPermitIdentifier = `permits:${permitIdentifier}`
        let govPermit = {
          identifier: govPermitIdentifier,
          mainEntityOfPage: "GovernmentPermit",
          subjectOf: engagedData.identifier,
          ItemList: { itemListElement: [] },
          Permit: {
            issuedBy: engagedData.identifier,
            issuedThrough: govPermitIdentifier,
            permitAudience: permitIdentifier,
            validFor: [packetPermit?.validFor, "*"].find(findFirstExisting),
            validFrom: [packetPermit?.validFrom, "1970-01-01"].find(
              findFirstExisting
            ),
            validUntil: [packetPermit?.validUntil, "2040-01-01"].find(
              findFirstExisting
            ),
          },
        }
        takeonT(govPermit, ribs, db, (takeonStatusCode, govPermitData) => {
          if (takeonStatusCode === TAKEONSTATUSOK) {
            let permit = {
              ...govPermit,
              identifier: permitIdentifier,
              subjectOf: govPermitIdentifier,
              mainEntityOfPage: "Permit",
            }
            takeupT(permit, ribs, db, (takeupStatusCode, takeupData) => {
              if (takeupStatusCode === TAKEUPSTATUSOK) {
                cb(OK, permit)
              } else {
                cb(NOTOK, errorPayload("takeupT"))
              }
            })
          } else {
            cb(NOTOK, errorPayload("takeonT", "Permission not granted"))
          }
        })
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}
module.exports = inviteT
exports = module.exports 
exports.OK = OK
exports.NOTOK = NOTOK
