"use strict"
require("dotenv").config()
const { PORT } = process.env
const bones = require("./app")
const start = async () => {
  bones.on("error", e => {
    if (e.code === "EADDRINUSE") {
      console.log("Address in use, retrying...")
      setTimeout(() => {
        server.close()
        server.listen(PORT, "localhost")
      }, 1000)
    } else {
      console.log({ ______APP______: "SERVER ERR" }, e.code)
      console.log({ ______APP______: "SERVER ERR" }, `server failed to listen to ${PORT}`)
    }
  })
  bones.listen(PORT, () => {
    console.log({ ______APP______: "LISTEN" }, `> listening on http:
  })
}
start()
