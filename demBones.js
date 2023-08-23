const db = require("./node-db/index")
const bones = require("./bones")
const flesh = require("./flesh")
let demBones = [
  [
    ["Dem bones", "dem bones", "dem dry bones"],
    ["Dem bones", "dem bones", "dem dry bones"],
    ["Dem bones", "dem bones", "dem dry bones"],
    "Now hear the word of the Lord",
  ],
  [
    ["toe", "foot"],
    ["foot", "ankle"],
    ["ankle", "leg"],
    "Now hear the word of the Lord",
  ],
  [
    ["leg", "knee"],
    ["knee", "thigh"],
    ["thigh", "hip"],
    "Now hear the word of the Lord",
  ],
  [
    ["hip", "back"],
    ["back", "neck"],
    ["neck", "head"],
    "Now hear the word of the Lord",
  ],
]
bones(
  "takeupT",
  initializeT({
    mainEntityOfPage: "CreativeWork",
    identifier: "dembones",
    name: "Dem Bones",
  }),
  db,
  flesh
)
demBones.forEach((verse, i) => {
  bones(
    "takeonT",
    initializeT({ mainEntityOfPage: "Poem", identifier: "dembones", name: "" }),
    db,
    flesh
  )
  demBones.forEach(verse => {
    verse
  })
})
