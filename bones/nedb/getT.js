"use strict"
module.exports = Thing => {
  return async (req, res) => {
    console.log(
      { ______GET______: "res.locals.engagedThing" },
      res.locals.engagedThing
    )
    res.status(200).send(res.locals.engagedThing)
  }
}
