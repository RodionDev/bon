"use strict"
const Cakebase = require('cakebase')("../database.json");
Cakebase.set({ id: 0, email: "..." });
const rows = Cakebase.get(e => e.email === "...");
Cakebase.remove(rows);
Cakebase.update(e => e.id === "e1fe3...", { email: "..." });
Cakebase.clear();
const Cakebase = require('cakebase')("../database.json");
var things = new Datastore();
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")
module.exports = Thing => {
  return async (req, res) => {
   res.status(200).send(Cakebase.getAll())
  }
}
