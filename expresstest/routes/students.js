import express from "express"
import database from "../database.js"

const router = express.Router()

// https://cdn.prod.website-files.com/6a020fca21245d64af2c19d8/6a020fca21245d64af2c3a4f_67602c2495ec57e493846e6c_63fdf76ef9a4cc0deb12bd16_CRUD%252520Meaning.jpeg

// /students - return all students
router.get("/students", (req, res) => {
  res.json(database)
})

// Route parameters
// /students/3 - return one student by id
router.get("/students/:id", (req, res) => {
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
router.delete("/students/:id", (req, res) => {
  const index = database.findIndex(student => student.id === Number(req.params.id))

  // If no student/index is found, return error
  if (index === -1) {
    return res.status(404).send("Student not found")
  }

  // Delete student/index from database/array
  database.splice(index, 1)

  res.send("Student deleted")
})

// /students - create student
router.post("/students", (req, res) => {
  // Random 0-9999
  // const nextId = Math.floor(Math.random() * 10000)

  // Random ID
  // const nextId = crypto.randomUUID()

  // Next highest ID in database
  let nextId = 0

  database.forEach(student => {
    nextId = Math.max(nextId, student.id)
  })

  nextId = nextId + 1

  const student = {
    id: nextId,
    name: req.body.name
  }

  database.push(student)

  res.status(201).json(student)
})

// /students/3 - update name by id
router.put("/students/:id", (req, res) => {
  // Validate that ID is the correct format (return error if ID is not a integer)
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).send("ID must be an integer")
  }

  // Validate name in the body (return error if name is 1. min 2 chars, 2. max 250 chars )
  const name = req.body.name

  if (typeof name !== "string" || name.length < 2 || name.length > 250) {
    return res.status(400).send("Name must be between 2 and 250 characters")
  }

  // Find student by id
  const index = database.findIndex(student => student.id === id)

  // Validate student (return error if student not found)
  if (index === -1) {
    return res.status(404).send("Student not found")
  }

  // Update student in database
  database[index].name = name

  // Send "something" back to client
  res.json(database[index])
})

export default router
