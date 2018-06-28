import * as types from './actionTypes'

export default {
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
  setStartTime: ({
    commit
  }, value) => {
    commit(types.START_TIME, value)
  },
  setEndTime: ({
    commit
  }, value) => {
    commit(types.END_TIME, value)
  }
}
