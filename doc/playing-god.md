# Playing GOD
What follows is a set of example commands. Reading them will give you an idea of how **bones** apps can be consumed by a client (in this case a CLI) - but these calls could be from a website or a desktop program. In **bones** we have wired these calls into a web API written in NodeJs.
The imaginary scenario below - telling the story of a "Paradise Lost"-like biblical version Genesis with characters being _engaged_ and _listed_, _iteratively_ **the elioWay** - is whimsical in nature. It's not meant to be a useful app: only demonstrate how data operatations work in **elioBones**. These just give you a flavour of the way these commands combine.
Run them, and see what changes. The database for this prototype are simple, pretty print JSON files in the `.env`'s `$DATADIR` directory - just open them in your IDE.
- You can run commands in groups, or one at a time.
- Run them in order is best, the first time...
- ...but as you get used to it, rearrange the creation order for fun. See if you can get a positive `optimizeT` by creating eve first! What if adam tempted the snake to eat eve?
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
npm run bones -- destroyT adam
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
npm run bones -- destroyT eve
npm run bones -- unlistT god eve
npm run bones -- listT god
```
