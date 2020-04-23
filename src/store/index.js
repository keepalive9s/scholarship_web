import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/token'
import { login, role, admin, student, counsellor } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    admin: { username: null },
    counsellor: { staffId: null, name: null, unitId: null },
    student: { studentId: null, name: null, unitId: null },
    role: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLE(state, role) {
      state.role = role
    },
    SET_ADMIN(state, admin) {
      state.admin = admin
    },
    SET_STUDENT(state, student) {
      state.student = student
    },
    SET_COUNSELLOR(state, counsellor) {
      state.counsellor = counsellor
    },
    RESET_TOKEN(state) {
      state.token = getToken()
    },
    RESET_ROLE(state) {
      state.role = null
    },
    RESET_USER(state) {
      state.admin = { username: null }
      state.counsellor = { staffId: null, name: null, unitId: null }
      state.student = { studentId: null, name: null, unitId: null }
    }
  },
  actions: {
    login({ commit }, loginForm) {
      const { username, password } = loginForm
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          commit('SET_TOKEN', response.data.accessToken)
          setToken(response.data.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRole({ commit }) {
      return new Promise((resolve, reject) => {
        role().then(res => {
          commit('SET_ROLE', res.data)
          if (res.data === 'ROLE_ADMIN') {
            admin().then(res => {
              commit('SET_ADMIN', res.data)
            })
          } else if (res.data === 'ROLE_STUDENT') {
            student().then(res => {
              commit('SET_STUDENT', res.data)
            })
          } else if (res.data === 'ROLE_COUNSELLOR') {
            counsellor().then(res => {
              commit('SET_COUNSELLOR', res.data)
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('RESET_TOKEN')
        commit('RESET_USER')
        commit('RESET_ROLE')
        resolve()
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
    admin: (state) => {
      return state.admin
    },
    student: (state) => {
      return state.student
    },
    counsellor: (state) => {
      return state.counsellor
    }
  }
})
