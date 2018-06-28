import * as types from './actionTypes'
export default {
  [types.SETRADIO]({ commit }, value) {
    commit(types.SETRADIO, value)
  },
  [types.SETPAGINATION]({ commit }, value) {
    commit(types.SETPAGINATION, value)
  },
  [types.SETNOWINDEX]({ commit }, index) {
    commit(types.SETNOWINDEX, index)
  }
  // [types.SETVALUE]({ commit }, index) {
  //   commit(types.SETVALUE, index)
  // },
  // [types.SETVALUE2]({ commit }, index) {
  //   commit(types.SETVALUE2, index)
  // },
  // [types.SETBRANCH]({ commit }, index) {
  //   commit(types.SETBRANCH, index)
  // },
  // [types.SETINPUT2]({ commit }, index) {
  //   commit(types.SETINPUT2, index)
  // }
}
