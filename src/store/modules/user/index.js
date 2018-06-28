import * as types from './actionTypes'
import { setAuth } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

export default {
  state: {
    loginName: '',
    auth: '',
    roles: [],
    showName: '',
    job: '',
    organization: ''
  },
  mutations: {
    [types.REMOVE_USERINFO](state) {
      state.loginName = ''
      state.auth = ''
      state.roles = ''
      state.showName = ''
      state.job = ''
      state.organization = ''
    },
    [types.SET_LOGIN_NAME](state, loginName) {
      state.loginName = loginName
    },
    [types.SET_AUTH](state, auth) {
      state.auth = auth
    },
    [types.SET_ROLES](state, roles) {
      state.roles = roles
    },
    [types.SET_SHOW_NAME](state, showName) {
      state.showName = showName
    },
    [types.SET_AVATAR](state, avatar) {
      state.avatar = avatar
    },
    [types.SET_JOB](state, job) {
      state.job = job
    },
    [types.SET_BRANCH](state, branch) {
      state.branch = branch
    },
    [types.SET_ORGANIZATION](state, organization) {
      state.organization = organization
    }
  },
  actions: {
    [types.LOG_IN]({ commit }, userInfo) {
      const {
        loginName,
        password
      } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: loginName, password }).then(response => {
          const { token } = response
          setAuth(token)
          commit(types.SET_AUTH, token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    [types.GET_INFO]({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const {
            roles,
            name,
            organization
          } = response

          commit(types.SET_ROLES, roles)
          commit(types.SET_SHOW_NAME, name)
          // 这个字段有点尴尬, 它的 name 居然是一个
          commit(types.SET_JOB, name)
          commit(types.SET_ORGANIZATION, organization)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
