import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'
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
      axios({
        method: 'post',
        data: {
          query: login,
          variables: payload
        }
      }).then(response => {
        state.token = response.data.data.login.token
        state.user = response.data.data.login.user
        localStorage.setItem('token', JSON.stringify(response.data.data.login.token))
        localStorage.setItem('user', JSON.stringify(response.data.data.login.user))
      })
    },
    logout (state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    signup (state, payload) {
      axios({
        method: 'post',
        data: {
          query: signup,
          variables: payload
        }
      }).then(response => {
        state.token = response.data.data.signup.token
        state.user = response.data.data.signup.user
        localStorage.setItem('token', JSON.stringify(response.data.data.signup.token))
        localStorage.setItem('user', JSON.stringify(response.data.data.signup.user))
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
