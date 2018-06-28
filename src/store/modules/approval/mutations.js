import * as types from './actionTypes'
export default {
    // 切换radio
  [types.SETRADIO](state, value) {
    state.radio = value
  },
    // 设置分页数据
  [types.SETPAGINATION](state, value) {
    state.pagination = value
  },
  // 设置tab
  [types.SETNOWINDEX](state, value) {
    state.nowIndex = value
  }

  // //  设置地域
  // [types.SETVALUE](state, value) {
  //   state.value = value
  // },
  // [types.SETVALUE2](state, value) {
  //   state.value2 = value
  // },
  // [types.SETBRANCH](state, value) {
  //   state.branch = value
  // },
  // [types.SETINPUT2](state, value) {
  //   state.input2 = value
  // }

}

