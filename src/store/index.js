import Vue from 'vue'
import Vuex from 'vuex'
import isJSON from 'is-json'
import axios from '@/plugins/axios'

import login from '@/graphql/login.gql'
import signup from '@/graphql/signup.gql'
import verify from '@/graphql/verify.gql'
import verifyresend from '@/graphql/verifyresend.gql'

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
        location.reload()
      })
    },
    logout (state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      location.reload()
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
        location.reload()
      })
    },
    verify (state, payload) {
      axios({
        method: 'post',
        data: {
          query: verify,
          variables: payload
        }
      }).then(response => {
        state.token = response.data.data.verify.token
        state.user = response.data.data.verify.user
        localStorage.setItem('token', JSON.stringify(response.data.data.verify.token))
        localStorage.setItem('user', JSON.stringify(response.data.data.verify.user))
        location.reload()
      })
    },
    verify_resend () {
      axios({
        method: 'post',
        data: {
          query: verifyresend
        }
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
    },
    verify (context, payload) {
      context.commit('verify', payload)
    },
    verify_resend (context, payload) {
      context.commit('verify_resend', payload)
    }
  }
})

export default store
