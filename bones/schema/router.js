"use strict"
const { Router } = require("express")
const schemaT = require("../ribs/schemaT")
let routerSchema = Router()
routerSchema.get(`/:engage`, schemaT())
module.exports = routerSchema
