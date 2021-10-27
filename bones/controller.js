"use strict";
var mongoose = require("mongoose");
require("./models/thing");
var Thing = mongoose.model("thing");
exports.list_all_things = function(req, res) {
  Thing.find({}, function(err, thing) {
    if (err)
      res.send(err);
    res.json(thing);
  });
};
exports.create_a_thing = function(req, res) {
  var new_thing = new Thing(req.body);
  new_thing.save(function(err, thing) {
    if (err)
      res.send(err);
    res.json(thing);
  });
};
exports.read_a_thing = function(req, res) {
  Thing.findById(req.params.thingId, function(err, thing) {
    if (err)
      res.send(err);
    res.json(thing);
  });
};
exports.update_a_thing = function(req, res) {
  Thing.findOneAndUpdate({
    _id: req.params.thingId
  }, req.body, {
    new: true
  }, function(err, thing) {
    if (err)
      res.send(err);
    res.json(thing);
  });
};
exports.delete_a_thing = function(req, res) {
  Thing.remove({
    _id: req.params.thingId
  }, function(err, thing) {
    if (err)
      res.send(err);
    res.json({
      message: "Thing successfully deleted"
    });
  });
};
