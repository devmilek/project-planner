<script setup>
import { onMounted, ref } from 'vue'
import SingleProject from '@/components/SingleProject.vue'

const projects = ref([])

onMounted(() => {
  fetch('http://localhost:3000/projects')
    .then(res => res.json())
    .then(data => projects.value = data)
    .catch(err => console.log(err))
})

const handleDelete = (id) => {
  projects.value = projects.value.filter(project => project.id !== id)
}

const handleComplete = (id) => {
  let project = projects.value.find(project => project.id === id)
  project.complete = !project.complete
}
</script>

<template>
  <div class='home'>
    <div v-if='projects.length'>
      <div v-for='project in projects' :key='project.id'>
        <SingleProject :project='project' @delete='handleDelete' @complete='handleComplete' />
      </div>
    </div>
  </div>
</template>
