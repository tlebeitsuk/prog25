import express from "express"
import path from "node:path"

const router = express.Router()

// Text route
router.get("/text", (req, res) => {
  res.type("text/plain")
  res.send("Hello text :)")
})

// HTML route
router.get("/html", (req, res) => {
  res.send("<h1>Hello HTML</h1>")
})

// JSON route
router.get("/json", (req, res) => {
  res.json({message: "Hello JSON"})
})

// File route
router.get("/file", (req, res) => {
 res.sendFile(path.resolve("index.html"))
})

router.get("/health", (req, res) => {
  res.send("OK")
})

router.get("/date", (req, res) => {
  const date = new Date().toLocaleString("fi").toString()
  res.send(date)
})

export default router
