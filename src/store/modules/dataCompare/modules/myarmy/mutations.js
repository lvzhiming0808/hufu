import * as types from './actionTypes'

export default {
  [types.START_TIME](state, value) {
    state.startTime = value
  },
  [types.END_TIME](state, value) {
    state.endTime = value
  },
  [types.DATEVAL](state, value) {
    state.dateVal = value
  },
  [types.IDOBJ](state, value) {
    state.idObj = value
  }
}
