"use strict"
const { Router } = require("express")
const ThingModel = require("../Thing.json")
const loginT = require("../ribs/loginT")
const logoutT = require("../ribs/logoutT")
const signupT = require("../ribs/signupT")
const authRouter = Router()
authRouter.post("/login", loginT(ThingModel))
authRouter.get("/logout", logoutT(ThingModel)) 
authRouter.post("/:engage/signup", signupT(ThingModel))
module.exports = authRouter
