const backend = "http://localhost:3000"

async function getStudents() {
  const response = await fetch(`${backend}/students`)
  const students = await response.json()

  const list = document.querySelector("#students")

  students.forEach(student => {
    const li = document.createElement("li")
    const deleteButton = document.createElement("button")
    const editButton = document.createElement("button")

    li.textContent = student.name
    deleteButton.textContent = "Delete"
    editButton.textContent = "Edit"

    deleteButton.addEventListener("click", async () => {
      await fetch(`${backend}/students/${student.id}`, {
        method: "DELETE"
      })
      
     li.remove()
    })

    editButton.addEventListener("click", async () => {
      const newName = prompt("New name:")
      
      await fetch(`${backend}/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           name: newName
        })
      })

      li.firstChild.textContent = newName
    })

    li.append(editButton)
    li.append(deleteButton)
    list.append(li)
  })
}

getStudents()

