<script>
  import { onMount } from "svelte";

  const backend = "http://localhost:3000";

  let students = $state([]);

  async function getStudents() {
    const response = await fetch(`${backend}/students`);
    students = await response.json();
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

  onMount(() => {
    getStudents();
  });
</script>

<header>
  <h1>Students</h1>
  <button onclick={newStudent} class="btn btn-success">New Student</button>
</header>

<ul id="students">
  {#each students as student}
    <li>
      {student.name}
      <button onclick={() => editStudent(student.id)} class="btn btn-primary"
        >Edit</button
      >
      <button onclick={() => deleteStudent(student.id)} class="btn btn-danger"
        >Delete</button
      >
    </li>
  {/each}
</ul>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
  }

  #students {
    list-style: none;
    padding: 0;
  }

  #students li {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem 0;
  }

  #students li a {
    flex: 1;
  }
</style>
