/**
* @file Subroute with endpoints to handle JSON.Model cruddy operations, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const crudifyT = require('@elioway/bones/bones/ribs/crudifyT')
let T = {  thing: "Thing" }
let apiRouter = Router()
apiRouter.use(`/Thing`, crudifyT(T))
* ============================================================================ *
*
* @param {JSON.Model} T the Thing JSON Model object.
* @returns {express.Router}
*/
"use strict"
const { Router } = require("express")
const isTypeT = require("../spine/isTypeT")
const permitT = require("../spine/permitT")
const allT = require("./allT")
const createT = require("./createT")
const destroyT = require("./destroyT")
const engageT = require("./engageT")
const getT = require("./getT")
const listT = require("./listT")
const updateT = require("./updateT")

module.exports = T => {
  let crudRouter = Router()
  crudRouter.get("/:engage/", allT(T))
  crudRouter.get(
    "/:engage/:_id/",
    engageT(T),
    isTypeT(T),
    permitT("get", T),
    getT(T)
  )
  crudRouter.get("/:engage/:_id/list/", engageT(T), permitT("get", T), listT(T))
  crudRouter.get(
    "/:engage/:_id/listof/:T/",
    engageT(T),
    permitT("get", T),
    listT(T)
  )
  crudRouter.post(
    "/:engage/:_id/:T/",
    engageT(T),
    isTypeT(T),
    permitT("create", T),
    createT(T)
  )
  crudRouter.patch(
    "/:engage/:_id/",
    engageT(T),
    isTypeT(T),
    permitT("update", T),
    updateT(T)
  )
  crudRouter.delete(
    "/:engage/:_id/",
    engageT(T),
    isTypeT(T),
    permitT("delete", T),
    destroyT(T)
  )
  return crudRouter
}
