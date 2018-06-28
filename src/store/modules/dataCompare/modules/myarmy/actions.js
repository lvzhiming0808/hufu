import * as types from './actionTypes'

export default {
  setDateVal: ({
    commit
  }, value) => commit(types.DATEVAL, value),
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
  setIdObj: ({
    commit
  }, value) => {
    commit(types.IDOBJ, value)
  }
}
