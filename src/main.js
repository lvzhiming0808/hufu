import Vue from 'vue'
import ElementUI from 'element-ui'
import '../theme/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import * as filters from './utils/filters'
import ErrorHandler from './utils/ErrorHandler'
import App from './App'
import permission from './plugins/Permision'
import router from './router'
import store from './store'
import moment from 'moment'
import './permission'
import 'normalize.css/normalize.css'
import './styles/common.styl'
import '@/icons'
import './plugins/messagePull'

// 引入表单验证的插件veeValidate
Vue.use(permission)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('date-string', function(value) { // value就是日期值
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    const error = {
      type: 'vue',
      err,
      url: window.location.href,
      vm
    }
    ErrorHandler.add(error)
  }
}

/* eslint-disable no-new */
window.eventBus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
