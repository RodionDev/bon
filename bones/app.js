"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json());
app.use("/engage", require("./routes/engage"));
module.exports = app;
