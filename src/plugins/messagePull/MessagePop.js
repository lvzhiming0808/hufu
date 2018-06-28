let instance = null
import { Notification } from 'element-ui'
import router from '@/router'
class MessagePop {
  constructor() {
    instance = instance || this
    this.todo = [
      '<span class="text-el-icon-circle-plus-outline"> 创建</span>',
      '<span class="text-el-icon-edit-outline"> 审批</span>',
      '<span class="text-el-icon-circle-close-outline"> 驳回</span>',
      '<span class="text-el-icon-edit-outline"> 批注</span>',
      '<span class="text-el-icon-edit-outline"> 备注</span>',
      '<span class="text-el-icon-circle-plus-outline"> 追加</span>',
      '<span class="text-el-icon-star-off"> 设为精选</span>',
      '<span class="text-el-icon-star-off"> 设为精选</span>',
      '<span class="text-el-icon-document"> 分析报告已生成</span>',
      '<span class="text-el-icon-bell"> 公告信息</span>']
    window.show = instance
    return instance
  }

  popMessage(message) {
    const item = message[0]
    this.showMessage(item)
  }

  createIconClass(type) {
    // 0, 策略待审批 1, 策略已审核
    // 2, 策略已驳回 3, 策略已批注
    // 4, 策略已备注 5, 策略已追加
    // 6, 策略被精选 7，质检被精选 8, sop分析报告 9, 系统公告
    switch (type) {
      case 3: case 4:
        return 'el-icon-edit-outline'
      case 1:
        return 'el-icon-circle-check-outline'
      case 2:
        return 'el-icon-circle-close-outline'
      case 5: case 0:
        return 'el-icon-circle-plus-outline'
      case 6: case 7:
        return 'el-icon-star-off'
      case 8:
        return 'el-icon-document'
      default:
        return 'el-icon-bell'
    }
  }

  createMessage(username, type) {
    return `${username}${this.todo[type]}`
  }

  createCustomClassName() {
    return ''
  }
  showMessage(item) {
    Notification({
      title: item.subject,
      dangerouslyUseHTMLString: true,
      message: this.createMessage(item.username, item.type),
      iconClass: this.createIconClass(item.type),
      customClass: 'element-ui-message',
      position: 'bottom-right',
      onClick: () => {
        router.push(item.url)
      }
    })
  }
}

export default new MessagePop()
