import * as types from '../../actionTypes'

export default {
  [types.SET_MESSAGELIST](state, value) {
    state.messageList = value
  },
  [types.SET_PAGINATION](state, value) {
    state.pagenation = value
  },
  [types.MARK2READ](state) {
    state.messageList.forEach(message => {
      message.status = 1
    })
  },
  [types.TOGGLE_PAGINATION](state, target) {
    state.pagenation.number = target
  },
  [types.TOGGLE_STATUS](state, status) {
    state.status = status
  }
}
