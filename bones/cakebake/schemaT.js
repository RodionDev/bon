/**
* @file Express Route POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const schemaT = require('@elioway/JSON-bones/bones/crudities/schemaT')

let routerSchema = Router()
routerSchema.get('/', schemaT())

let apiRouter = Router()
apiRouter.use(`/:engage`, metaRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const fs = require("fs")

const ThingBuilder = require("@elioway/thing")
const {
  getSchema,
  schemaDomainUrl,
} = require("@elioway/thing/utils/get-schema")
const sanitizeOptions = require("../utils/sanitize-options")
const settings = require("../settings")

module.exports = () => {
  return async (req, res) => {
    // console.log({ schemaT: 'req' }, req)
    // console.log({ schemaT: "reqBody" }, req.body)
    // console.log({ schemaT: "reqParams" }, req.params)
    let thingType = req.params.engage
    let thingBuilder = new ThingBuilder(
      "9.0/schemaorg-all-http",
      schemaDomainUrl
    )
    let things = thingBuilder.things([thingType], sanitizeOptions(req.query))
    let schemedT = things[thingType]
    // let thinner = Object.keys(settings.slim)
    //   .filter(skimkey => skimkey !== "_id")
    //   .reduce(function (acc, slimkey) {
    //     if (schemedT[slimkey]) {
    //       acc[slimkey] = schemedT[slimkey]
    //     }
    //     return acc
    //   }, {})
    // console.log({ schemaT: "thinner" }, thinner)
    res.send(schemedT)
  }
}
