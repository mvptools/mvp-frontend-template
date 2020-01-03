import Vue from 'vue'
import Vuex from 'vuex'
import isJSON from 'is-json'
import axios from '@/plugins/axios'

import login from '@/graphql/login.gql'
import signup from '@/graphql/signup.gql'
import passwordreset from '@/graphql/passwordreset.gql'
import verify from '@/graphql/verify.gql'

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
    },
    isVerifiedUser: state => {
      let isVerifiedUser = false

      try {
        isVerifiedUser = state.user.email_verified
      } catch (error) {}

      return isVerifiedUser
    }
  },
  mutations: {
    login (state, payload) {
      state.token = payload.token
      state.user = payload.user
      localStorage.setItem('token', JSON.stringify(payload.token))
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    logout (state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        method: 'post',
        data: {
          query: login,
          variables: payload
        }
      }).then(response => {
        context.commit('login', response.data.data.login)
      })
    },
    logout (context) {
      context.commit('logout')
    },
    signup (context, payload) {
      return axios({
        method: 'post',
        data: {
          query: signup,
          variables: payload
        }
      }).then(response => {
        context.commit('login', response.data.data.signup)
      })
    },
    password_reset (context, payload) {
      return axios({
        method: 'post',
        data: {
          query: passwordreset,
          variables: payload
        }
      }).then(response => {
        context.commit('login', response.data.data.password_reset)
      })
    },
    verify (context, payload) {
      return axios({
        method: 'post',
        data: {
          query: verify,
          variables: payload
        }
      }).then(response => {
        context.commit('login', response.data.data.verify)
      })
    }
  }
})

export default store
