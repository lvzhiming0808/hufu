import * as types from './actionTypes'

export default {
  [types.RANGE](state, value) {
    state.range = value
  },
  [types.PAGE](state, value) {
    state.page = value
  },
  [types.WEEK](state, value) {
    state.week = value
  },
  [types.MONTH](state, value) {
    state.month = value
  },
  [types.SHOW_WEEK](state, value) {
    state.showWeek = value
  },
  [types.SHOW_MONTH](state, value) {
    state.showMonth = value
  },
  [types.START_TIME](state, value) {
    state.startTime = value
  },
  [types.END_TIME](state, value) {
    state.endTime = value
  }
}
