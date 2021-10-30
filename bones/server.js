"use strict";
require("./database");
const app = require("./app")
const port = parseInt(process.env.PORT, 10) || 3000;
const server = app.listen(port, () => {
  console.log(`App is running at: http:
});
