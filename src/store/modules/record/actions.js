import * as types from './actionTypes'
import {
  orgs,
  state,
	recType,
	recordType,
	selectRecordList
} from '@/api/record'
export default {
	// 初始化写死的下拉选择框
  [types.INITSELECT]({ commit }) {
    const index = [
      types.SETRECORDTYPEVALUE,
      types.SETRECTYPEVALUE,
      types.SETENTERPRISEIDVALUE,
      types.SETSTATEVALUE
    ]
    const funs = [recordType, recType, orgs, state]
    funs.forEach((fun, i) => {
      fun().then(value => {
        commit(index[i], value)
      })
    })
  },
	// 获取军团下拉选择框选项
  async [types.SETGROUPIDVALUE]({ commit, state }) {
    commit(types.SETGROUPIDVALUE, await orgs({ id: state.enterpriseId }))
    commit(types.SETGROUPID, '')
    commit(types.SETSELLID, '')
    commit(types.SETSELLGROUPID, '')
  },
	// 获取销售部选择框选项
  async [types.SETSELLIDVALUE]({ commit, state }) {
    commit(types.SETSELLIDVALUE, await orgs({ id: state.groupId }))
    commit(types.SETSELLID, '')
    commit(types.SETSELLGROUPID, '')
  },
	// 获取销售组选择框选项
  async [types.SETSELLGROUPIDVALUE]({ commit, state }) {
    commit(types.SETSELLGROUPIDVALUE, await orgs({ id: state.sellId }))
    commit(types.SETSELLGROUPID, '')
  },
	// 获取录音筛选列表
  async [types.SEARCH]({ commit, state }) {
    state.loading = true
    const {
			content: {
				content,
				currentSelectedCount
			},
			number,
			size,
			totalElements,
			totalPages
		} = await selectRecordList(
  {
    page: state.pagination.number,
    size: 20,
		// 事业部id
    enterpriseId: state.enterpriseId,
		// 责任方/军团id
    groupId: state.groupId,
		// 销售部 id
    sellId: state.sellId,
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
		// 策略名称
    state: state.state,
		// 录音类型
    recordType: state.recordType,
		// 录音性质
    recType: state.recType,
    isApply: state.isAssigned,
    isSystem: state.jiqi,
		// 时间截取开始
    startTimeLength: state.timeIntercept[0] * 60,
		// 时间截取结束
    endTimeLength: state.timeIntercept[1] * 60,
		// 是否占用
    selectStatus: state.status === 'null' ? '' : state.status
  })
    state.loading = false
    commit(types.SETTABLE, content)
    commit(types.SETOLDSELECTEDCOUNT, currentSelectedCount)
    commit(types.SETPAGINATION, {
      number,
      size,
      totalElements,
      totalPages
    })
    return Promise.resolve()
  },
  [types.TOGGLEPAGINATION]({ commit, dispatch, state }, target) {
    if (state.loading) return
    commit(types.TOGGLEPAGINATION, target)
    dispatch(types.SEARCH)
  }
}
