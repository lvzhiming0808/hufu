import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    radio: '',
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
