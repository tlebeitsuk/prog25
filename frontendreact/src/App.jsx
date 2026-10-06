import { useEffect, useState } from 'react'
import './App.css'

const backend = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState([])

  async function getStudents() {
    const response = await fetch(`${backend}/students`);
    const data = await response.json();

    setStudents(data)
  }

  async function newStudent() {
    const name = prompt("Name");

    await fetch(`${backend}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, // same as name: name
      }),
    });

    getStudents();
  }


  async function deleteStudent(id) {
    await fetch(`${backend}/students/${id}`, {
      method: "DELETE",
    });

    getStudents();
  }

  async function editStudent(id) {
    const newName = prompt("New name:");

    await fetch(`${backend}/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
      }),
    });

    getStudents();
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <>
      <header>
        <h1>Students</h1>
        <button onClick={newStudent} className="btn btn-success">New Student</button>
      </header>

      <ul id="students">
        {students.map(student => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => editStudent(student.id)} className="btn btn-primary"
            >Edit</button
            >
            <button onClick={() => deleteStudent(student.id)} className="btn btn-danger"
            >Delete</button
            >
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
