import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    totleNum: 0,
    contents: [{
      type: 0,
      number: 0
    },
    {
      type: 1,
      number: 0
    },
    {
      type: 2,
      number: 0
    }]
  },
  actions,
  mutations,
  getters
}
