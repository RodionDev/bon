'use strict'
const express = require('express');
const Thing = require('../models/thing');
const router = express.Router();
router.route('/thing')
  .post((req, res) => {
    const thing = new Thing({
      name: req.body.name,
      description: req.body.description
    });
    thing.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        message: 'New thing created!'
      });
    });
  })
  .get((req, res) => {
    res.send('You need to do post.');
  });
module.exports = router;
