import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Registration from '../pages/Registration.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/registration', component: Registration},
//   { path: '/teacher', component: TeacherDashboard },
//   { path: '/student', component: StudentDashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
