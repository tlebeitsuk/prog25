import express from "express"
import path from "node:path"

const app = express()

// Routes
// ==================================

// Text route
app.get("/text", (req, res) => {
  res.type("text/plain")
  res.send("Hello text :)")
})

// HTML route
app.get("/html", (req, res) => {
  res.send("<h1>Hello HTML</h1>")
})

// JSON route
app.get("/json", (req, res) => {
  res.json({message: "Hello JSON"})
})

// File route
app.get("/file", (req, res) => {
 res.sendFile(path.resolve("index.html"))
})

app.get("/health", (req, res) => {
  res.send("OK")
})

app.get("/date", (req, res) => {
  const date = new Date().toLocaleString("fi").toString()
  res.send(date)
})

const database = [
  { "id": 1, "name": "Lisa" },
  { "id": 2, "name": "Niklas" },
  { "id": 4, "name": "Bert-Lis" },
  { "id": 22, "name": "Jonas" },
]

// /students - return all students
app.get("/students", (req, res) => {
  res.json(database)
})

// Route parameters
// /students/3 - return one student by id
app.get("/students/:id", (req, res) => {
  //console.log(typeof(req.params.id))
  const student = database.find(student => student.id === Number(req.params.id))

  if (!student) {
    // return res.json({})
    return res.status(404).send("Student not found")
  }

  res.json(student)
})

// /students/:id - delete student by id
// curl -X DELETE localhost:3000/students/22
app.delete("/students/:id", (req, res) => {
  const index = database.findIndex(student => student.id === Number(req.params.id))

  // If no student/index is found, return error
  if (index === -1) {
    return res.status(404).send("Student not found")
  }

  // Delete student/index from database/array
  database.splice(index, 1)

  res.send("Student deleted")
})


app.listen(3000, () => {
  console.log("⚡️ Server running at http://localhost:3000")
})
