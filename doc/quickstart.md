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
set NOW $(date +%Y%m%d%H%M%S)
mv $DATADIR $DATADIR_$NOW
# or just clear any test data
rm -rf $DATADIR
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
Notes:
- `takeupT` is always the entry point. It serves like the "SignUp" page of traditional apps. It's used as in "I'm taking up a hobby/blogging/a lemonade stand" .
- `updateT` `deleteT` permanently change data but there is backup feature described above.
- `readT` `listT` `schemaT` `pingT` commands can be run at any time.
- `enlistT` `unlistT` are non destructive. Each reverses the state left by the other.
- `takeonT` is a shortcut to _takeupT_+_enlistT_. It's like "take onboard".
