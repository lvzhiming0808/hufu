import fetch from '@/utils/fetch'
export const datalist = (data) => { // 数据列表
  return fetch({
    // url: '/analysis/findByConditions',
    data
  })
}

export const addRemark = (id, data) => { // 添加备注
  return fetch({
    url: `reports/${id}/comments`,
    method: 'POST',
    data
  })
}
