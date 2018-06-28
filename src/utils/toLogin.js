// import MessagePull from '../plugins/messagePull'
// import axios from 'axios'
import router from '@/router'
import store from '@/store'
export const toLogin = () => {
  store.commit('REMOVE_USERINFO')
  // MessagePull.stop()
  // 登陆拦截统一处理
  // 研发环境强行跳转至登陆页面
  // 测试生产环境重定向到 sso 登陆页面
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'sit') {
    sessionStorage.clear()
    router.push('/login')
  } else {
    if (!sessionStorage.getItem('Authorization')) {
      window.location.href = process.env.SSO_URL
    } else {
      sessionStorage.clear()
      window.location.href = process.env.LOGOUT_URL
    }
  }
}
