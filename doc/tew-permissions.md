# Permissions TEW
TEW is a _design_pattern_ not a feature set. But we made plenty features you can use, and Permissions is an important part.
This document does not describe the TEW _design_pattern_, which is described by [dogma](/dogma.html).
Rather, this describes an "out-of-the-box" _implementation_ of the _design_pattern_ to solve the Permissions _requirement_, **the elioWay**.
It should - in most cases - suffice during development, demonstration, and even into the deployment circle. You'll probably swap it with something else... eventually - and you can do that as long as you do it **the elioWay**. Until then or for when you do, this will help understand the default behavior.
The relationship between a `GovernmentPermit` and a `Permit` is as follows:
The `GovernmentPermit` [GP] is **listed** by the **engaged** thing for which Permission is being given. During the `authT` process, the `GovernmentPermit` is compared to the user submitted `Permit` [USP] and permission is given when:
1. Permitted by identity:
- `issuedBy` `issuedThrough` `permitAudience` `validFor` are the same between `GovernmentPermit` and `Permit`
- `GP.Permit.permitAudience` `===` [a password passed by `--Permit`]
  - No permit needed this way.
2. Permitted by range:
- `GP.Permit.validFor` particular endpoints separated by commas or "\*"
- `GP.Permit.validIn` leave as intended and limit geozones or IP ranges or something ...
- `GP.Permit.validFrom` `<` `USP.Permit.validFrom`
- `GP.Permit.validUntil` `>` `USP.Permit.validUntil`
NB: You can easily issue correctly formatted `Permit`s to users and list corresponding `GovernmentPermit`s using the `inviteT` endpoint.
