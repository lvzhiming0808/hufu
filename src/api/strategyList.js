import fetch from '@/utils/fetch'

export const getRecord = (id) => {
  return fetch({
    url: `/reports/judgeStrategy/${id}`
  })
}
