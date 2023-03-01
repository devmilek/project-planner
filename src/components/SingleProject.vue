<template>
  <div class='project' :class='{complete: props.project.complete}'>
    <div class='actions'>
      <h3 @click='showDetails = !showDetails'>{{props.project.title}}</h3>
      <div class='icons'>
        <router-link :to='{ name: "editProject", params: { id: props.project.id} }'>
          <span class="material-icons">
            edit
          </span>
        </router-link>
        <span class="material-icons" @click='deleteProject'>
          delete
        </span>
        <span class="material-icons tick" @click='toggleComplete'>
          done
        </span>

      </div>
    </div>
    <div v-if='showDetails' class='details'>
      <p>
        {{props.project.details}}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'complete'])

const showDetails = ref(false)
const uri = ref('http://localhost:3000/projects/' + props.project.id)

const deleteProject = () => {
  fetch(uri.value, {method: 'DELETE'})
    .then(() => {emit('delete', props.project.id)}).catch(err => {console.log(err)})
}
const toggleComplete = () => {
  fetch(uri.value, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({complete: !props.project.complete})
  })
    .then(() => {emit('complete', props.project.id)}).catch(err => {console.log(err)})
}
</script>

<style scoped>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.05);
  border-left: 4px solid #e90074;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
/* completed projects */
.project.complete {
  border-left: 4px solid #00ce89;
}
.project.complete .tick {
  color: #00ce89;
}
</style>