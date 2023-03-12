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
