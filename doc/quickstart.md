# Quickstart bones
- [bones Prerequisites](/eliobones/bones/prerequisites.html)
- [Installing bones](/eliobones/bones/installing.html)
## Nutshell
- Config
- Commands
## Config
Config using `.env` with the following settings.
### Password encryption
```
HASHINGSECRET=123
```
### root `identifier`
A permanent record of the data root's `identifier`.
```
identifier=APPID_123/engage/adventCalendar
```
### Permit settings
The following set up, for instance, mean "READONLY" unless authenticated.
- All the GOD commands are for editing the engaged thing.
- All the AUTH commands are for working with the engaged thing's list.
- All the ANON commands are for view only the engaged thing and the list.
This implies the owner of this app wants to authorize others to help build the data, but not change the app.
```
deleteT=GOD
enlistT=AUTH
listT=ANON
pingT=ANON
readT=ANON
schemaT=ANON
takeonT=AUTH
takeupT=ANON
updateT=GOD
unlistT=AUTH
```
Another example, with `GOD` for all commands, would imply the owner wants this to remain private.
### Type override
Schema properties can have 2 or more acceptable Types. **elioThing** builds schemas which select the best Type when more than 1 is available (just let it do the work for you) but you can override them - and fix any fieldNames to a particular type.
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
```
## Commands
### Set up
```bash
# Preserve test data
mv .data .databu20220101
# or just clear any test data
rm -rf .data/
```
### The command format
`<runtimeBones> <commandName> [<params>] [--propName=propValue]`
Breakdown:
- **runtimeBones** calls the **bones** library on your command line. What you need depends on context.
  - `npm run bones -- <commandName> ...` inside the **bones** directory. You'll usually be doing this testing or playing.
  - `bones <commandName> ...` **bones** is in the `$PATH` of your computer system. You'll be using this after installing it.
- **commandName**'s are all equal. They perform one common operation from start to finish. They take the same parameters, for instance, in the same order. There aren't many because of the iterative data structure.
  It helps to group them mentally like this:
  - `takeupT` `updateT` `readT` `deleteT` affects a thing's direct or subclassed properties.
    - These require the `identifier` parameter.
    - `identifier` is the only required field.
  - `listT` `enlistT` `unlistT` `takeonT` deal with a thing's ItemList subclass.
    - These need the `subjectOf` and `identifier` parameters.
  - `schemaT` `pingT` return Schema, blank things, or just a hello.
### Examples
What follows is a set of example commands. Reading them will give you an idea of how **bones** apps can be consumed by a client (in this case a CLI) - but these calls could be from a website or a desktop program. In **bones** we have wired these calls into a web API written in NodeJs.
These just give you a flavour of the way these commands combine.
Better still... run them, and see what changes. The database for this prototype is simple JSON files in the .data folder of whereever you call them.
- You can run them in groups, or one at a time.
- Run them in order is best.
- `takeupT` is always the entry point. It serves like the "SignUp" page of traditional apps. It's used as in "I'm taking up a hobby/blogging/a lemonade stand" .
- `updateT` `deleteT` permanently change data but there is backup feature described above.
- `readT` `listT` `schemaT` `pingT` commands can be run at any time.
- `enlistT` `unlistT` are non destructive. Each reverses the state left by the other.
- `takeonT` is a shortcut to _takeupT_+_enlistT_. It's like "take onboard".
The imaginary scenario below - being engaged and listed, iteratively **the elioWay** - is whimsical in nature. It's not meant to be a useful app: only demonstrate how data for apps can be created and edited using **bones**.
```bash
### In the beginning
npm run bones -- takeupT creation --mainEntityOfPage=EntryPoint
npm run bones -- readT creation
# Just see the properties and values of a thing's subclass.
npm run bones -- readT creation --sameAs=Intangible
npm run bones -- readT creation --sameAs=EntryPoint
npm run bones -- readT creation --sameAs=ItemList
# Update direct and subclassed properties.
# NB: Here we turn a property into an engagable app.
npm run bones -- updateT creation
  --actionStatus=PotentialActionStatus
  --potentialAction.identifier=createGod
  --potentialAction.mainEntityOfPage=Action
npm run bones -- readT creation
# todo npm run bones -- readT creation
#  --sameAs=-ItemList,-EntryPoint
# todo npm run bones -- creation takeonT god
### Let there be a god
# Building a list by adding new things.
npm run bones -- takeonT creation god
  --mainEntityOfPage=Person
  --disambiguatingDescription="there is a god"
# Update direct and subclassed properties.
# NB Here we are engaging something in the list (iterate)
npm run bones -- updateT god
  --name="Yahwah"
  --Intangible.name="The Mysterious One"
npm run bones -- listT creation
npm run bones -- readT god
npm run bones -- listT god
### God gets to work
# Building a list by adding existing things. Semantically `god enlistT creation`.
npm run bones -- enlistT god creation
# Building a list by new things.
npm run bones -- takeonT god lucifer
  --mainEntityOfPage=Person
  --disambiguatingDescription="god created d'evil"
npm run bones -- takeonT god eve
  --mainEntityOfPage=Person
  --disambiguatingDescription="god created eve"
npm run bones -- takeonT god adam
  --mainEntityOfPage=Person
  --disambiguatingDescription="god created adam"
npm run bones -- readT god
npm run bones -- listT god
### A few days later...
# Just remove something from the list, but it isn't deleted.
npm run bones -- unlistT god lucifer
npm run bones -- listT god
### A fall from grace
# NB Here we are another level down. There is no restriction to levels because apps are driven by units of data.
npm run bones -- takeonT lucifer snake
  --mainEntityOfPage=Thing
  --disambiguatingDescription="lucifer used a snake"
npm run bones -- updateT snake
  --alternateName=Sneaky
  --description="first talking snake"
# NB 4th level
npm run bones -- enlistT snake eve
npm run bones -- readT snake
npm run bones -- listT snake
# NB That's it. We've already seen examples of all the commands, but one.
# But we'll play it out. I like to copy and paste this whole script into the terminal as a test.
npm run bones -- updateT eve
  --alternateName=Tempted
  --description="the snake tempted eve"
npm run bones -- enlistT eve adam
npm run bones -- updateT adam
--alternateName=Seduced
--description="eve seduced adam"
npm run bones -- listT god
### The snake get away with it
npm run bones -- unlistT god snake
npm run bones -- updateT snake
  --description="snake got away"
npm run bones -- listT god
### God blames the victims
# NB: Record deleted, from DB.
npm run bones -- deleteT adam
# This won't work: adam is deleted.
npm run bones -- updateT adam
  --potentialAction="kicked out the garden"
# This will work: remnants of adam remain in the parent record .
npm run bones -- updateT adam
  --potentialAction="kicked out the garden"
  --subjectOf=god
# All commands to edit remnant data must include the parent identifier "subjectOf".
npm run bones -- takeonT adam sin
  --mainEntityOfPage=Person
  --disambiguatingDescription="adam sinned"
  --subjectOf=god
npm run bones -- listT adam
  --subjectOf=god
# NB: Permanent deletion of record, and remnant in parent record.
npm run bones -- deleteT eve
npm run bones -- unlistT god eve
npm run bones -- listT god
```
