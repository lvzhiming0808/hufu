import { pull } from '@/api/messageCenter'
import MessagePop from './MessagePop'
import BellMessage from './BellMessage'
let instance = null
const defaultOptions = {
  timeInterval: 5e3
}
class MessagePull {
  constructor(defaultOptions) {
    this.timeInterval = defaultOptions.timeInterval
    this.timer = null
    this.pull()
    instance = instance || this
    return instance
  }

  stop() {
    this.timer && clearTimeout(this.timer)
  }

  pull() {
    pull().then(res => {
      this.handleMessage(res)
      this.preparePull()
    }).catch(() => {
      this.preparePull()
    })
  }

  handleMessage(msg) {
    BellMessage.updateBellMessage(msg.bellMsg)
    MessagePop.popMessage(msg.pushMsg)
  }

  preparePull() {
    this.timer = setTimeout(() => {
      this.pull()
    }, this.timeInterval)
  }
}

export default new MessagePull(defaultOptions)
