<template>
  <form @submit.prevent='handleSubmit'>
    <label for=''>Title:</label>
    <input type='text' required v-model='title'>
    <label for=''>Details:</label>
    <textarea required v-model='details'></textarea>
    <button>Add project</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
const title = ref('')
const details = ref('')

const handleSubmit = () => {
  let project = {
    title: title.value,
    details: details.value,
    complete: false
  }
  fetch('http://localhost:3000/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  })
    .then(res => res.json())
    .then(() => {
      title.value = ''
      details.value = ''
      router.push('/')
    })
    .catch(err => console.log(err))
}
</script>

<style scoped>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  resize: none;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
</style>