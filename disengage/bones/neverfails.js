"use strict"
require("dotenv").config()
const { PORT } = process.env
const express = require("express")
const app = express()
app.get("/", (req, res) => res.send("It never fails."))
app.listen(PORT, () =>
  console.log(`It never fails from listening on port ${PORT}!`)
)
