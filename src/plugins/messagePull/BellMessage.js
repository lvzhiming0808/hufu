import store from '@/store'
import * as types from '@/store/modules/bell/actionsTypes'
export default {
  updateBellMessage(msg) {
    store.commit(`bell/${types.UPDATE_BELLMESSAGE_COUNT}`, msg.totleNum)
    store.commit(`bell/${types.UPDATE_BELLMESSAGE_CONTENT}`, msg.contents)
  }
}
