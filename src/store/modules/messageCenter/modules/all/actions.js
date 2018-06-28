import {
  messages,
  status,
  statusByType
} from '@/api/messageCenter'
import { Message } from 'element-ui'
import * as types from '../../actionTypes'

export default {
  async [types.GET_MESSAGELIST]({ commit, state }) {
    const {
			content: {
				contentNum,
				content
      },
      ...pagination
    } = await messages(
      {
        page: state.pagenation.number,
        size: state.pagenation.size,
        contentType: getContentType(),
        status: state.status
      })
    commit(types.SET_MESSAGELIST, content)
    commit(types.SET_PAGINATION, pagination)
    commit(`messageCenter/${types.UPDATA_LEFTCOUNT}`, contentNum, { root: true })
  },
  [types.MARK2READ]({ state, dispatch }, id) {
    // 点击单条消息, 将该信息标记为已读
    if (id) {
      status({ ids: id })
    } else {
      // 否则当前页码所有标记为已读
      statusByType({
        type: 3
      }).then(() => {
        Message({
          message: '全部标为已读成功',
          type: 'info',
          customClass: 'element-ui-message'
        })
        // 全部标记为已读成功后, 重新请求当前页面数据
        dispatch(types.GET_MESSAGELIST)
      })
    }
  },
  [types.TOGGLE_PAGINATION]({ commit, dispatch }, target) {
    commit(types.TOGGLE_PAGINATION, target)
    dispatch(types.GET_MESSAGELIST)
  },
  [types.TOGGLE_STATUS]({ commit, dispatch }, status) {
    commit(types.TOGGLE_STATUS, status)
    dispatch(types.GET_MESSAGELIST)
  }
}

const getContentType = () => {
  const href = location.href
  const lastUrl = href.slice(href.lastIndexOf('/') + 1)
  switch (lastUrl) {
    case 'myStrategy':
      return 0
    case 'sop':
      return 1
    case 'system':
      return 2
    default:
      return 3
  }
}
