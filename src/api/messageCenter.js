import fetch from '@/utils/fetch'

// 获取消息列表
export const messages = data => fetch({
  url: '/messages',
  data
})

// 批量标记为已读
export const status = data => fetch({
  url: '/messages/status',
  method: 'put',
  data
})

// 消息中心"推送型消息拉取"
export const pull = () => fetch('/messages/push')

export const statusByType = data => fetch({
  url: '/messages/statusByType',
  method: 'put',
  data
})
