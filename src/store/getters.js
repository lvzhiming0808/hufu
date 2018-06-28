export default {
  loginName: state => state.user.loginName,
  auth: state => state.user.auth,
  showName: state => state.user.showName,
  avatar: state => state.user.avatar,
  branch: state => state.user.branch,
  job: state => state.user.job,
  recordList: state => state.player.recordList,
  currentId: state => state.player.currentId,
  basicError: state => state.player.basicError,
  errorTime: state => state.player.errorTime,
  comment: state => state.player.comment,
  isCurrentBad: state => state.player.isCurrentBad,
  organization: state => state.user.organization
}
