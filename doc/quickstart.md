# Quickstart bones
- [bones Prerequisites](/eliobones/bones/prerequisites.html)
- [Installing bones](/eliobones/bones/installing.html)
## Nutshell
- Config
- Command Overview
- Playtime
## Config
By default, **bones** CLI uses **dbhell-bones**, an inhouse, file-system, NodeJS database which will save every record (pretty printed) as a separate JSON file relative to the directory where you issue the CLI commands. This makes it ideal for development and testing - you can easily review every change by opening these files in a text editor.
You can specify a root directory for that data by adding it to a `.env` file in the same folder where you issue your CLI commands.
```
DATADIR=./.appdata/quickstart/
```
```bash
# Preserve test data
set NOW $(date +%Y%m%d%H%M%S)
mv $DATADIR $DATADIR_$NOW
# or just clear any test data
rm -rf $DATADIR
```
## Command Overview
`<runtimeBones> <ribName> [<params>] [--propNames=propValues]`
Breakdown:
- What you write (to call the **bones** CLI on your command line) depends on context.
  - Use **`npm run bones --`** `<ribName> ...` inside the **bones** directory. You'll usually be doing this testing or developing the library. _NB: The `--` part is required by **npm** to pass your args into the `run` architecture._
  - Use just **`bones`** `<ribName> ...` when **bones** is in the `$PATH` of your computer system after installing using **npm**.
- **ribName**'s are all equal. They perform one common operation on the **engaged** "thing", or "things" in its **list**, from start to finish. They take the same parameters in the same order. There aren't many because of the iterative data structure.
  It helps to group them mentally like this:
  - `takeupT` `updateT` `readT` `destroyT` affect a thing's direct or subclassed properties.
    - These require the `identifier` parameter.
    - `identifier` is the only required field.
  - `listT` `enlistT` `unlistT` `takeonT` deal with a thing's ItemList subclass.
    - These need the `subjectOf` and `identifier` parameters.
  - `schemaT` `pingT` return Schema, blank things, or just a hello.
Notes:
- `takeupT` is always the entry point. It serves like the "SignUp" page of traditional apps. It's used as in "I'm taking up a hobby/blogging/a lemonade stand" .
- `updateT` `destroyT` permanently change data (but there is backup feature because **bones** won't remove it from its internal list until you `unlist`).
- `readT` `listT` `schemaT` `pingT` commands can be run at any time.
- `enlistT` `unlistT` are non destructive. Each reverses the state left by the other.
- `takeonT` is a shortcut to _takeupT_+_enlistT_. It's like "take onboard".
## Playtime
```bash
git clone https://gitlab.com/eliobones/bones.git
cd bones
npm i
npm run bones -- pingT
npm run bones -- takeupT shoppinglist --mainEntityOfPage=ItemList --name="Today's Shopping List" --alternateName="Don't forget the milk!"
thing Action --schema
[
  "FailedActionStatus",
  "CompletedActionStatus",
  "ActiveActionStatus",
  "PotentialActionStatus"
]
set Potential --mainEntityOfPage=Action --Action.actionStatus=PotentialActionStatus
npm run bones -- takeonT shoppinglist bread $POTENTIALACTION
npm run bones -- takeonT shoppinglist eggs $POTENTIALACTION
npm run bones -- takeonT shoppinglist cheese $POTENTIALACTION
npm run bones -- takeonT shoppinglist milk $POTENTIALACTION
```
Run 1 at a time, or in suggested groupings.
```
npm run bones -- pingT
npm run bones -- takeupT shopping --name="Today's Shopping List" --alternateName="Don't forget the milk"
npm run bones -- takeonT shopping milk  --mainEntityOfPage=Action  --Action.actionStatus=PotentialActionStatus
npm run bones -- takeonT shopping honey  --mainEntityOfPage=Action
npm run bones -- updateT honey --Action.actionStatus=PotentialActionStatus
npm run bones -- readT shopping
npm run bones -- listT shopping
npm run bones -- updateT honey --Action.actionStatus=CompletedActionStatus
npm run bones -- listT shopping
npm run bones -- unlistT shopping milk
npm run bones -- listT shopping
npm run bones -- enlistT shopping milk
npm run bones -- listT shopping
npm run bones -- destroyT milk
npm run bones -- listT shopping
npm run bones -- unlistT shopping milk
npm run bones -- listT shopping
npm run bones -- unlistT shopping milk
npm run bones -- listT shopping
npm run bones -- enlistT shopping milk
npm run bones -- optimizeT shopping
npm run bones -- takeonT shopping milk  --mainEntityOfPage=Action  --Action.actionStatus=CompletedActionStatus
npm run bones -- optimizeT shopping
for D in sugar biscuits banana thoseCrispsYouLike
   mkdir -p $D
   echo '{ "identifier": "'$D'" }' > ./$D/thing.json
end
npm run bones -- inflateT shopping
```
