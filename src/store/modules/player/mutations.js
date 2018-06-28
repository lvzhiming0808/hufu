import * as types from './actionTypes'

const findCurrentIndex = (state) => {
  let i
  state.recordList.forEach((item, index) => {
    if (item.id === state.currentId) {
      i = index
    }
  })
  return i
}
export const timeF = value => {
  var length = Math.floor(value)
  var minute = Math.floor(value / 60)
  minute = ('' + minute).padStart(2, '0')
  var second = length % 60
  second = ('' + second).padStart(2, '0')
  return minute + ':' + second
}

/**
 * 刚刚切换的录音设置其保存锁为关闭
 * @param {当前状态} state
 */
const refreshOneRecord = state => {
  // state.isCurrentBad = false
  state.arrs = []
  state.saveLock = false
}

/**
 * 当任何条目有变化时锁住保存锁
 * 加载中状态除外
 */
const lockTheSaveLock = state => {
  if (!state.isLoading) state.saveLock = true
}
export default {
  [types.HANDLE_NEXT](state) {
    const index = findCurrentIndex(state)
    const currentIndex = (index + 1) % state.recordList.length
    state.currentId = state.recordList[currentIndex].id
    refreshOneRecord(state)
  },
  [types.HANDLE_PREV](state) {
    const index = findCurrentIndex(state)
    const currentIndex = (index + state.recordList.length - 1) % state.recordList.length
    state.currentId = state.recordList[currentIndex].id
    refreshOneRecord(state)
  },
  [types.HANDLE_CHOOSEITEM](state, id) {
    id
      ? state.currentId = id
      : state.currentId = state.recordList[0].id
    refreshOneRecord(state)
  },
  [types.HANDLE_CHOOSEITEM1](state, id) {
    id
      ? state.currentId = id
      : state.currentId = state.recordList[0].id
    refreshOneRecord(state)
  },
  [types.GET_ARRS](state, value) {
    state.arrs = value
  },
  // 路由的违规时间点加红点
  async [types.SET_ALLTIME](state, long) {
    if (state.musicData.errors.length > 0) {
      state.arrs = []
      state.musicData.errors.forEach((item, index) => {
        const positionL = Math.round((item.badTime / long) * 300) + 'px'
        state.arrs.push({
          id: index,
          positionL: positionL,
          badTime: timeF(item.badTime)
        })
      })
    } else {
      state.arrs = []
      return
    }
  },

  [types.IS_REDPOINTEDIT](state, value) {
    state.ok = value
  },
  [types.GET_REDPOINTINDEX](state, value) {
    state.indexs = value
  },
  [types.SET_LIST](state, list) {
    state.recordList = list
  },
  [types.GET_ISSECQUALITY](state, value) {
    state.isSecQuality = value
  },
  [types.GET_SECREMARK](state, value) {
    state.secRemark = value
  },
  [types.SET_BASICERROR](state, errorInfo) {
    state.basicError = errorInfo
  },
  [types.HANDLE_ERRORTIME](state, errorTime) {
    state.errorTime = errorTime
  },
  [types.HANDLE_COMFIRMILLEGAL](state) {
    state.isCurrentBad = true
  },
  [types.SET_ISVIOLATION](state, isViolation) {
    isViolation
      ? state.isCurrentBad = true
      : state.isCurrentBad = false
  },
  // ==========  下拉框逻辑  ====================================================
  [types.SET_RECORDTYPE](state, value) {
    state.recordType = value
    lockTheSaveLock(state)
  },
  [types.SET_RECORDTYPEVALUE](state, value) {
    state.recordTypeValue = value
  },
  [types.SET_RECTYPE](state, value) {
    state.recType = value
    lockTheSaveLock(state)
  },
  [types.SET_RECTYPEVALUE](state, value) {
    state.recTypeValue = value
  },
  [types.SET_STATE](state, value) {
    state.state = value
    lockTheSaveLock(state)
  },
  [types.SET_STATEVALUE](state, value) {
    state.stateValue = value
  },
  [types.SET_AGESTAGE](state, value) {
    state.ageStage = value
    lockTheSaveLock(state)
  },
  [types.SET_DEGREE](state, value) {
    state.degree = value
    lockTheSaveLock(state)
  },
  [types.SET_CONSULTDEGREESTAGE](state, value) {
    state.consultDegreeStage = value
    lockTheSaveLock(state)
  },
  [types.SET_SATISFACTIONNUM](state, value) {
    state.satisfactionNum = value
    lockTheSaveLock(state)
  },
  [types.SET_PROFESSIONALDEGREENUMONE](state, value) {
    state.professionalDegreeNumOne = value
    lockTheSaveLock(state)
  },
  [types.SET_PROFESSIONALDEGREENUMTWO](state, value) {
    state.professionalDegreeNumTwo = value
    lockTheSaveLock(state)
  },
  [types.SET_PROFESSIONALDEGREENUMTHREE](state, value) {
    state.professionalDegreeNumThree = value
    lockTheSaveLock(state)
  },
  [types.SET_PROFESSIONALDEGREENUMFOUR](state, value) {
    state.professionalDegreeNumFour = value
    lockTheSaveLock(state)
  },
  [types.SET_AIM](state, value) {
    state.aim = value
    lockTheSaveLock(state)
  },
  [types.SET_MAJORTYPEONENAME](state, value) {
    state.majorTypeOneName = value
    lockTheSaveLock(state)
  },
  [types.SET_MAJORTYPETWONAME](state, value) {
    state.majorTypeTwoName = value
    lockTheSaveLock(state)
  },
  [types.SET_INDEX](state, value) {
    state.index = value
  },
  [types.SET_AIMVALUE](state, value) {
    state.aimValue = value
  },
  [types.SET_FINISHNUM](state, value) {
    state.finishNum = value
    lockTheSaveLock(state)
  },
  [types.SET_SEX](state, value) {
    state.sex = value
    lockTheSaveLock(state)
  },
  [types.SET_ISGOOD](state, value) {
    state.isGood = value
    lockTheSaveLock(state)
  },
  [types.SET_GOODTYPE](state, value) {
    state.goodType = value
    lockTheSaveLock(state)
  },
  [types.SET_GOODTYPEVALUE](state, value) {
    state.goodTypeValue = value
  },
  // ========================================================
  [types.SET_ERRORS](state, value) {
    state.errorsList = value
  },
  [types.HANDLE_ADDERRORS](state, value) {
    const arr = [].concat(state.errorsList, value)
    state.errorsList = arr
    lockTheSaveLock(state)
  },
  [types.SET_LOADING](state, value) {
    state.isLoading = value
  },
  [types.SET_STUDENTANDORDER](state, value) {
    state.studentAndOrder = value
  },
  [types.SET_PROJECTS](state, value) {
    state.projects = value
  },
  [types.SET_QUESTIONS](state, value) {
    state.questions = value
  },
  [types.SET_QUESTION](state, { index, keyName, value }) {
    state.questions[index][keyName] = value
    lockTheSaveLock(state)
  },
  [types.SET_RECORDSTRATEGY](state, value) {
    state.recordStrategy = value
  },
  [types.SET_STRATEGYPHASEINFO](state, value) {
    state.strategyPhaseInfo = value
  },
  [types.SET_STRATEGYPHASEINFO](state, value) {
    state.strategyPhaseInfo = value
  },
  [types.HANDLE_EVALUATE](state, value) {
    state.comment = value
    lockTheSaveLock(state)
  },
  [types.HANDLE_ISWATER](state, value) {
    state.isWater = value
    // if (value === '1') {
    //   lockTheSaveLock(state)
    // }
  },
  [types.HANDLE_FORFEIT](state, value) {
    state.forfeit = value
  },
  [types.MARK](state) {
    state.totalScore = state.recordStrategy.filter(strategy => {
      switch (strategy.scoreType) {
        case 0: case 2: case 3: case 6: case 8: case 4:
          if (strategy.recordStrategyScores.filter(item => item.isSelect === '1')
            .length >= 1) {
            strategy.score = 1
            break
          } else {
            strategy.score = 0
            break
          }
        case 5:
          if (strategy.recordStrategyScores.filter(item => item.isSelect === '1')
            .length >= 2) {
            strategy.score = 1
            break
          } else {
            strategy.score = 0
            break
          }
        default: // case 1 and case 7
          if (strategy.recordStrategyScores.filter(item => item.isSelect === '1')
            .length >= 3) {
            strategy.score = 1
            break
          } else {
            strategy.score = 0
            break
          }
      }
      return strategy.score === 1
    }).length
  },
  [types.SET_CURRENTSTATUS](state, value) {
    const index = findCurrentIndex(state)
    state.recordList[index].status = value
  },
  [types.SET_MUSIC](state, value) {
    value.errors = value.errors.map(item => {
      return Object.assign({}, item, {
        showed: false
      })
    })
    state.musicData = value
  },
  [types.SET_PLAYERMODE](state, value) {
    state.playerMode = value
  },
  [types.HANDLE_SAVELOCK](state, value) {
    state.saveLock = value
  },
  [types.HANDLE_OPERATIONLOCK](state, value) {
    state.operationLock = value
  },
  [types.SET_TIMELENGTH](state, value) {
    state.timeLength = value
  },
  [types.SET_AGEGROUP](state, value) {
    state.agegroup = value
  },
  [types.SET_HEIGHTEDUCATION](state, value) {
    state.heightEducation = value
  },
  [types.SET_SEEKDEAGE](state, value) {
    state.seekdeage = value
  },
  [types.SET_SATISFIEDVALUE](state, value) {
    state.satisfiedValue = value
  },
  [types.SET_MAJORDEGREEVALUE](state, value) {
    state.majordegreeValue = value
  },
  [types.SET_MAJORDEGREEVALUE1](state, value) {
    state.majordegreeValue1 = value
  },
  [types.SET_MAJORDEGREEVALUE2](state, value) {
    state.majordegreeValue2 = value
  },
  [types.SET_MAJORDEGREEVALUE3](state, value) {
    state.majordegreeValue3 = value
  }
}
