'use strict'
var schemaVer = 'ThingOnAString'
var makeSafe = function(res) {
  res.setHeader('Access-Control-Allow-Origin', 'http:
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  return res
}
exports.schema = function(req, res) {
    res = makeSafe(res)
    res.header('Access-Control-Allow-Methods', 'GET')
    var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${req.params.thing}`)
    res.json(Thing.schema.paths)
  }
exports.list_all_things = function(req, res) {
  res = makeSafe(res)
  res.header('Access-Control-Allow-Methods', 'GET')
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${req.params.thing}`)
  Thing.find({}, function(err, thing) {
    if (err) {
      res.send(err)
    }
    res.json(thing)
  })
}
exports.create_a_thing = function(req, res) {
  res = makeSafe(res)
  res.header('Access-Control-Allow-Methods', 'POST')
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${req.params.thing}`)
  let newThing = new Thing(req.body)
  newThing.save(function(err, thing) {
    if (err) {
      if (err.code === 11000) {
        return res.json({
          message: 'A record with this alternative name already exists.'
        })
      } else {
        console.log(err)
        res.send(err)
      }
    }
    var j = res.json(thing)
    return j
  })
}
exports.read_a_thing = function(req, res) {
  res = makeSafe(res)
  res.header('Access-Control-Allow-Methods', 'GET')
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${req.params.thing}`)
  Thing.findById(req.params.thingId, function(err, thing) {
    if (err) {
      res.send(err)
    }
    res.json(thing)
  })
}
exports.update_a_thing = function(req, res) {
  res = makeSafe(res)
  res.header('Access-Control-Allow-Methods', 'PUT')
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${req.params.thing}`)
  Thing.findOneAndUpdate({
    _id: req.params.thingId
  }, req.body, {
    new: true
  }, function(err, thing) {
    if (err) {
      res.send(err)
    }
    res.json(thing)
  })
}
exports.delete_a_thing = function(req, res) {
  res = makeSafe(res)
  res.header('Access-Control-Allow-Methods', 'DELETE')
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${req.params.thing}`)
  Thing.remove({
    _id: req.params.thingId
  }, function(err, thing) {
    if (err) {
      res.send(err)
    }
    res.json({
      message: 'Thing successfully deleted'
    })
  })
}
