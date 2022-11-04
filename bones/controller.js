'use strict'
const exoSkeleton = require('./skeleton')
var makeSafe = function(res, method) {
  res.setHeader('Access-Control-Allow-Origin', 'http:
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', method)
  return res
}
var schemaRoots = function(req) {
  let schemaName = req.params.thing
  if (schemaName.endsWith('s')) {
    schemaName = schemaName.slice(0, -1)
  }
  return schemaName.charAt(0).toUpperCase() + schemaName.slice(1)
}
exports.schema = function(req, res) {
  let endoSkeleton = `@elioway/spider/endoskeletons/` + process.env['ENDOSKELETON'] + `/models`
  console.log('BONES.controller: endoSkeleton: ' + endoSkeleton)
  res = makeSafe(res, 'GET')
  var schemaName = schemaRoots(req)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  res.send(exoSkeleton.metaOf(Thing))
}
exports.list_all_things = function(req, res) {
  let endoSkeleton = `@elioway/spider/endoskeletons/` + process.env['ENDOSKELETON'] + `/models`
  console.log('BONES.controller: endoSkeleton: ' + endoSkeleton)
  res = makeSafe(res, 'GET')
  var schemaName = schemaRoots(req)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  Thing.find({}, function(err, things) {
    if (err) {
      res.send({
        errors: [err]
      })
    } else {
      res.send(exoSkeleton.listOutOf(Thing, things, schemaName))
    }
  })
}
exports.create_a_thing = function(req, res) {
  res = makeSafe(res, 'POST')
  var schemaName = schemaRoots(req)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  let newThing = new Thing(req.body)
  newThing.save(function(err, thing) {
    if (err) {
      if (err.code === 11000) {
        return res.json({
          errors: ['A record with this alternative name already exists.'],
        })
      } else {
        res.send({
          errors: [err]
        })
      }
    } else {
      res.send(exoSkeleton.outOf(Thing, thing, schemaName))
    }
  })
}
exports.read_a_thing = function(req, res) {
  res = makeSafe(res, 'GET')
  var schemaName = schemaRoots(req)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  Thing.findById(req.params.thingId, function(err, thing) {
    if (err) {
      res.send({
        errors: [err]
      })
    } else {
      res.send(exoSkeleton.outOf(Thing, thing, schemaName))
    }
  })
}
exports.update_a_thing = function(req, res) {
  res = makeSafe(res, 'PUT')
  var schemaName = schemaRoots(req)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  Thing.findOneAndUpdate({
    _id: req.params.thingId
  }, req.body, {
    new: true
  }, function(err, thing) {
    if (err) {
      res.send({
        errors: [err]
      })
    } else {
      res.send(exoSkeleton.outOf(Thing, thing, schemaName))
    }
  })
}
exports.delete_a_thing = function(req, res) {
  res = makeSafe(res, 'DELETE')
  var schemaName = schemaRoots(req)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  Thing.remove({
    _id: req.params.thingId
  }, function(err, thing) {
    if (err) {
      res.send({
        errors: [err]
      })
    } else {
      res.send(exoSkeleton.deleteOf(Thing))
    }
  })
}
