import analysis from './modules/analysis'
import workLoad from './modules/workLoad'
import strategy from './modules/strategy'
import QC from './modules/QC'

export default {
  namespaced: true,
  modules: {
    analysis,
    workLoad,
    strategy,
    QC
  }
}
