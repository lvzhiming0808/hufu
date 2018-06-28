import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    loading: false,
    enterpriseId: '',
    enterpriseIdValue: [],
    groupId: '',
    groupIdValue: [],
    sellId: '',
    sellIdValue: [],
    sellGroupId: '',
    sellGroupIdValue: [],
    workNum: '',
    phoneNum: '',
    // 手机号
    startTime: '',
    // 开始时间
    endTime: '',
    // 结束时间
    state: '',
    stateValue: [],
    recordType: '',
    recordTypeValue: [],
    recType: '',
    recTypeValue: [],
    status: '',
    statusValue: [
      { id: 'null', name: '所有' },
      { id: '0', name: '未占用' },
      { id: '1', name: '已占用' }
    ],
    isAssigned: '',
    isAssignedValue: [
      { id: 'null', name: '所有' },
      { id: '1', name: '是' },
      { id: '0', name: '否' }
    ],
    jiqi: '',
    jiqiValue: [
      { id: 'null', name: '所有' },
      { id: '0', name: '初筛违规' },
      { id: '1', name: '初筛正常' }
    ],
    timeIntercept: [0, 0],
    tableData: [],
    oldSelectedCount: 0,
    pagination: {
      number: 1,
      size: 20,
      totalElements: 0,
      totalPages: 0
    }
  },
  mutations,
  actions,
  getters
}
