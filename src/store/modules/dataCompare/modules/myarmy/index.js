import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default {
  namespaced: true,
  state: {
    startTime: '',
    endTime: '',
    dateVal: '',
    idObj: null
  },
  actions,
  mutations,
  getters
}
