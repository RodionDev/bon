'use strict'
const exoSkeleton = require('./exoskeletons/' + process.env['EXOSKELETON'])
exports.schema = function(req, res) {
  exoSkeleton.anatomyOf('GET', req, res, function(req, res, Thing, meta) {
    res.send(exoSkeleton.metaOf(meta))
  })
}
exports.list_all_things = function(req, res) {
  exoSkeleton.anatomyOf('GET', req, res, function(req, res, Thing, meta) {
    Thing.find({}, function(err, things) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.listOutOf(meta, things))
      }
    })
  })
}
exports.create_a_thing = function(req, res) {
  exoSkeleton.anatomyOf('POST', req, res, function(req, res, Thing, meta) {
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
        res.send(exoSkeleton.outOf(meta, thing))
      }
    })
  })
}
exports.read_a_thing = function(req, res) {
  exoSkeleton.anatomyOf('GET', req, res, function(req, res, Thing, meta) {
    Thing.findById(req.params.thingId, function(err, thing) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.outOf(meta, thing))
      }
    })
  })
}
exports.update_a_thing = function(req, res) {
  exoSkeleton.anatomyOf('PUT', req, res, function(req, res, Thing, meta) {
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
        res.send(exoSkeleton.outOf(meta, thing))
      }
    })
  })
}
exports.delete_a_thing = function(req, res) {
  exoSkeleton.anatomyOf('DELETE', req, res, function(req, res, Thing, meta) {
    Thing.remove({
      _id: req.params.thingId
    }, function(err, thing) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.deleteOf(meta, thing))
      }
    })
  })
}
