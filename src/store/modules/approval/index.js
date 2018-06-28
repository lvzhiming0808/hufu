import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    radio: '',
    // value: '',  //  地域
    // value2: '',
    // branch: [], // 组织部门
    // input2: '', //  组织部门显示
    nowIndex: 0,
    pagination: {
      number: 1,
      size: 5,
      totalElements: 0,
      totalPages: 0
    }

  },
  mutations,
  actions,
  getters
}
