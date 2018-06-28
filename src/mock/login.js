import qs from 'qs'
const users = {
  // 事业部老大
  boss: {
    roles: ['boss'],
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509162704890&di=f270047da529a3dacce18b0d3c8f112c&imgtype=0&src=http%3A%2F%2Fimg7.d.cn%2Fbe%2Fimage%2F1701%2Fhm3p3iy3tit50.jpg',
    showName: '邓超',
    branch: '奔跑吧兄弟事业部',
    job: '吹牛'
  },
  legatus: {
    roles: ['legatus'],
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509162556558&di=536d513da05dd0d330f1b78b415dc953&imgtype=0&src=http%3A%2F%2Fcyimg.quji.com%2Fnewsimg%2F2015%2F12%2F02%2Fa3e1f8f50ccb9c50c3db44781efaac43.jpg',
    showName: '王健林',
    branch: '万达事业部',
    job: '实现小目标'
  },
  sop: {
    roles: ['sop'],
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509162762092&di=abfda3df73e98c59724a14f1064fcfc7&imgtype=0&src=http%3A%2F%2Fp4.qhimg.com%2Ft01313b58e6b825c3a4.png',
    showName: '马化腾',
    branch: '企鹅孵化事业部-腾讯军团-抄袭不打草稿事业部抄袭不打草稿事业部抄袭不打草稿事业部抄袭不打草稿事业部',
    job: '我也不知道'
  }
}

export default {
  login(userInfo) {
    userInfo = qs.parse(userInfo.options.body)
    return {
      code: 200,
      data: userInfo.loginName
    }
  },
  getUserInfo(options, data) {
    const role = options.requestHeaders.Authorization
    return users[role]
  }
}
