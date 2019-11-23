import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Signup from '@/views/Signup'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: Signup
  }
]

const router = new VueRouter({
  routes
})

export default router
