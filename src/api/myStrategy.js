import fetch from '@/utils/fetch'
export const getArea = () => { // 获取部门
  const code = '213456'
  return fetch({
    'url': `/org/${code}`
  })
}

export const findByConditions = (data) => { // 策略话术排行榜
  return fetch({
    url: '/reports/strategyWords',
    method: 'get',
    data
  })
}
export const queryStrategy = (data) => { // 策略列表
  return fetch({
    url: '/strategies',
    method: 'get',
    data
  })
}

export const queryGoodStrategy = (data) => { // 优秀策略话术推荐
  return fetch({
    url: '/boutiques/strategies',
    method: 'get',
    data
  })
}

export const queryGoodRecord = (data) => { // 优秀录音推荐
  return fetch({
    url: '/boutiques/records',
    method: 'get',
    data
  })
}
