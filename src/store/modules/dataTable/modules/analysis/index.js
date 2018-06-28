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
    showWeek: true,
    showMonth: false,
    showOrg: false,
    item: ['time', 'week'],
    page: 1,
    sort: 2,
    range: '1',
    sortValue: '策略执行率（从高到低）',
    orgItem: [],
    orgId: null
  },
  actions,
  mutations,
  getters
}
