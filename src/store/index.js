import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/token'
import { auth, info } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    role: null,
    username: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    RESET_TOKEN(state) {
      state.token = getToken()
    },
    SET_ROLE(state, role) {
      state.role = role
    },
    RESET_ROLE(state) {
      state.role = ''
    },
    SET_USERNAME(state, role) {
      state.username = role
    },
    RESET_USERNAME(state) {
      state.username = ''
    }
  },
  actions: {
    login({ commit }, loginForm) {
      console.log('login')
      const { username, password } = loginForm
      return new Promise((resolve, reject) => {
        auth({ username: username.trim(), password: password }).then(response => {
          commit('SET_TOKEN', response.data.accessToken)
          setToken(response.data.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }) {
      console.log('logout')
      return new Promise(resolve => {
        removeToken()
        commit('RESET_TOKEN')
        resolve()
      })
    },
    getInfo({ commit }) {
      console.log('getInfo')
      return new Promise((resolve, reject) => {
        info().then(res => {
          const { username, role } = res.data
          commit('SET_USERNAME', username)
          commit('SET_ROLE', role)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {},
  getters: {
    token: (state) => {
      return state.token
    },
    role: (state) => {
      return state.role
    },
    username: (state) => {
      return state.username
    }
  }
})
