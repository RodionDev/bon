const should = require("chai").should()
var _ = require("lodash")
var objCompare = require("../src/objCompare")
var { isNil, omitBy, set } = _
const validObj = obj => Object.keys(obj).length && obj
const itemToBool = item =>
  typeof item !== "object" || item === null ? item : validObj(clean(item))
const clean = obj =>
  validObj(
    Array.isArray(obj)
      ? obj.map(itemToBool).filter(Boolean)
      : Object.entries(obj).reduce((a, [key, val]) => {
          const newVal = itemToBool(val)
          if (newVal) a[key] = newVal
          return a
        }, {})
  )
describe("objCompare | Loggable Changes", () => {
  new Array(
    [{ a: 1, b: 2 }, { a: 1, b: 1 }, [{ after: 1, before: 2, key: ["b"] }]],
    [
      { c: { z: 26, y: 25 } },
      { c: { z: 26, y: 26 } },
      [{ after: 26, before: 25, key: ["c", "y"] }],
    ],
    [
      { e: { f: { g: 7, h: 8 } } },
      { e: { f: { g: 8, h: 8 } } },
      [{ after: 8, before: 7, key: ["e", "f", "g"] }],
    ],
    [
      { i: { j: [7, 6, 5, 4, 3] } },
      { i: { j: [1, 2, 3, 4] } },
      [
        { key: ["i", "j", 0], before: 7, after: 1 },
        { key: ["i", "j", 1], before: 6, after: 2 },
        { key: ["i", "j", 2], before: 5, after: 3 },
        { key: ["i", "j", 4], before: 3, after: null },
      ],
    ],
    [
      { k: [{ l: 12 }, { m: 13 }, { n: 14 }, { o: 15 }] },
      { k: [{ n: 14 }, { m: 12 }, { o: 15 }, { p: 16 }] },
      [
        { key: ["k", 0, "l"], before: 12, after: null },
        { key: ["k", 0, "n"], before: null, after: 14 },
        { key: ["k", 1, "m"], before: 13, after: 12 },
        { key: ["k", 2, "n"], before: 14, after: null },
        { key: ["k", 2, "o"], before: null, after: 15 },
        { key: ["k", 3, "o"], before: 15, after: null },
        { key: ["k", 3, "p"], before: null, after: 16 },
      ],
    ]
  ).forEach(([obj1, obj2, expectDiff]) => {
    it(`gets the diff between ${JSON.stringify(obj1)} and ${JSON.stringify(
      obj2
    )}`, () => objCompare(obj1, obj2).should.eql(expectDiff))
  })
})
describe("_.set | Undoable Changes", () => {
  new Array(
    [
      { i: { j: [7, 6, 5, 4, 3] } },
      { i: { j: [1, 2, 3, 4] } },
      [
        { key: ["i", "j", 0], before: 7, after: 1 },
        { key: ["i", "j", 1], before: 6, after: 2 },
        { key: ["i", "j", 2], before: 5, after: 3 },
        { key: ["i", "j", 4], before: 3, after: null },
      ],
    ],
    [
      { k: [{ l: 12 }, { m: 13 }, { n: 14 }, { o: 15 }] },
      { k: [{ n: 14 }, { m: 12 }, { o: 15 }, { p: 16 }] },
      [
        { key: ["k", 0, "l"], before: 12, after: null },
        { key: ["k", 0, "n"], before: null, after: 14 },
        { key: ["k", 1, "m"], before: 13, after: 12 },
        { key: ["k", 2, "n"], before: 14, after: null },
        { key: ["k", 2, "o"], before: null, after: 15 },
        { key: ["k", 3, "o"], before: 15, after: null },
        { key: ["k", 3, "p"], before: null, after: 16 },
      ],
    ]
  ).forEach(([obj1, obj2, diffs]) => {
    it(`redo the diff from ${JSON.stringify(obj1)} to ${JSON.stringify(
      obj2
    )}`, () => {
      diffs.forEach(({ key, before, after }) => {
        set(obj1, key, after)
      })
      clean(obj1).should.eql(obj2)
    })
  })
})
