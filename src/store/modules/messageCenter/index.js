import myStrategy from './modules/myStrategy'
import sop from './modules/sop'
import system from './modules/system'
import all from './modules/all'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    leftCount: {
      system: 0,
      sop: 0,
      group: 0,
      totle: 0
    }
  },
  modules: {
    sop,
    system,
    myStrategy,
    all
  },
  mutations,
  getters
}
