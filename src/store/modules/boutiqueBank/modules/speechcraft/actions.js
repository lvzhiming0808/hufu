/**
 * @Author: luoquanquan
 * @Date: 2017-11-27 16:02:11
 * @Last Modified by: luoquanquan
 * @Last Modified time: 2017-12-15 11:30:12
 */
import { Message } from 'element-ui'
import * as types from '../actionTypes'
import {
  timeStart,
  timeEnd
} from '@/utils/formatTime'
import {
	orgs,
  strategies,
  items,
  batchDownload
} from '@/api/boutiqueBank'

export default {
  async [types.INIT_PAGE]({ commit, dispatch, state }) {
    if (state.structureValue.length) {
      if (sessionStorage.getItem('clear-speechcraft-data') === '1') {
        dispatch(types.HANDLE_RESET)
        sessionStorage.setItem('clear-speechcraft-data', 0)
      } else {
        dispatch(types.HANDLE_SEARCH)
      }
      return
    }
    commit(types.SET_STRUCTUREVALUE, data2cities(await orgs()))
    commit(types.SET_ITEMTYPEVALUE, data2cities(await items()))
    commit(types.SET_OWN, '1')
    dispatch(types.HANDLE_RESET)
  },
  async [types.INIT_PAGE1]({ commit, dispatch, state }) {
    if (state.structureValue.length) {
      if (sessionStorage.getItem('clear-speechcraft-data') === '1') {
        dispatch(types.HANDLE_RESET)
        sessionStorage.setItem('clear-speechcraft-data', 0)
      } else {
        dispatch(types.HANDLE_SEARCH)
      }
      return
    }
    commit(types.SET_STRUCTUREVALUE, data2cities(await orgs()))
    commit(types.SET_ITEMTYPEVALUE, data2cities(await items()))
    dispatch(types.HANDLE_RESET)
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
        if (len < 4) dispatch(types.HANDLE_SEARCH)
      }
      if (currentList.length && i !== 2) {
        continue
      } else {
        currentItem.cities = data2cities(await orgs({ id: currentId }), i, commit)
      }
    }
  },
  async [types.HANDLE_SEARCH]({ commit, state, dispatch }) {
    const searchData = generateData(state)
    const tableData = await strategies(searchData)
    const {
      content,
      ...pagination
    } = tableData

    // 用于用户选择组织架构时, 当用户选择了没有精品的组织级别
    // 直接弹出友情提示
    if (!content.length) {
      Message({
        type: 'warn',
        message: '当前条件没有筛选到精品, 请更换筛选条件重试',
        customClass: 'element-ui-message'
      })
    }
    commit(types.SETTABLE, content)
    commit(types.SETPAGINATION, pagination)
  },
  [types.TOGGLEPAGINATION]({ commit, dispatch }, target) {
    commit(types.TOGGLEPAGINATION, target)
    dispatch(types.HANDLE_SEARCH)
  },
  [types.HANDLE_RESET]({ commit, dispatch }) {
    commit(types.SETPAGINATION, {
      number: 1,
      size: 20,
      totalElements: 0,
      totalPages: 0
    })
    commit(types.UPDATE_STRUCTURE, 3)
    commit(types.SET_TIME, '')
    commit(types.SET_SCREENINGDIMENSION, ['juntuan'])
    commit(types.SET_GOODTYPE, '')
    commit(types.RESET_SELECTEDSTRUCTUREVALUE)
    commit(types.SET_ITEMTYPE, '')
    commit(types.UPDATE_STRUCTURE, 0)
    dispatch(types.HANDLE_SEARCH)
  },
  [types.SET_OWN]({ commit, dispatch }, value) {
    commit(types.SET_OWN, value)
    dispatch(types.HANDLE_RESET)
  },
  [types.HANDLE_DOWNLOAD]({ state }) {
    // 当前选中的精品条目数为0时, 不允许下载
    // 脑残了 20171206 lqq
    if (state.multipleSelection.length) {
      batchDownload(state.multipleSelection.map(item => item.id))
    } else {
      Message({
        type: 'info',
        message: '当前没有选择任何话术, 请勾选后再下载...',
        customClass: 'element-ui-message'
      })
    }
  },
  [types.SET_SCREENINGDIMENSION]({ commit }, value) {
    commit(types.SET_SCREENINGDIMENSION, value)
    commit(types.SET_TIME, '')
    commit(types.UPDATE_STRUCTURE, 0)
    commit(types.HANDLE_SELECTEDSTRUCTUREVALUE, { i: 0 })
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

const generateData = state => (
  Object.assign({}, {
    own: state.own,
    pageSize: 20,
    pageNum: state.pagination.number
  }, state.screeningDimension.length > 1
      ? state.screeningDimension[state.screeningDimension.length - 1] === 'month'
        ? {
          endTime: timeEnd(state.time, 'month'),
          startTime: timeStart(state.time, 'month')
        }
        : {
          endTime: timeEnd(state.time),
          startTime: timeStart(state.time)
        }
      : {
        levelOne: state.enterpriseId,
        levelTwo: state.groupId,
        levelThree: state.sellId,
        levelFour: state.sellGroupId
      }
  )
)
