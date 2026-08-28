import express from "express"
import exampleRouter from "./routes/examples.js"
import studentsRouter from "./routes/students.js"

const app = express()

app.use("/", exampleRouter)
app.use("/", studentsRouter)

app.listen(3000, () => {
  console.log("⚡️ Server running at http://localhost:3000")
})
