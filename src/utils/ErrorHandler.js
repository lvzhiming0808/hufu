import qs from 'qs'
import { Message } from 'element-ui'
// import ErrorLog from '@/store/ErrorLog'
const REPORT_URL = 'http://localhost:8889/report'

/**
 * @method add 增加一条错误信息
 * @method report 向服务器上报错误信息, 用于前端错误统计
 * @method show 对于需要展示的错误信息, 想用户弹出友好展示
 * @class ErrorHandler
 */
class ErrorHandler {
  static getInstance() {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }
  /**
   * @function add 增加一条错误信息, 默认存入 errLog 对象中
   * @param {any} err
   * @param {boolean} [isShow=false]
   * @param {boolean} [isReport=false]
   * @memberof ErrorHandler
   */
  add(err, isShow = false, isReport = false) {
    // ErrorLog.pushLog(err)

    if (isShow && err.type === 'connection') {
      this.show(err)
    }

    if (isReport) {
      this.report(err)
    }
  }

  show(err) {
    Message({
      message: err.err.message,
      type: 'error',
      duration: 3e3
    })
  }

  report(err) {
    const reportObj = new Image()
    reportObj.src = `${REPORT_URL}?${qs.stringify(err)}`
    reportObj.onload = () => {
    }
    reportObj.onerror = () => {
    }
  }
}

export default ErrorHandler.getInstance()
