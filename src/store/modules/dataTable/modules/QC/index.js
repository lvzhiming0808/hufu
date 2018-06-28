import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default {
  namespaced: true,
  state: {
    startTime: '',
    endTime: '',
    week: '',
    month: '',
    // showWeek: false,
    // showMonth: true,
    page: 1,
    range: '1',
    radio: '1'
  },
  actions,
  mutations,
  getters
}
