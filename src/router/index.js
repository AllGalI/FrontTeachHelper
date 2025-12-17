import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/store_user.js'

import InitialPage from '../pages/InitialPage.vue'
import TeachHelper from '../pages/TeachHelper.vue'
import Login from '../pages/Login.vue'
import Registration from '../pages/Registration.vue'
import TeacherDashboard from '../pages/dashboards/TeacherDashboard.vue'
import StudentDashboard from '../pages/dashboards/StudentDashboard.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import SignUp from '../pages/SignUp.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import SignIn from '../pages/SignIn.vue'
import ValidateEmail from '../pages/ValidateEmail.vue'
import ConfirmEmail from '../pages/ConfirmEmail.vue'
import HomePage from '../pages/HomePage.vue'


const routes = [
  { path: '/', component: HomePage, meta: { guest: true } },
  { path: '/signup', component: SignUp, meta: { guest: true } },
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/validate_email', component: ValidateEmail, meta: { guest: true } },
  { path: '/confirm_email', component: ConfirmEmail, meta: { guest: true } },

  { path: '/registration', component: Registration, meta: { guest: true } },
  { path: '/forgot_password', component: ForgotPassword, meta: {guest: true}},

   // защищённые маршруты
  { path: '/', component: ValidateEmail, meta: { requiresAuth: true } },
  { path: '/works', component: TeacherDashboard, meta: { requiresAuth: true } },
  { path: '/tasks', component: StudentDashboard, meta: { requiresAuth: true } },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()
  if (!store.user && store.token) {
    await store.fetchUser()
  }

  if (to.meta.requiresAuth && !store.token) {
    return next('/login')
  }

  // Если маршрут только для гостей, а юзер уже вошёл → редиректим на нужный дашборд
  if (to.meta.guest && store.user) {
    if (store.user.role === 'teacher') return next('/teacher-dashboard')
    if (store.user.role === 'student') return next('/student-dashboard')
  }

  next()
})


export default router
