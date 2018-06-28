import fetch from '@/utils/fetch'

export const getDetail = (id) => {
  return fetch({
    url: `/reports/strategys/${id}`
  })
}
// export const getUsers = () => {
//   return fetch({
//     url: '/users/'
//   })
// }
export const getData = () => {

}
