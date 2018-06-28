import fetch from '@/utils/fetch'

// 登陆接口
export const login = data => fetch({
  url: '/login',
  method: 'post',
  isLogin: true,
  data
})

// 获取角色信息
export const getInfo = () => fetch('/users/me')
