const approvals = {
  'data': {
    'content': [{
      'status': '策略审核状态',
      'name': '第二军团',
      '': '策略名称',
      'isAddContent': '1是否追加',
      'isRead': '已读未读',
      'FirstProjectName': '项目名称',
      'organizationName': '适用部门',
      'area': '地域',
      'submitDate': '提交审核时间'
    }],
    'last': true,
    'totalPages': 1,
    'totalElements': 1,
    'number': 0,
    'size': 15,
    'sort': null,
    'first': true,
    'numberOfElements': 1
  }
}
export default {
  getapprovalData() {
    return {
      code: 200,
      data: approvals
    }
  }
}

