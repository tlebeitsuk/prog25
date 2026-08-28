import express from "express"
import database from "../database.js"

const router = express.Router()

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

export default router
