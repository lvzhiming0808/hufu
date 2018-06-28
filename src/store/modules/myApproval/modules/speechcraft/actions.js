import * as types from '../actionTypes'
import {
} from '@/utils/formatTime'
import {
	orgs
} from '@/api/boutiqueBank'

export default {
  async [types.INIT_PAGE]({ commit, dispatch, state }) {
    if (state.structureValue.length) return
    commit(types.SET_STRUCTUREVALUE, data2cities(await orgs()))
  },
  async [types.UPDATE_STRUCTUREVALUE]({ commit, state, dispatch }, label) {
    let currentList = state.structureValue
    for (let i = 0, len = label.length; i < len; i++) {
      const currentId = findIdByLabel(label[i], currentList)[1]
      const currentItem = findIdByLabel(label[i], currentList)[2]
      currentList = findIdByLabel(label[i], currentList)[0]
      commit(types.UPDATE_STRUCTURE, i)
      commit(types.UPDATE_STRUCTUREVALUE, {
        currentId,
        deep: i
      })
      if (i === len - 1) {
        commit(types.HANDLE_SELECTEDSTRUCTUREVALUE, {
          text: label[i],
          i
        })
      }
      if (currentList.length && i !== 2) {
        continue
      } else {
        currentItem.cities = data2cities(await orgs({ id: currentId }), i, commit)
      }
    }
  }

}

const findIdByLabel = (label, currentItem) => {
  const currentItem2 = currentItem.filter(item =>
    item.label === label)[0]
  return [currentItem2.cities, currentItem2.id, currentItem2]
}

const data2cities = (data, deep, commit) => {
  if (deep && deep === 2) {
    commit(types.SET_SELLGROUPIDVALUE, data)
  }
  return data.map(item => {
    if (deep && deep === 2) {
      return {
        label: item.name,
        id: item.id
      }
    } else {
      return {
        label: item.name,
        id: item.id,
        cities: []
      }
    }
  })
}
