import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Verify from '@/views/Verify'
import FOFError from '@/views/FOFError'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Signup',
    path: '/signup',
    component: Signup
  },
  {
    name: 'Verify',
    path: '/verify/:token?',
    component: Verify
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

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case 'Dashboard':
      if (store.getters.isAuthenticatedUser) {
        if (store.getters.isVerifiedUser) {
          next()
        } else {
          next('/verify')
        }
      } else {
        next('/login')
      }

      break
    case 'Login':
    case 'Signup':
      if (store.getters.isAuthenticatedUser) {
        if (store.getters.isVerifiedUser) {
          next('/dashboard')
        } else {
          next('/verify')
        }
      } else {
        next()
      }

      break
    case 'Verify':
      if (store.getters.isVerifiedUser) {
        next('/dashboard')
      } else {
        next()
      }

      break
    default:
      next()
      break
  }
})

export default router
