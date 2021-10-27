"use strict";
module.exports = function(app) {
  var engage = require("../controller");
  app.route("/engage/thing")
    .get(engage.list_all_things)
    .post(engage.create_a_thing);
  app.route("/engage/thing/:thingId")
    .get(engage.read_a_thing)
    .put(engage.update_a_thing)
    .delete(engage.delete_a_thing);
};
