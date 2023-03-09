'use strict'
let exoSkeletonPath = './exoskeletons/' + process.env['EXOSKELETON']
const exoSkeleton = require(exoSkeletonPath)
function errHandler(err, res, meta) {
  if (err.code === 11000) {
    res.status(409).send(exoSkeleton.errorOf(meta, err.message))
  } else if (err.kind === 'ObjectId') {
    res.status(404).send(exoSkeleton.errorOf(meta, err.message))
  } else {
    res.status(400).send(exoSkeleton.errorOf(meta, err.message))
  }
}
exports.schema = function(req, res) {
  exoSkeleton.thenMongoose('GET', req, res, function(req, res, Thing, meta) {
    res.send(exoSkeleton.metaOf(meta))
  })
}
exports.list_all_things = function(req, res) {
  exoSkeleton.thenMongoose('GET', req, res, function(req, res, Thing, meta) {
    Thing.find().then(things => {
      res.send(exoSkeleton.listOutOf(meta, things))
    })
  })
}
exports.read_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('GET', req, res, function(req, res, Thing, meta) {
    Thing.findById(req.params.thingId)
      .then(thing => {
        res.send(exoSkeleton.outOf(meta, thing))
      })
      .catch(err => {
        errHandler(err, res, meta)
      })
  })
}
exports.create_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('POST', req, res, function(req, res, Thing, meta) {
    let acquireThingsData = exoSkeleton.acquire(req)
    let newThing = new Thing(acquireThingsData)
    newThing
      .save()
      .then(thing => {
        res.send(exoSkeleton.outOf(meta, thing))
      })
      .catch(err => {
        errHandler(err, res, meta)
      })
  })
}
exports.update_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('PATCH', req, res, function(req, res, Thing, meta) {
    Thing.findOneAndUpdate(
      {
        _id: req.params.thingId,
      },
      exoSkeleton.acquire(req),
      {
        new: true,
      },
    )
      .then(thing => {
        thing.save().then(thing => {
          res.send(exoSkeleton.outOf(meta, thing))
        })        
      })
      .catch(err => {
        errHandler(err, res, meta)
      })
  })
}
exports.delete_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('DELETE', req, res, function(req, res, Thing, meta) {
    Thing.deleteOne({
      _id: req.params.thingId,
    })
      .then(thing => {
        res.send(exoSkeleton.deleteOf(meta, thing))
      })
      .catch(err => {
        errHandler(err, res, meta)
      })
  })
}
