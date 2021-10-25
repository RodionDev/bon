"use strict"
const express = require("express");
const router = express.Router();
router.route("/:thing")
  .post((req, res) => {
    var Thing = require(`../models/${req.params.thing}`);
    const thing = new Thing(req.body);
    Thing.create(req.body)
      .then(function(thing) {
        return res.json({
          _id: thing._id,
          message: `${thing.name} created`
        });
      })
      .catch(function(err) {
        if (err.code == 11000) {
          return res.json({
            message: "A record with this alternative name already exists."
          });
        }
        return res.send(err);
      });
  })
  .get((req, res) => {
    var Thing = require(`../models/${req.params.thing}`);
    Thing.find({}).sort({
        created: -1
      })
      .exec((err, thing) => {
        if (err) {
          return res.send(err);
        }
        return res.json(thing);
      });
  })
router.route("/:thing/:id")
  .get((req, res) => {
    var Thing = require(`../models/${req.params.thing}`);
    Thing.findById(req.params.id, (err, task) => {
      if (err) {
        return res.send(err);
      }
      return res.json(task);
    });
  })
  .put((req, res) => {
    var Thing = require(`../models/${req.params.thing}`);
    Thing.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        message: "Thing updated successfully"
      });
    });
  })
  .delete((req, res) => {
    var Thing = require(`../models/${req.params.thing}`);
    Thing.remove({
      _id: req.params.id
    }, (err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        message: "Thing has been removed!"
      });
    });
  });
module.exports = router;
