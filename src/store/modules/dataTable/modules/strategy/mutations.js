import * as types from './actionTypes'

export default {
  [types.CHANGE_SORT](state, value) {
    if (value === '策略执行率（从高到低）') {
      state.sort = 2
      state.sortValue = '策略执行率（从高到低）'
    } else {
      state.sort = 1
      state.sortValue = '策略执行率（从低到高）'
    }
  },
  [types.RANGE](state, value) {
    state.range = value
  },
  [types.PAGE](state, value) {
    state.page = value
  },
  [types.ITEM](state, value) {
    state.item = value
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
  },
  [types.ORG_ITEM](state, value) {
    state.orgItem = value
  },
  [types.SHOW_ORG](state, value) {
    state.showOrg = value
  },
  [types.ORG_ID](state, value) {
    state.orgId = value
  }
}
