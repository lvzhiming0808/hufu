import fetch from '@/utils/fetch'
export const userOrg = (data) => { // 组织架构
  return fetch({
    url: '/org/userOrg',
    method: 'get',
    data
  })
}

export const Share = (data) => { // 分享策略
  return fetch({
    url: '/boutiques/strategies/share',
    method: 'get',
    data
  })
}
export const getDetail = (id) => {
  return fetch({
    url: `/reports/integrated/${id}`
  })
}

// export const ShareRadio = (data) => { // 分享录音
//   return fetch({
//     url: '/boutiques/records/share',
//     method: 'post',
//     data
//   })
// }
export const getValidityAppendices = (id) => {
  return fetch({
    url: `/strategies/${id}/validityAppendices`
  })
}

