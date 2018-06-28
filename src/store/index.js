import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import player from './modules/player'
import user from './modules/user'
import record from './modules/record'
import boutiqueBank from './modules/boutiqueBank'
import dataTable from './modules/dataTable'
import myArmy from './modules/myArmy'
import messageCenter from './modules/messageCenter'
import bell from './modules/bell'
import myApproval from './modules/myApproval'
import qualityGrade from './modules/qualityGrade'
import myStrategy from './modules/myStrategy'
import approval from './modules/approval'
import dataCompare from './modules/dataCompare'
import creatingAnalysis from './modules/creatingAnalysis'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    bell,
    player,
    record,
    boutiqueBank,
    messageCenter,
    dataTable,
    myArmy,
    qualityGrade,
    myStrategy,
    approval,
    myApproval,
    dataCompare,
    creatingAnalysis
  },
  getters
})
