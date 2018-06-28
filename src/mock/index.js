import Mock from '../../other_modules/mockjs/dist/dist/mock'
import loginApi from './login'
import strategyApi from './strategy'
import approvalsApi from './approval'

Mock.setup({
  timeout: '350-650'
})
Mock.mock(/\/login/, 'post', loginApi.login)
Mock.mock(/\/users/, 'get', loginApi.getUserInfo)
// Mock.mock(/\/strategy\/addStrategyBase/, 'post', strategyApi.getStrategies)
// Mock.mock(/\/approvaldata/,'post',approvalsApi.getapprovalData)
Mock.mock(/\/strategies/, 'post', strategyApi.getStrategies)
Mock.mock(/\/approvaldata/, 'post', approvalsApi.getapprovalData)
export default Mock
