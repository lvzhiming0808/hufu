import fetch, { download } from '@/utils/fetch'
export const getData = () => {
  return fetch({
    url: '/strategies',
    method: 'post'
  })
}
// 获取策略属性的请求
export const getStrategyProData = (id) => {
  return fetch(
    {
      url: `/reports/strategys/${id}/properties`,
      method: 'get'
    }
  )
}
// 适用部门
export const mes = data => fetch({
  url: '/users/me',
  data
})

// 创建策略
export const createStrategy = (strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}`,
      method: 'post'
    }
  )
}
// 定义策略基本信息的请求
export const addStrategyBase = (basicFormData, strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/base`,
      method: 'post',
      data: basicFormData
    }
  )
}
// 定义创建首资的请求
export const addFirstStrategyPhase = (firstStrategyFormData, strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/phaseOne`,
      method: 'post',
      data: firstStrategyFormData
    }
  )
}

// 定义添加回访的请求
export const addSecStrategyPhase = (sevenStrategyFormData, strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/phaseTwo`,
      method: 'post',
      data: sevenStrategyFormData
    }
  )
}
  //  定义添加库存的请求
export const addFinalStrategyPhase = (finalFormData, strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/phaseThree`,
      method: 'post',
      data: finalFormData
    }
  )
}

// 定义获取策略详情的请求
export const getStrategyDetails = (strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}`,
      method: 'get'
    }
  )
}

// 获取区域列表
export const getAreas = () => {
  return fetch(
    {
      url: '/strategies/areas',
      method: 'get'
    }
  )
}
// 获取项目列表
export const getProjects = () => {
  return fetch(
    {
      url: '/strategies/projects',
      method: 'get'
    }
  )
}

// 设为精品或取消精品
export const setOrCancelUnique = (strategyId, type) => {
  return fetch(
    {
      url: `/boutiques/strategies/${strategyId}/status`,
      method: 'post',
      data: type
    }
  )
}

// 获取策略是否被当前登录用户设为精品
export const isUniqueStrategy = (strategyId) => {
  return fetch(
    {
      url: `/boutiques/strategies/${strategyId}/status`,
      method: 'get'
    }
  )
}

// 获取操作记录详情
export const getActionRecord = (strategyId, data) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/logs`,
      method: 'get',
      data
    }
  )
}
// 获取追加记录详情
export const getAddRecord = (strategyId, data) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/appendlogs`,
      method: 'get',
      data
    }
  )
}
// 获取组织结构
export const getOrganization = (data) => {
  return fetch(
    {
      url: '/org/orgLevel',
      method: 'get',
      data
    }
  )
}
// export const getOrg = (parentId) => {
//   return fetch(
//     {
//       url: `/org/${parentId}`,
//       method: 'get'
//     }
//   )
// }
// 创建获取首咨、七天、回访的数据
export const getStrategyMessages = (strategyId, data) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/phase`,
      method: 'get',
      data
    }
  )
}
// 定义策略导出接口
export const downLoadStrategy = (strategyId) => {
  download(`/strategies/${strategyId}/download`)
}
// 定义导出策略阶段的接口
export const downLoadPhase = (strategyPhaseId) => {
  download(`/strategies/${strategyPhaseId}/verbalTrickDownload`)
}

//  定义上传策略的请求
export const upLoad = (strategyPhaseId, file) => {
  return fetch(`/strategies/${strategyPhaseId}/upload`,
    {
      method: 'post',
      data: file
    }
  )
}
// 定义追加策略的接口~
export const addSecStrategyDat = (addStrategyNews, strategyId) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/appendices`,
      method: 'post',
      data: addStrategyNews
    }
  )
}
// 定义审批策略通过与驳回的接口
export const passOrReject = (strategyId, data) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/status`,
      method: 'put',
      data
    }
  )
}

// 定义备注或批注策略的接口接口
export const remarkOrNote = (strategyId, message) => {
  return fetch(
    {
      url: `/strategies/${strategyId}/advice`,
      method: 'post',
      data: message
    }
  )
}
