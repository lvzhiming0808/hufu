import * as types from './actionTypes'
export default {
  [types.SETENTERPRISEID](state, value) {
    state.enterpriseId = value
  },
  [types.SETENTERPRISEIDVALUE](state, value) {
    state.enterpriseIdValue = value
  },
  [types.SETGROUPID](state, value) {
    state.groupId = value
  },
  [types.SETGROUPIDVALUE](state, value) {
    state.groupIdValue = value
  },
  [types.SETSELLID](state, value) {
    state.sellId = value
  },
  [types.SETSELLIDVALUE](state, value) {
    state.sellIdValue = value
  },
  [types.SETSELLGROUPID](state, value) {
    state.sellGroupId = value
  },
  [types.SETSELLGROUPIDVALUE](state, value) {
    state.sellGroupIdValue = value
  },
  [types.SETRECORDTYPE](state, value) {
    state.recordType = value
  },
  [types.SETRECORDTYPEVALUE](state, value) {
    state.recordTypeValue = value
  },
  [types.SETRECTYPE](state, value) {
    state.recType = value
  },
  [types.SETRECTYPEVALUE](state, value) {
    state.recTypeValue = value
  },
  [types.SETSELECTSTATUS](state, value) {
    state.status = value
  },
  [types.SETWORKNUM](state, value) {
    state.workNum = value
  },
  [types.SETPHONENUM](state, value) {
    state.phoneNum = value
  },
  [types.SETSTARTTIME](state, value) {
    state.startTime = value
  },
  [types.SETENDTIME](state, value) {
    state.endTime = value
  },
  [types.SETTIMELENGTH](state, value) {
    state.timeIntercept = value
  },
  [types.SETTABLE](state, value) {
    state.tableData = value
  },
  [types.SETOLDSELECTEDCOUNT](state, value) {
    state.oldSelectedCount = value
  },
  [types.SETPAGINATION](state, value) {
    state.pagination = value
  },
  // 切换分页
  [types.TOGGLEPAGINATION](state, value) {
    state.pagination.number = value
  },
  [types.SETSTATEVALUE](state, value) {
    state.stateValue = value
  },
  [types.SETSTATE](state, value) {
    state.state = value
  },
  [types.SETISASSIGNED](state, value) {
    state.isAssigned = value
  },
  [types.SETJIQI](state, value) {
    state.jiqi = value
  }
}
