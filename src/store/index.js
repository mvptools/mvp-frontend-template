import Vue from 'vue'
import Vuex from 'vuex'
import isJSON from 'is-json'
import axios from '@/plugins/axios'

import login from '@/graphql/login.gql'
import signup from '@/graphql/signup.gql'
import passwordreset from '@/graphql/passwordreset.gql'
import sendpasswordreset from '@/graphql/sendpasswordreset.gql'
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
    password_reset (state, payload) {
      axios({
        method: 'post',
        data: {
          query: passwordreset,
          variables: payload
        }
      }).then(response => {
        state.token = response.data.data.password_reset.token
        state.user = response.data.data.password_reset.user
        localStorage.setItem('token', JSON.stringify(response.data.data.password_reset.token))
        localStorage.setItem('user', JSON.stringify(response.data.data.password_reset.user))
        location.reload()
      })
    },
    send_password_reset (state, payload) {
      axios({
        method: 'post',
        data: {
          query: sendpasswordreset,
          variables: {
            login: payload
          }
        }
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
          query: verifyresend,
          variables: {
            token: null
          }
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
    password_reset (context, payload) {
      context.commit('password_reset', payload)
    },
    send_password_reset (context, payload) {
      context.commit('send_password_reset', payload)
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
