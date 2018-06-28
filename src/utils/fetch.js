import axios from 'axios'
import qs from 'qs'
import ErrorHandler from './ErrorHandler'
import { toLogin } from '@/utils/toLogin'
import { Message } from 'element-ui'
import { getAuth, refreshAuth } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 80000
})

// request 拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'

  if (config.isLogin) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  } else {
    config.headers['Content-Type'] = 'application/json'
    if (config.method.toLowerCase() === 'post') {
      if (!~config.url.indexOf('/upload')) {
        config.data = JSON.stringify(config.data)
      }
    } else {
      config.params = config.data
      config.data = null
    }
  }

  if (getAuth()) {
    config.headers.Authorization = getAuth()
  }
  return config
}, err => {
  const error = {
    type: 'connection',
    url: window.location.href,
    err
  }
  ErrorHandler.add(error)
  Promise.reject(err)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    const { data } = response
    // if there
    if (response.headers.authorization) {
      refreshAuth(response.headers.authorization)
    }

    if (response.config.isLogin) {
      if (response.data.status === 401) {
        toLogin()
        return Promise.reject()
      }
    }
    switch (response.status) {
      case 302:
        toLogin()
        break
    }
    return data
  },
  err => {
    if (err.response.status === 401) {
      toLogin()
    }
    // 所有错误类型弹出后端给出的提示框
    Message({
      message: err.response.data.message,
      type: 'error',
      customClass: 'element-ui-message'
    })

    return Promise.reject(err)
  }
)

export const download = url => {
  window.open(`${process.env.BASE_URL}${url}`)
  // window.open(url)
}

export const upload = url => {
  return `${process.env.BASE_URL}${url}`
}

export default service
