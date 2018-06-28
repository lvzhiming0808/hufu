import * as types from './actionTypes'

export default {
  [types.UPDATA_LEFTCOUNT](state, counts) {
    state.leftCount = { ...counts }
  }
}
