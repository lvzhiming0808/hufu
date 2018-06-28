import * as types from './actionTypes'
import { recordList, orgs, recType, recordType, sopOrgs, stateUnKnow } from '@/api/qualityGrade'
export default {
  [types.SEARCH]({ commit, state }) {
    return recordList({
      mine: state.nowIndex,
      status: 2,
      sumScore: state.recordScore,   //  分值，执行总得分
      date: state.dateline,     //  操作日期
      page: state.pagination.number,
      size: 60,
      // 事业部id
      enterpriseId: state.enterpriseId,
      // 责任方/军团id
      groupId: state.groupId,
      // 销售部 id
      sellId: state.sellId,
      isApply: state.isAssigned,
      isViolation: state.isViolation,
      // 销售组 id
      sellGroupId: state.sellGroupId,
      // 员工工号
      workNum: state.workNum,
     // 员工手机号
      phoneNum: state.phoneNum,
    // 开始时间
      startTime: state.startTime ? new Date(state.startTime).getTime() : '',
    // 结束时间
      endTime: state.endTime ? new Date(state.endTime).getTime() : '',
      // 学院现状
      state: state.state,
      // 录音类型
      recordType: state.recordType,
      // 录音性质
      recType: state.recType,
      // 时间截取开始
      startTimeLength: state.timeIntercept[0] * 60,
      // 时间截取结束
      endTimeLength: state.timeIntercept[1] * 60
    }).then(res => {
      commit(types.SETTABLE, res.content.content)
      commit(types.SETPAGINATION, {
        number: res.number,
        size: res.size,
        totalElements: res.totalElements,
        totalPages: res.totalPages
      })
    })
  },
  [types.SETNOWINDEX]({ commit, dispatch }, index) {
    commit(types.SETNOWINDEX, index)
    dispatch(types.SEARCH)
  },
  //  操作分值
  [types.SETRECORDSCORE]({ commit }, value) {
    commit(types.SETRECORDSCORE, value)
  },
  // 操作日期
  [types.SETDATELINE]({ commit }, value) {
    commit(types.SETDATELINE, value)
  },
  [types.TOGGLEPAGINATION]({ commit, dispatch }, target) {
    commit(types.TOGGLEPAGINATION, target)
    dispatch(types.SEARCH)
  },
	// 初始化写死的下拉选择框
  [types.INITSELECT]({ commit, state }) {
    const index = [
      types.SETRECORDTYPEVALUE,
      types.SETRECTYPEVALUE,
      types.SETENTERPRISEIDVALUE,
      types.SETSTATEVALUE
    ]
    let funs = []
    if (state.nowIndex === '') {
      funs = [recordType, recType, orgs, stateUnKnow]
      funs.forEach((fun, i) => {
        fun().then(value => {
          commit(index[i], value)
        })
      })
    } else if (state.nowIndex === 1) {
      funs = [recordType, recType, sopOrgs, stateUnKnow]
      funs.forEach((fun, i) => {
        fun().then(value => {
          commit(index[i], value)
        })
      })
    }
  },
    // 获取军团下拉选择框选项
  async [types.SETGROUPIDVALUE]({ commit, state }) {
    if (state.nowIndex === '') {
      commit(types.SETGROUPIDVALUE, await orgs({ id: state.enterpriseId }))
      commit(types.SETGROUPID, '')
      commit(types.SETSELLID, '')
      commit(types.SETSELLGROUPID, '')
    } else if (state.nowIndex === 1) {
      commit(types.SETGROUPIDVALUE, await sopOrgs({ id: state.enterpriseId }))
      commit(types.SETGROUPID, '')
      commit(types.SETSELLID, '')
      commit(types.SETSELLGROUPID, '')
    }
  },
    // 获取销售部选择框选项
  async [types.SETSELLIDVALUE]({ commit, state }) {
    if (state.nowIndex === '') {
      commit(types.SETSELLIDVALUE, await orgs({ id: state.groupId }))
      commit(types.SETSELLID, '')
      commit(types.SETSELLGROUPID, '')
    } else if (state.nowIndex === 1) {
      commit(types.SETSELLIDVALUE, await sopOrgs({ id: state.groupId }))
      commit(types.SETSELLID, '')
      commit(types.SETSELLGROUPID, '')
    }
  },
    // 获取销售组选择框选项
  async [types.SETSELLGROUPIDVALUE]({ commit, state }) {
    if (state.nowIndex === '') {
      commit(types.SETSELLGROUPIDVALUE, await orgs({ id: state.sellId }))
      commit(types.SETSELLGROUPID, '')
    } else if (state.nowIndex === 1) {
      commit(types.SETSELLGROUPIDVALUE, await sopOrgs({ id: state.sellId }))
      commit(types.SETSELLGROUPID, '')
    }
  }
}
