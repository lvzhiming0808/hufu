import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    nowIndex: '',
    enterpriseId: '',
    enterpriseIdValue: [],
    groupId: '',
    groupIdValue: [],
    sellId: '',    // 销售部
    sellIdValue: [],
    sellGroupId: '',  // 销售组
    sellGroupIdValue: [],
    workNum: '', // 工号
    phoneNum: '', // 手机号
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    recordType: '', //  录音类型
    recordTypeValue: [],
    recType: '',   // 录音性质
    recTypeValue: '',
    state: '',   // 学员现状
    stateValue: [],
    dateline: '',
    recordScore: '',    // 分值
    isViolation: '',   // 是否违规
    isViolationValue: [
      { id: 'null', name: '所有' },
      { id: '1', name: '是' },
      { id: '0', name: '否' }
    ],
    isAssigned: '',
    isAssignedValue: [
      { id: 'null', name: '所有' },
      { id: '1', name: '是' },
      { id: '0', name: '否' }
    ],
    tableData: [],   // 表格列表
    timeIntercept: [0, 0],  // 录音时长
    pagination: {
      number: 1,
      size: 60,
      totalElements: 0,
      totalPages: 0
    }
  },
  mutations,
  actions,
  getters
}
