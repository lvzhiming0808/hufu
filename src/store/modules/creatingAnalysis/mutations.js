import * as types from './actionTypes'

export default{
  [types.SETREPORTNAME](state, value) {
    state.reportName = value
  }
}
