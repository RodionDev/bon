# bones
> "Can you get this done by Wednesday?" **Rosalind Codrington**
**bones** REST API for <https://schema.org> mongoose schema spidered the elioWay.
![experimental](/eliosin/icon/devops/experimental/favicon.ico "experimental")
## WTF
Reusable endpoints for **elioBones** projects.
## Ribs
Its ribs are 10 endpoints and are the heart of **elioWay** projects.
### The TURDs
Four **elioEngage** operations:
- `takeupT` As in "take up carpentry". The "record create" endpoint.
- `updateT` The "record update" endpoint.
- `readT` The "record get" endpoint.
- `deleteT` The "record delete" endpoint.
### The LUTEs
Four **elioList** endpoints:
- `listT` The "list all relateds record" endpoint.
- `unlistT` The "record remove from list" endpoint.
- `takeonT` The "record create and add to list" endpoint.
- `enlistT` The "record add to list" endpoint.
### PS
Two **elioSchema** endpoints:
- `pingT` An endpoint for checking the availability of endpoints.
- `schemaT` An endpoint for getting metadata, or for getting a new blank record.
### Auth
Two **elioEngage** endpoints:
- `loginT` An endpoint for logging into a thing. You won't ever log into elioWay - you log into every app separately.
- `logoutT` An endpoint for logging out of an app.
## Other bones
## Spine
These are called internally by the ribs, but could be useful:
- `authT` An endpoint for checking the user is Permitted to call each endpoint.
- `engageT` An endpoint which is a light wrapper for opening.
- `permitT` Called by `authT` endpoint for checking the user is Permitted.
As long as the endpoint acts upon a complete `thing`, with or without a list, and returns the payload correctly formatted, it is an **elioBone**.
### IOU
Here are, for instance, three **elioOptimize** endpoints, the very least we could do. We expect you'll need more. You'll have to write those and share them. We'll share any we write here as well. But for now... It's the least I owe.
- `inflateT` Search subdirectores to `takeonT` any which contain a `thing.json` file.
- `optimizeT` Report on the combined `Action.actionStatus` of listed things.
- `undoT` Reverse data changes by going back a certain number of steps.
