# Quickstart adon
## Prerequisites
- mongodb installed?[No!](https://elioway.gitlab.io/eliothing/bones/mongo-db.html)
- **bones** installed?[No!](https://elioway.gitlab.io/eliothing/bones/installing.html)
### Config
Create a `.env` file in the root directory. It should have the following settings:
```
ENDOSKELETON='ThingOnAShoeString'
EXOSKELETON='boney'
DATABASENAME='elioWay'
MONGODB='mongodb://localhost:27017/'
ALLOWED_HOST='http://localhost:4200'
PORT=3030
```
## Types you might overide
```
/**
Other Schema properties you might override.
// "image": IMAGEFIELD,
// "logo": IMAGEFIELD,
// "screenshot": IMAGEFIELD,
// "beforeMedia": FILEFIELD,
// "afterMedia": FILEFIELD,
// "duringMedia": FILEFIELD,
// "minPrice": MONEYFIELD,
// "maxPrice": MONEYFIELD,
// "price": MONEYFIELD,
// "minValue": MONEYFIELD,
// "value": MONEYFIELD,
// "maxValue": MONEYFIELD,
Other options for fields.
required: boolean or function, if true adds a required validator for this property
default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
select: boolean, specifies default projections for queries
validate: function, adds a validator function for this property
get: function, defines a custom getter for this property using Object.defineProperty().
set: function, defines a custom setter for this property using Object.defineProperty().
alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.
immutable: boolean, defines path as immutable. Mongoose prevents you from changing immutable paths unless the parent document has isNew: true.
transform: function, Mongoose calls this function when you call Document#toJSON() function, including when you JSON.stringify() a document.
*/
```
## Curling is seeing
```
cd bones
yarn devstart
```
Get all Things
```bash
curl -X GET http://localhost:3030/engage/Thing
```
Add a Thing
```bash
curl -X POST http://localhost:3030/engage/Thing \
    -d name='Thing Red' \
    -d disambiguatingDescription='Thing is red'
```
Get a Thing
```bash
curl -X GET http://localhost:3030/engage/Thing/5b55beed33fa1d4ed364c85f
```
Update a Thing
```bash
curl -X PUT http://localhost:3030/engage/Thing/5b55beed33fa1d4ed364c85f \
    -d alternateName='Thing 1 is the King of Things' \
    -d description='There is a thing, then there is Thing 1\. No two things are the same. Thing 1 is best.'
```
Remove Thing by ID
```bash
curl -X DELETE http://localhost:3030/engage/Thing/5b617b518598fe12ae92d634
```
