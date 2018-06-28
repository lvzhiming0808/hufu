import fetch from '@/utils/fetch'
export const recordList = data => fetch({
  url: '/calls',
  data
})
// 录音类型枚举
export const recordType = () => fetch('/calls/commons/types')

// 录音性质枚举查询
export const recType = () => fetch('/calls/commons/recTypes')

// 学员现状枚举查询
export const stateUnKnow = () => fetch('/calls/commons/states')

// 所有四级组织结构
export const orgs = data => fetch({
  url: '/calls/commons/orgs',
  data
})

// sop四级组织结构
export const sopOrgs = data => fetch({
  url: '/calls/commons/orgs/sop',
  data
})

// // 定义导出抽查录音的接口
// export const downLoadRecord = () => {
//   download('/reports/record/download')
// }

