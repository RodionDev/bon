"use strict"
const { Router } = require("express")
const ThingModel = require("../ThingModel")
const loginT = require("../crudities/loginT")
const logoutT = require("../crudities/logoutT")
const signupT = require("../crudities/signupT")
const authRouter = Router()
authRouter.post("/login", loginT(ThingModel))
authRouter.get("/logout", logoutT(ThingModel)) 
authRouter.post("/:engage/signup", signupT(ThingModel))
module.exports = authRouter
