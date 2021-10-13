"use strict"
const express = require("express");
const Thing = require("../models/thing");
const router = express.Router();
router.route("/things")
  .post((req, res) => {
    const thing = new Thing({
      name: req.body.name,
        alternateName: req.body.alternateName,
      description: req.body.description,
      disambiguatingDescription: req.body.disambiguatingDescription,
      engaged: req.body.engaged
    });
    thing.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        message: "New thing created!"
      });
    });
  })
  .get((req, res) => {
    Thing.find({}).sort({
        created: -1
      })
      .exec((err, task) => {
        if (err) {
          return res.send(err);
        }
        return res.json(task);
      });
  })
router.route("/thing/:id")
  .get((req, res) => {
    Thing.findById(req.params.id, (err, task) => {
      if (err) {
        return res.send(err);
      }
      return res.json(task);
    });
  })
  .put((req, res) => {
   Thing.findByIdAndUpdate(req.params.id, {
     name: req.body.name,
       alternateName: req.body.name,
     description: req.body.description,
     disambiguatingDescription: req.body.disambiguatingDescription,
     engaged: req.body.engaged
   }, (err) => {
     if (err){
       return res.send(err);
     }
     return res.json({ message: "Thing updated successfully" });
   });
 })
  .delete((req, res) => {
    Thing.remove({ _id: req.params.id }, (err) => {
      if (err){
        return res.send(err);
      }
      return res.json({ message: "Thing has been removed!" });
    });
  });
module.exports = router;
