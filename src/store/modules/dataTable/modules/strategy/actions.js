import * as types from './actionTypes'

export default {
  changeSort: ({
    commit
  }, value) => commit(types.CHANGE_SORT, value),
  setRange: ({
    commit
  }, value) => {
    commit(types.RANGE, value)
  },
  setPage: ({
    commit
  }, value) => {
    commit(types.PAGE, value)
  },
  setItem: ({
    commit
  }, value) => {
    commit(types.ITEM, value)
  },
  setWeekTime: ({
    commit
  }, value) => {
    commit(types.WEEK, value)
  },
  setMonthTime: ({
    commit
  }, value) => {
    commit(types.MONTH, value)
  },
  setShowWeek: ({
    commit
  }, value) => {
    commit(types.SHOW_WEEK, value)
  },
  setShowMonth: ({
    commit
  }, value) => {
    commit(types.SHOW_MONTH, value)
  },
  setShowOrg: ({
    commit
  }, value) => {
    commit(types.SHOW_ORG, value)
  },
  setStartTime: ({
    commit
  }, value) => {
    commit(types.START_TIME, value)
  },
  setEndTime: ({
    commit
  }, value) => {
    commit(types.END_TIME, value)
  },
  setOrgItem: ({
    commit
  }, value) => {
    commit(types.ORG_ITEM, value)
  },
  setOrgId: ({
    commit
  }, value) => {
    commit(types.ORG_ID, value)
  }
}
