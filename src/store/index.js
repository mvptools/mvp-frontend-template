import Vue from 'vue'
import Vuex from 'vuex'
import graphql from '@/plugins/graphql'
import isJSON from 'is-json'

import login from '@/graphql/login.gql'
import signup from '@/graphql/signup.gql'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: isJSON(localStorage.getItem('token'))
      ? JSON.parse(localStorage.getItem('token'))
      : null,
    user: isJSON(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user'))
      : null
  },
  getters: {
    currentUser: state => {
      return state.user
    },
    isAuthenticatedUser: state => {
      return (
        state.token !== null &&
        state.user !== null
      )
    }
  },
  mutations: {
    login (state, payload) {
      graphql.request(login, {
        login: payload.login,
        password: payload.password
      }).then(data => {
        state.token = data.login.token
        state.user = data.login.user
        localStorage.setItem('token', JSON.stringify(data.login.token))
        localStorage.setItem('user', JSON.stringify(data.login.user))
      })
    },
    logout (state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    signup (state, payload) {
      graphql.request(signup, {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        username: payload.username,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      }).then(data => {
        state.token = data.signup.token
        state.user = data.signup.user
        localStorage.setItem('token', JSON.stringify(data.signup.token))
        localStorage.setItem('user', JSON.stringify(data.signup.user))
      })
    }
  },
  actions: {
    login (context, payload) {
      context.commit('login', payload)
    },
    logout (context) {
      context.commit('logout')
    },
    signup (context, payload) {
      context.commit('signup', payload)
    }
  }
})

export default store
