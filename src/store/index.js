import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: (localStorage.getItem('token') !== null)
      ? JSON.parse(localStorage.getItem('token'))
      : null,
    user: (localStorage.getItem('user') !== null)
      ? JSON.parse(localStorage.getItem('user'))
      : null
  },
  getters: {
    authHeader: state => {
      return (state.token !== null)
        ? 'bearer ' + state.token.api_token
        : ''
    },
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
      context.commit('login', payload)
    },
    logout (context) {
      context.commit('logout')
    }
  }
})

export default store
