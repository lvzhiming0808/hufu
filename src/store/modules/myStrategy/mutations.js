import * as types from './actionTypes'
export default {
    // 切换radio
  [types.SETRADIO](state, value) {
    state.radio = value
  },
    // 设置分页数据
  [types.SETPAGINATION](state, value) {
    state.pagination = value
  }
}

