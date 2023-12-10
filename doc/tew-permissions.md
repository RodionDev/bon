# Permissions TEW
TEW is a pattern not a feature set. We made some features for it and Permissions is an important part.
This document does not describe the TEW _design_pattern_, which is described by [dogma](/dogma.html).
Rather, this describes an "out-of-the-box" _implementation_ of the _design_pattern_ to solve the Permissions _requirement_, **the elioWay**.
It should - in most cases - suffice during development, demonstration, and even into the deployment circle. You'll probably swap it with something else... eventually - and you can do that as long as you do it **the elioWay**. Until then or for when you do, this will help understand the default behavior.
The relationship between a `GovernmentPermit` and a `Permit` is as follows:
# GovernmentPermit
The `GovernmentPermit` is **listed** by the **engaged** thing for which Permission is being given. During the `authT` process, the `GovernmentPermit` is compared to the given `Permit` and permission is given when:
- `aT.identifier` `===` `pT.Permit.issuedThrough`
  - This is the `identifier` of `GovernmentPermit` which the "Permit" is "issued through"
- `aT.subjectOf` `===` `pT.Permit.issuedBy`
  - just happens to be the "thing" being given access to... `aT` is listed by this "thing".
  - because this is the "thing" issuing it.
- `aT.GovernmentPermit.availabilityEnds` `>` `pT.Permit.validUntil`
  `&&`
- `aT.GovernmentPermit.availabilityStarts` `<` `pT.Permit.validFrom`
- `aT.GovernmentPermit.category` spare
- `aT.GovernmentPermit.eligibleRegion` sensible to leave as intended and limit geozones or IP ranges or something.
- `aT.GovernmentPermit.permitAudience` `===` `pT.identifier`
  - It could be a password.
- `aT.GovernmentPermit.ineligibleRegion` sensible to leave as intended and limit geozones or IP ranges or something.
- `aT.GovernmentPermit.requiresSubscription` `===` `<endpoint>[,<endpoint[n]>]`
# From Permit perspective:
- `pT.identifier` `===` `aT.GovernmentPermit.permitAudience`
  - Is a unique identifier.
  - It doesn't have to be a `Permit` - only have the `Permit` subtype.
  - It could be a password.
- `pT.Permit.issuedBy` === `aT.GovernmentPermit.subjectOf`
- `pT.Permit.issuedThrough` === `aT.identifier`
- `pT.Permit.permitAudience` === ???
- `pT.Permit.validFor` it's for duration but has a semantic similarity
- `pT.Permit.validFrom` `>` `aT.GovernmentPermit.availabilityStarts`
- `pT.Permit.validIn` sensible to leave as intended and limit geozones or IP ranges or something ...
- `pT.Permit.validUntil` `<` `aT.GovernmentPermit.availabilityEnds`
