import * as types from './actionTypes'
export default {
  [types.SETRADIO]({ commit }, value) {
    commit(types.SETRADIO, value)
  },
  [types.SETPAGINATION]({ commit }, value) {
    commit(types.SETPAGINATION, value)
  }

}
