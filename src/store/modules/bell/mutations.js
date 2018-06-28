import * as types from './actionsTypes'
export default {
  [types.UPDATE_BELLMESSAGE_COUNT](state, value) {
    state.totleNum = value
  },
  [types.UPDATE_BELLMESSAGE_CONTENT](state, value) {
    state.contents = value.map(item => {
      const nameArr = ['策略动态', 'SOP 反馈', '系统通知']
      const urlArr = ['/messageCenter/myStrategy', '/messageCenter/sop', '/messageCenter/system']
      return {
        number: item.number,
        name: nameArr[+item.type],
        url: urlArr[+item.type]
      }
    })
  }
}
