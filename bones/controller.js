'use strict'
var japiofy = require('../lib/japiofy')
var schemaVer = 'ThingOnAShoeString'
var makeSafe = function (res, method) {
  res.setHeader('Access-Control-Allow-Origin', 'http:
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', method)
  return res
}
var schemaRoots = function (req) {
  let schemaThing = req.params.thing
  if (schemaThing.endsWith('s')) {
    schemaThing = schemaThing.slice(0, -1)
  }
  return schemaThing.charAt(0).toUpperCase() + schemaThing.slice(1)
}
exports.schema = function (req, res) {
  res = makeSafe(res, 'GET')
  var schemaThing = schemaRoots(req)
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${schemaThing}`)
  res.send({
    jsonapi: {
      version: '1.0',
      server: 'bones'
    },
    meta: Thing.schema.paths
  })
  console.log('request: schema')
}
exports.list_all_things = function (req, res) {
  res = makeSafe(res, 'GET')
  var schemaThing = schemaRoots(req)
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${schemaThing}`)
  Thing.find({}, function (err, things) {
    if (err) {
      res.send({
        error: err
      })
    } else {
      res.send({
        data: japiofy.jsonApiOrgifyList(things, schemaThing)
      })
    }
  })
  console.log(`request: list_all_things type ${schemaThing}`)
}
exports.create_a_thing = function (req, res) {
  res = makeSafe(res, 'POST')
  var schemaThing = schemaRoots(req)
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${schemaThing}`)
  let newThing = new Thing(req.body)
  newThing.save(function (err, thing) {
    if (err) {
      if (err.code === 11000) {
        return res.json({
          data: 'A record with this alternative name already exists.'
        })
      } else {
        console.log(err)
        res.send({
          error: err
        })
      }
    } else {
      res.send({
        data: thing
      })
    }
  })
  console.log('request: create_a_thing')
}
exports.read_a_thing = function (req, res) {
  res = makeSafe(res, 'GET')
  var schemaThing = schemaRoots(req)
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${schemaThing}`)
  Thing.findById(req.params.thingId, function (err, thing) {
    if (err) {
      res.send({
        error: err
      })
    } else {
      res.send({
        data: thing
      })
    }
  })
  console.log('request: read_a_thing')
}
exports.update_a_thing = function (req, res) {
  res = makeSafe(res, 'PUT')
  var schemaThing = schemaRoots(req)
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${schemaThing}`)
  Thing.findOneAndUpdate({
    _id: req.params.thingId
  }, req.body, {
    new: true
  }, function (err, thing) {
    if (err) {
      res.send({
        error: err
      })
    } else {
      res.send({
        data: thing
      })
    }
  })
  console.log('request: update_a_thing')
}
exports.delete_a_thing = function (req, res) {
  res = makeSafe(res, 'DELETE')
  var schemaThing = schemaRoots(req)
  var Thing = require(`@elioway/spider/schemas/` + schemaVer + `/models/${schemaThing}`)
  Thing.remove({
    _id: req.params.thingId
  }, function (err, thing) {
    if (err) {
      res.send({
        error: err
      })
    } else {
      res.send({
        data: 'Thing successfully deleted'
      })
    }
  })
}
