"use strict"
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const routerApi = require("./router")
const routerAuth = require("./auth/router")
const routerSchema = require("./schema/router")
const app = express()
app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
app.use("/auth", routerAuth)
app.use("/schema", routerSchema)
app.use("/", routerApi)
module.exports = app
