"use strict"
const { Router } = require("express")
const ThingModel = require("./Thing.json")
const ribs = require("./ribs/crudify")
const settings = require("./settings")
let apiRouter = Router()
apiRouter.use("", settings.guard(ThingModel), ribs(ThingModel))
module.exports = apiRouter
