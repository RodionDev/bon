# Quickstart wizardT
- [wizardT Prerequisites](/ribs/wizardT/prerequisites.html)
- [Installing wizardT](/ribs/wizardT/installing.html)
## Nutshell
- Demo with a "Make Your Own Adventure" book.
<https://www.projectaon.org/en/Main/Books>
This will really be an "endpoint" router. It means you can easily do **iteration**. This is great for wizards. Each step, like each page in MYOA, delivers a list of "next options". Of course, the user will need to select a specific option, the elioWay, so we make each of those options a friendly word for the address of the "adventure" in the novel.
Same as a wizard. Present a Thing and a list of Options. Each Option is a Thing which has options. In a MYOA we don't need to store the "route" you took.. but in a wizard we must. How do we do that?
Not in a "shared global variable" kind of way, that's for sure... with some kind of master function controlling and getting the results of the iteration...
No... each time you **engage** a `WizardThing`, and select a step from its **list**, you can add your selection to the `WizardThing`s **list** and "save" it (remember elioBones are db agnostic... you could be storing inmemory but the app believes it to be permanent).
```
{ identifier: "freds-timestamped-choice"thing , subjectOf: {StepChosen.identifier} }
```
Now you can visit any `StepThing` and find out what they chose.
See?
In the elioWay we have apps for reasons. An app which stores wizard choices, and a different app to process them.
