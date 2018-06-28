/**
 * @Author: luoquanquan
 * @Date: 2017-11-10 18:43:11
 * @Last Modified by: luoquanquan
 * @Last Modified time: 2017-12-18 19:10:08
 */

import fetch, { download } from '@/utils/fetch'
import axios from 'axios'
import store from '@/store'

// ==========  左侧录音详情相关的接口  ===========================================
// 获取左侧录音列表
export const selectRecordShoppingCartList = () =>
  fetch('/qc/tasks')

// ==========  获取录音详情接口  ================================================
// 获取录音详情
export const selectRecordDetails = () => axios.all([
  fetch.get(`/qc/tasks/${store.getters.currentId}/base`),
  fetch.get(`/qc/tasks/${store.getters.currentId}/strategy`)
]).then(axios.spread((...args) => {
  return Promise.resolve(args)
}))

// 获取录音详情(录音地址, 错误时间等等)
export const getMusic = () =>
  fetch(`/qc/tasks/${store.getters.currentId}/violation`)

export const toggleRecordType = data => fetch({
  url: `/qc/tasks/${store.getters.currentId}/strategy`,
  data
})

// ==========  备注相关接口  ====================================================
// 备注提交接口
export const addRecordCommit = (comment) => fetch({
  url: `/record/addRecordCommit/${store.getters.currentId}`,
  method: 'POST',
  data: {
    comment
  }
})

// ==========  违规相关的接口  ==================================================
// 获取违规详情
export const selectRecordViolation = violationInfoId =>
	fetch(`/qc/tasks/${store.getters.currentId}/violations/${violationInfoId}`)

// 录音违规提交
export const addRecordViolation = data => fetch({
  url: `/qc/tasks/${store.getters.currentId}/violation`,
  method: 'POST',
  data
})

// 违规否定接口
export const deleteViolation = data => fetch({
  url: `/qc/tasks/${store.getters.currentId}/violations/${data}`,
  method: 'delete'
})

// ==========  小型选择框枚举接口  ==============================================
// 录音详情页问题类型二级联动
export const selectRecordQuestionGanged = data => fetch({
  url: `/calls/commons/questions/ganged`,
  data
})

// 录音违规三级联动查询
export const selectRecordViolationGanged = data => fetch({
  url: '/calls/commons/violations/ganged',
  data
})

// 取证目的枚举查询
export const aim = () => fetch('/calls/commons/aims')

// 优秀类型枚举
export const goodType = () => fetch('/calls/commons/goodTypes')

// 录音性质枚举查询
export const recType = () => fetch('/calls/commons/recTypes')

// 录音类型枚举查询
export const recordType = () => fetch('/calls/commons/types')

// 学员现状枚举查询
export const state = () => fetch('/calls/commons/states')

// ==========  打分相关  =======================================================
// 全部提交接口
export const addRecordScoreToSubmit = () => fetch({
  url: '/qc/tasks/submit',
  method: 'post',
  data: store.getters.recordList.map(item => item.id)
})

// 录音质检打分保存
export const addRecordScoreToSave = data => fetch({
  url: `/qc/tasks/${store.getters.currentId}/save`,
  method: 'post',
  data
})

// 机器判定违规确认
export const confirmBadByjiqi = (callId, violationInfoId) => fetch({
  url: `/qc/tasks/${callId}/violations/${violationInfoId}`,
  method: 'put'
})

// ==========  精品话术下载  ====================================================

export const verbalTrickDownload = strategyPhaseId => {
  download(`/strategies/${strategyPhaseId}/verbalTrickDownload`)
}

// 一键取消录音列表的接口

export const oneCancel = (data) => {
  return fetch({
    url: '/qc/records/delete',
    method: 'post',
    data
  })
}
// 学员现状枚举查询
export const oneTwo = () => fetch('/calls/commons/projects')

// 学员年龄段
export const ageGroup = (data) => {
  return fetch({
    url: '/calls/commons/ages',
    method: 'get',
    data
  })
}

// 最高学历
export const heightEducation = (data) => {
  return fetch({
    url: '/calls/commons/degrees',
    method: 'get',
    data
  })
}

// 咨询学历层次
export const seekdeage = (data) => {
  return fetch({
    url: '/calls/commons/consultDegrees',
    method: 'get',
    data
  })
}

// 用户满意度
export const satisfied = (data) => {
  return fetch({
    url: '/calls/commons/satisfactions',
    method: 'get',
    data
  })
}

// 咨询师专业度
export const majordegree = (data) => {
  return fetch({
    url: '/calls/commons/professionalDegrees/0',
    method: 'get',
    data
  })
}
// 咨询师专业度
export const majordegree1 = (data) => {
  return fetch({
    url: '/calls/commons/professionalDegrees/1',
    method: 'get',
    data
  })
}

// 咨询师专业度
export const majordegree2 = (data) => {
  return fetch({
    url: '/calls/commons/professionalDegrees/2',
    method: 'get',
    data
  })
}

// 咨询师专业度
export const majordegree3 = (data) => {
  return fetch({
    url: '/calls/commons/professionalDegrees/3',
    method: 'get',
    data
  })
}

// 二次判断录音违规点
export const secondqc = (id, data) => {
  return fetch({
    url: `qc/${id}/secondqc?secRemark=${data}`,
    method: 'post'
  })
}
