import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Signup from '@/views/Signup'
import FOFError from '@/views/FOFError'

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
  },
  {
    name: 'FOFError',
    path: '*',
    component: FOFError
  }
]

const router = new VueRouter({
  routes
})

export default router
