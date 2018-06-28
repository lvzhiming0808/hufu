// import MessagePull from '../plugins/messagePull'
import { toLogin } from './toLogin'
import { logOut } from '@/api/logout'
export const logout = () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'sit') {
    toLogin()
  } else {
    logOut().then(res => {
      if (res === true) {
        toLogin()
      } else {
        alert('退出失败')
      }
    }).catch(err => {
      alert(err)
    })
  }
}
