import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProjectView from '@/views/AddProjectView.vue'
import EditProjectView from '@/views/EditProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'addProject',
      component: AddProjectView
    },
    {
      path: '/project/:id',
      name: 'editProject',
      component: EditProjectView,
      props: true
    },
  ]
})

export default router
