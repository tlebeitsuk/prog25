const backend = "http://localhost:3000"

// Get ID from URL
const params = new URLSearchParams(window.location.search)
const id = params.get("id")

async function getStudent() {
    const response = await fetch(`${backend}/students/${id}`)
    const student = await response.json()

    const text = document.querySelector("#student")
    // text.textContent = student.id + ": " + student.name
    text.textContent = `${student.id}: ${student.name}`
}

getStudent()