'use strict';
require('./configs/database');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json());
app.use('/api', require('./routes/thing'));
const port = parseInt(process.env.PORT, 10) || 3000;
const server = app.listen(port, () => {
  console.log(`App is running at: http:
});
