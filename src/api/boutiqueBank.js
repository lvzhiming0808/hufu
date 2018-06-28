/**
 * @Author: luoquanquan
 * @Date: 2017-11-27 16:02:04
 * @Last Modified by: luoquanquan
 * @Last Modified time: 2017-12-05 11:25:21
 */
import fetch, { download } from '@/utils/fetch'

// 所有四级组织结构
export const orgs = data => fetch({
  url: '/calls/commons/orgs',
  data
})

// 优秀类型枚举
export const goodType = () => fetch('/calls/commons/goodTypes')

// 获取策略精品列表
export const strategies = data => fetch({
  url: '/boutiques/strategies',
  data
})

// 获取销售录音列表
export const records = data => fetch({
  url: '/boutiques/records',
  data
})

// 获取录音类型选择列表
export const items = () => fetch('/boutiques/items')

// 优秀录音下载
export const batchDownloadRecords = data => {
  download(`/boutiques/batchDownloadRecords?recordIds=${data.toString()}`)
}

// 军团策略话术下载
export const batchDownload = data => {
  download(`/strategies/batchDownload?strategyIds=${data.toString()}`)
}
