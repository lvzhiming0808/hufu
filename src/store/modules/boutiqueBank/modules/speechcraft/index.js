/**
 * @Author: luoquanquan
 * @Date: 2017-11-27 16:02:25
 * @Last Modified by: luoquanquan
 * @Last Modified time: 2017-12-07 10:23:35
 */

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default {
  namespaced: true,
  state: {
    own: '1', // my or all
    screeningDimension: ['juntuan'],
    screeningDimensionValue: [
      {
        value: 'time',
        label: '时间',
        children: [{ value: 'week', label: '周' }, { value: 'month', label: '月' }]
      }, {
        value: 'juntuan',
        label: '组织架构'
      }],
    time: '',
    structureValue: [],
    selectedStructureValue: [],
    enterpriseId: '',
    groupId: '',
    sellId: '',
    sellGroupId: '',
    sellGroupIdValue: [],
    tableData: [],
    pagination: {
      number: 1,
      size: 20,
      totalElements: 0,
      totalPages: 0
    },
    multipleSelection: []
  },
  actions,
  mutations,
  getters
}
