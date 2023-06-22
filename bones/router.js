"use strict"
const { Router } = require("express")
const ThingModel = require("./Thing.json")
const crudify = require("./crudify")
const settings = require("./settings")
let apiRouter = Router()
apiRouter.use("", settings.guard(ThingModel), crudify(ThingModel))
module.exports = apiRouter
