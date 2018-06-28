/**
 * @Author: luoquanquan
 * @Date: 2017-11-12 23:29:33
 * @Last Modified by: luoquanquan
 * @Last Modified time: 2017-12-01 15:37:01
 */
import fetch from '@/utils/fetch'
// ==========  录音列表  ========================================================
// 获取录音打包列表
export const selectRecordList = data => fetch({
  url: '/calls',
  data
})

// 上报用户已勾选的录音条目
export const addRecordsToList = data => fetch({
  url: '/qc/tasks',
  method: 'post',
  data
})

// ==========  筛选录音条件  ====================================================
// 录音类型枚举
export const recordType = () => fetch('/calls/commons/types')

// 录音性质枚举查询
export const recType = () => fetch('/calls/commons/recTypes')

// 学员现状枚举查询
export const state = () => fetch('/calls/commons/states')

// 所有四级组织结构
export const orgs = data => fetch({
  url: '/calls/commons/orgs',
  data
})

// 选中录音列表
export const selectRadios = () => fetch('/qc/tasks')

