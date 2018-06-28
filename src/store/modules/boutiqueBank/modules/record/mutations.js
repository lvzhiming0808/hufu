import * as types from '../actionTypes'

export default {
  [types.SET_OWN](state, value) {
    state.own = value
  },
  [types.SET_SCREENINGDIMENSION](state, value) {
    state.screeningDimension = [].concat(value)
  },
  [types.SET_TIME](state, value) {
    state.time = value
  },
  [types.SET_STRUCTUREVALUE](state, value) {
    state.structureValue = value
  },
  [types.SET_GOODTYPE](state, value) {
    state.goodType = value
  },
  [types.SET_GOODTYPEVALUE](state, value) {
    state.goodTypeValue = value
  },
  [types.UPDATE_STRUCTUREVALUE](state, opts) {
    switch (opts.deep) {
      case 0:
        state.enterpriseId = opts.currentId
        break
      case 1:
        state.groupId = opts.currentId
        break
      case 2:
        state.sellId = opts.currentId
        break
      default:
        state.sellGroupId = opts.currentId
        break
    }
  },
  [types.UPDATE_STRUCTURE](state, deep) {
    const ids = [
      'enterpriseId',
      'groupId',
      'sellId',
      'sellGroupId'
    ]
    for (let i = deep, len = ids.length; i < len; i++) {
      state[ids[i]] = ''
    }
  },
  [types.SET_SELLGROUPIDVALUE](state, value) {
    state.sellGroupIdValue = value
  },
  [types.SET_CURRENTPAGE](state, value) {
    state.currentPage = value
  },
  [types.SET_ITEMTYPEVALUE](state, value) {
    state.itemTypeValue = value
  },
  [types.SETPAGINATION](state, value) {
    state.pagination = value
  },
  [types.SETTABLE](state, value) {
    state.tableData = value
  },
  [types.TOGGLEPAGINATION](state, value) {
    state.pagination.number = value
  },
  [types.SET_ITEMTYPE](state, value) {
    state.itemType = value
  },
  [types.SET_MULTIPLESELECTION](state, value) {
    state.multipleSelection = value
  },
  [types.HANDLE_SELECTEDSTRUCTUREVALUE](state, opts) {
    const temp = [...state.selectedStructureValue]
    if (opts.text) {
      state.selectedStructureValue = [...temp.slice(0, opts.i), opts.text]
    } else {
      state.selectedStructureValue = [...temp.slice(0, opts.i)]
    }
  },
  [types.RESET_SELECTEDSTRUCTUREVALUE](state) {
    state.selectedStructureValue = []
  }
}
