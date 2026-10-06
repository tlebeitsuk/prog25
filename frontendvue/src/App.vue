<script setup>
  import { ref, onMounted } from "vue";

  const backend = "http://localhost:3000";

  let students = ref([]);

  async function getStudents() {
    const response = await fetch(`${backend}/students`);
    students.value = await response.json();
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

  onMounted(() => {
    getStudents();
  });
</script>

<template>
  <header>
    <h1>Students</h1>
    <button @click="newStudent" class="btn btn-success">New Student</button>
  </header>

  <ul id="students">
    <li v-for="student in students">
      {{student.name}}
      <button @click="editStudent(student.id)" class="btn btn-primary"
        >Edit</button
      >
      <button @click="deleteStudent(student.id)" class="btn btn-danger"
        >Delete</button
      >
    </li>
  </ul>
</template>

<style scoped>
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
