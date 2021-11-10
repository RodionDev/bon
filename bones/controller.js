'use strict'
exports.list_all_things = function (req, res) {
  var Thing = require(`./models/${req.params.thing}`)
  Thing.find({}, function (err, thing) {
    if (err) { res.send(err) }
    res.json(thing)
  })
}
exports.create_a_thing = function (req, res) {
  var Thing = require(`./models/${req.params.thing}`)
  var newThing = new Thing(req.body)
  newThing.save(function (err, thing) {
    if (err) {
      if (err.code === 11000) {
        return res.json({
          message: 'A record with this alternative name already exists.'
        })
      } else {
        res.send(err)
      }
    }
    var j = res.json(thing)
    return j
  })
}
exports.read_a_thing = function (req, res) {
  var Thing = require(`./models/${req.params.thing}`)
  Thing.findById(req.params.thingId, function (err, thing) {
    if (err) { res.send(err) }
    res.json(thing)
  })
}
exports.update_a_thing = function (req, res) {
  var Thing = require(`./models/${req.params.thing}`)
  Thing.findOneAndUpdate({
    _id: req.params.thingId
  }, req.body, {
    new: true
  }, function (err, thing) {
    if (err) { res.send(err) }
    res.json(thing)
  })
}
exports.delete_a_thing = function (req, res) {
  var Thing = require(`./models/${req.params.thing}`)
  Thing.remove({
    _id: req.params.thingId
  }, function (err, thing) {
    if (err) { res.send(err) }
    res.json({
      message: 'Thing successfully deleted'
    })
  })
}
