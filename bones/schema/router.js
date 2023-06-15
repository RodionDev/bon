"use strict"
const { Router } = require("express")
const schemaT = require("../crudities/schemaT")
let routerSchema = Router()
routerSchema.get(`/:engage`, schemaT())
module.exports = routerSchema
