import fetch from '@/utils/fetch'
export const getOrgLevels = (organizationLevel) => { // 获取部门
  return fetch({
    'url': `/org/orgLevel?organizationLevel=${organizationLevel}`,
    method: 'get'
  })
}
