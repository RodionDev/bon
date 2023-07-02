"use strict"
const { Router } = require("express")
const isTypeT = require("../back/isTypeT")
const permitTo = require("../back/permitTo")
const allT = require("./allT")
const createT = require("./createT")
const deleteT = require("./deleteT")
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
    permitTo("get", T),
    getT(T)
  )
  crudRouter.get(
    "/:engage/:_id/list/",
    engageT(T),
    permitTo("get", T),
    listT(T)
  )
  crudRouter.get(
    "/:engage/:_id/listof/:T/",
    engageT(T),
    permitTo("get", T),
    listT(T)
  )
  crudRouter.post(
    "/:engage/:_id/:T/",
    engageT(T),
    isTypeT(T),
    permitTo("create", T),
    createT(T)
  )
  crudRouter.patch(
    "/:engage/:_id/",
    engageT(T),
    isTypeT(T),
    permitTo("update", T),
    updateT(T)
  )
  crudRouter.delete(
    "/:engage/:_id/",
    engageT(T),
    isTypeT(T),
    permitTo("delete", T),
    deleteT(T)
  )
  return crudRouter
}
