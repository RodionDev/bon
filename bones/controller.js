'use strict'
let exoSkeletonPath = './exoskeletons/' + process.env['EXOSKELETON']
const exoSkeleton = require(exoSkeletonPath)
exports.schema = function(req, res) {
  exoSkeleton.anatomyOf('GET', req, res, function(req, res, Thing, meta) {
    res.send(exoSkeleton.metaOf(meta))
  })
}
exports.list_all_things = function(req, res) {
  exoSkeleton.anatomyOf('GET', req, res, function(req, res, Thing, meta) {
    Thing.find(function(err, things) {
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
exports.create_a_thing = function(req, res) {
  exoSkeleton.anatomyOf('POST', req, res, function(req, res, Thing, meta) {
    let newThing = new Thing(exoSkeleton.acquire(req))
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
exports.update_a_thing = function(req, res) {
  exoSkeleton.anatomyOf('PATCH', req, res, function(req, res, Thing, meta) {
    Thing.findOneAndUpdate({
      _id: req.params.thingId
    }, exoSkeleton.acquire(req), {
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
    Thing.deleteOne({
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
