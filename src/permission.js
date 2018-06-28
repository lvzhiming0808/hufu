import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getAuth, removeAuth } from '@/utils/auth' // 验权
import Permission from './plugins/Permision'
import { toLogin } from '@/utils/toLogin'
import { GET_INFO, REMOVE_USERINFO } from './store/modules/user/actionTypes'
import router from './router'
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'sit') {
  router.beforeEach((to, from, next) => {
    if (window.debug) {
      // console.log("ddd")
    }
    NProgress.start()
    if (getAuth()) {
      if (to.path === '/login') {
        removeAuth()
        store.commit(REMOVE_USERINFO)
        next()
      } else {
        if (!store.getters.showName) {
          store.dispatch(GET_INFO).then(response => {
            Permission.updatePermission(response.roles[0].name)
            next()
          })
        } else {
          next()
        }
      }
    } else {
      if (to.path === '/login') {
        next()
      } else {
        toLogin()
      }
      NProgress.done()
    }
  })
} else {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getAuth()) {
      if (!store.getters.showName) {
        store.dispatch(GET_INFO).then(response => {
          Permission.updatePermission(response.roles[0].name)
          next()
        })
      } else {
        next()
      }
    } else {
      toLogin()
    }
  })
}

router.afterEach(() => {
  NProgress.done()
})

