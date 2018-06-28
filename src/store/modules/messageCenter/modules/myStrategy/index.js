import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    pagenation: {
      number: 1,
      size: 20,
      totalElements: 1000,
      totalPages: 0
    },
    // 当前查看的页签, 0: 未读, 1: 全部
    status: 1,
    messageList: []
  },
  actions,
  mutations,
  getters
}
