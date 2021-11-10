'use strict'
module.exports = function (app) {
  var controller = require('./controller')
  app.route('/engage/:thing')
    .get(controller.list_all_things)
    .post(controller.create_a_thing)
  app.route('/engage/:thing/:thingId')
    .get(controller.read_a_thing)
    .put(controller.update_a_thing)
    .delete(controller.delete_a_thing)
}
