import { Message } from 'element-ui'
import * as types from './actionTypes'
import {
  selectRecordShoppingCartList,
  addRecordScoreToSubmit,
  addRecordScoreToSave,
  selectRecordDetails,
  toggleRecordType,
  recordType,
  getMusic,
  recType,
  state,
  aim,
  ageGroup,
  heightEducation,
  seekdeage,
  satisfied,
  majordegree,
  majordegree1,
  majordegree2,
  majordegree3,
  goodType } from '@/api/player'

export default {
  async [types.INIT_PLAYERDETAIL]({ commit, dispatch }) {
    commit(types.SET_PLAYERMODE, 'playerdetail')
    commit(types.HANDLE_OPERATIONLOCK, true)
    await dispatch(types.GET_LIST)
    await dispatch(types.GET_MUSIC)
    await dispatch(types.GET_BASEINFO)
  },
  async [types.INIT_PLAYER]({ commit, dispatch }) {
    commit(types.SET_PLAYERMODE, 'score')
    await dispatch(types.GET_LIST)
    await dispatch(types.GET_MUSIC)
    await dispatch(types.GET_BASEINFO)
    commit(types.SET_ALLTIME, state.timeLength)
  },
  async [types.INIT_DETAIL]({ commit, state, dispatch }, id) {
    state.currentId = id
    commit(types.SET_PLAYERMODE, 'detail')
    commit(types.HANDLE_OPERATIONLOCK, true)
    await dispatch(types.GET_MUSIC)
    await dispatch(types.GET_BASEINFO)
  },
  // 获取左侧列表
  async [types.GET_LIST]({ commit }) {
    const musicList = await selectRecordShoppingCartList()
    if (musicList.length) {
      commit(types.SET_LIST, musicList)
      commit(types.HANDLE_CHOOSEITEM)
      return Promise.resolve()
    }

    alert('您还没有选取录音, 快到筛选页面选取把...')
    window.history.back()
  },
  async [types.GET_BASEINFO]({ commit }) {
    commit(types.SET_LOADING, true)

    const [
			{
        studentAndOrder,
        checkInfo,
        errors,
        errorBasic,
        isSecQuality,
        secRemark
      },
			{
        recordStrategy,
        strategyPhaseInfo
      }
		] = await selectRecordDetails()

    commit(types.SET_BASICERROR, errorBasic)
    commit(types.SET_STUDENTANDORDER, studentAndOrder)
    commit(types.SET_AGESTAGE, studentAndOrder.ageStage)
    commit(types.SET_SEX, studentAndOrder.sex)
    commit(types.SET_DEGREE, studentAndOrder.degree)
    commit(types.SET_CONSULTDEGREESTAGE, studentAndOrder.consultDegreeStage)
    commit(types.SET_MAJORTYPEONENAME, studentAndOrder.majorTypeOneName)
    commit(types.SET_MAJORTYPETWONAME, studentAndOrder.majorTypeTwoName)
    commit(types.SET_SEX, studentAndOrder.sex)
    commit(types.GET_ISSECQUALITY, isSecQuality)
    commit(types.GET_SECREMARK, secRemark)

    commit(types.SET_RECORDTYPE, checkInfo.recordType)
    commit(types.HANDLE_ISWATER, checkInfo.isWater)
    commit(types.HANDLE_FORFEIT, checkInfo.forfeit)
    commit(types.SET_RECTYPE, checkInfo.recType)
    commit(types.SET_STATE, checkInfo.state)
    commit(types.SET_AIM, checkInfo.aim)
    commit(types.SET_PROFESSIONALDEGREENUMONE, checkInfo.professionalDegreeNumOne)
    commit(types.SET_PROFESSIONALDEGREENUMTWO, checkInfo.professionalDegreeNumTwo)
    commit(types.SET_PROFESSIONALDEGREENUMTHREE, checkInfo.professionalDegreeNumThree)
    commit(types.SET_PROFESSIONALDEGREENUMFOUR, checkInfo.professionalDegreeNumFour)
    commit(types.SET_SATISFACTIONNUM, checkInfo.satisfactionNum)
    commit(types.SET_FINISHNUM, checkInfo.finishNum)
    commit(types.SET_ISGOOD, checkInfo.isGood)
    commit(types.SET_GOODTYPE, checkInfo.goodType)
    commit(types.SET_QUESTIONS, checkInfo.questions)
    commit(types.SET_ISVIOLATION, checkInfo.isViolation)
    commit(types.SET_ERRORS, errors)
    commit(types.SET_RECORDSTRATEGY, recordStrategy)
    commit(types.SET_STRATEGYPHASEINFO, strategyPhaseInfo)
    commit(types.HANDLE_EVALUATE, checkInfo.comment)
    commit(types.SET_LOADING, false)
  },
  // 切换录音性质, 切换录音性质时, 需要对应切换打分表中的内容
  async [types.SET_RECTYPE]({ commit, dispatch }, recType) {
    commit(types.SET_LOADING, true)
    commit(types.SET_RECTYPE, recType)
    const {
      recordStrategy,
      strategyPhaseInfo
    } = await toggleRecordType({ recType })
    commit(types.SET_RECORDSTRATEGY, recordStrategy)
    commit(types.SET_STRATEGYPHASEINFO, strategyPhaseInfo)
    commit(types.SET_LOADING, false)
  },
  [types.GET_SELECTERS]({ commit }) {
    const selecterIndex = [
      types.SET_RECORDTYPEVALUE,
      types.SET_RECTYPEVALUE,
      types.SET_STATEVALUE,
      types.SET_AIMVALUE,
      types.SET_GOODTYPEVALUE,
      types.SET_AGEGROUP,
      types.SET_HEIGHTEDUCATION,
      types.SET_SEEKDEAGE,
      types.SET_SATISFIEDVALUE,
      types.SET_MAJORDEGREEVALUE,
      types.SET_MAJORDEGREEVALUE1,
      types.SET_MAJORDEGREEVALUE2,
      types.SET_MAJORDEGREEVALUE3
    ]
    const funcs = [
      recordType,
      recType,
      state,
      aim,
      goodType,
      ageGroup,
      heightEducation,
      seekdeage,
      satisfied,
      majordegree,
      majordegree1,
      majordegree2,
      majordegree3
    ]
    funcs.forEach((fun, i) => {
      fun().then(res => {
        res = res.filter(item => item.id !== 'null')
        commit(selecterIndex[i], res)
      })
    })
  },
  /**
   * 质检打分保存, 调用时机
   * 1. 切换录音时
   * 2. 全部提交前
   */
  [types.HANDLE_SAVESCOREINFO]({ commit, state, dispatch }, isSubmit = false) {
    const data = {
      aim: state.aim,
      comment: state.comment,
      finishNum: state.finishNum,
      goodType: state.goodType,
      questions: state.questions,
      recType: state.recType,
      recordId: state.currentId,
      recordStrategies: state.recordStrategy,
      recordType: state.recordType,
      state: state.state,
      isGood: state.isGood,
      timeLength: state.timeLength,
      majorTypeOneName: state.majorTypeOneName,
      majorTypeTwoName: state.majorTypeTwoName,
      sex: state.sex, // 学员性别
      satisfactionNum: state.satisfactionNum, // 用户满意度
      professionalDegreeNumOne: state.professionalDegreeNumOne, // 咨询师专业度
      professionalDegreeNumTwo: state.professionalDegreeNumTwo, // 咨询师专业度1
      professionalDegreeNumThree: state.professionalDegreeNumThree, // 咨询师专业度2
      professionalDegreeNumFour: state.professionalDegreeNumFour, // 咨询师专业度3
      ageStage: state.ageStage, // 学员年龄段
      degree: state.degree, // 目前最高学历
      consultDegreeStage: state.consultDegreeStage, // 咨询学历层次
      isWater: state.isWater, // 是否扣除流水
      forfeit: state.forfeit// 罚款金额
    }
    for (const i in data) {
      if (i === 'goodType' || i === 'majorTypeOneName' || i === 'majorTypeTwoName' || i === 'satisfactionNum' || i === 'sex' || i === 'professionalDegreeNumOne' || i === 'professionalDegreeNumTwo' || i === 'professionalDegreeNumThree' || i === 'professionalDegreeNumFour' || i === 'ageStage' || i === 'degree' || i === 'consultDegreeStage') continue
      if (i === 'isGood') {
        if (data[i] === '1') {
          if (!data['goodType']) {
            Message({
              type: 'error',
              message: '优秀类型不能为空',
              customClass: 'element-ui-message'
            })
            return 0
          }
        }
      }
      if (i === 'comment') {
        if (data[i].length > 100) {
          Message({
            type: 'error',
            message: '评价不得超过100字符',
            customClass: 'element-ui-message'
          })
          return 0
        }
        continue
      }
      if (i === 'questions') {
        for (const j in data[i]) {
          for (const k in data[i][j]) {
            if (k === 'id' || k === 'type') continue
            if (k === 'description') {
              if (data[i][j][k].length > 100) {
                Message({
                  type: 'error',
                  message: '问题描述不得多于100字符',
                  customClass: 'element-ui-message'
                })
                return 0
              }
            }
            if (!data[i][j][k]) {
              Message({
                type: 'error',
                message: '参数不全, 请完成打分再切换',
                customClass: 'element-ui-message'
              })
              return 0
            }
          }
        }
      }
      if (data[i] === '') {
        Message({
          type: 'error',
          message: '参数不全, 请完成打分再切换',
          customClass: 'element-ui-message'
        })
        return 0
      }
    }
    commit(types.SET_LOADING, true)
    return new Promise((resolve, reject) => {
      addRecordScoreToSave(data).then(res => {
        // 保存成功后肯定有后续的异步操作, 所以这里的loading 状态保持
        // commit(types.SET_LOADING, false)
        // 保存成功的录音, 状态置为以保存
        commit(types.SET_CURRENTSTATUS, 1)
        if (res === true) {
          // 如果本次保存是通过全部提交按钮触发的, 不执行提示成功操作
          !isSubmit && Message({
            message: '保存成功',
            type: 'success',
            customClass: 'element-ui-message'
          })
          resolve(res)
        } else {
          Message({
            message: res.message,
            type: 'error',
            customClass: 'element-ui-message'
          })
          reject('error')
        }
      }).catch(err => {
        commit(types.SET_LOADING, false)
        Message({
          message: err.message,
          type: 'error',
          customClass: 'element-ui-message'
        })
        reject(err)
      })
    })
  },
  [types.FINISHED_MUSIC]({ commit, state }) {
    commit(types.SET_ALLTIME, state.timeLength)
  },
  async [types.HANDLE_NEXT]({ commit, dispatch, state }) {
    if (!state.saveLock || await dispatch(types.HANDLE_SAVESCOREINFO)) {
      commit(types.HANDLE_NEXT)
      await dispatch(types.GET_MUSIC)
      await dispatch(types.GET_BASEINFO)
      // dispatch(types.FINISHED_MUSIC)
    }
  },
  async [types.HANDLE_PREV]({ commit, dispatch, state }, long) {
    if (!state.saveLock || await dispatch(types.HANDLE_SAVESCOREINFO)) {
      commit(types.HANDLE_PREV)
      await dispatch(types.GET_MUSIC)
      await dispatch(types.GET_BASEINFO)
      // dispatch(types.FINISHED_MUSIC)
    }
  },
  async [types.HANDLE_CHOOSEITEM]({ commit, dispatch, state }, id, long) {
    if (!state.saveLock || await dispatch(types.HANDLE_SAVESCOREINFO)) {
      commit(types.HANDLE_CHOOSEITEM, id)
      await dispatch(types.GET_MUSIC)
      await dispatch(types.GET_BASEINFO)
      // dispatch(types.FINISHED_MUSIC)
    }
  },
  async [types.HANDLE_CHOOSEITEM1]({ commit, dispatch, state }, id, long) {
    commit(types.HANDLE_CHOOSEITEM1, id)
    await dispatch(types.GET_MUSIC)
    dispatch(types.GET_BASEINFO)
  },
  async [types.HANDLE_SUBMITSCOREINFO]({ commit, dispatch, state }) {
    commit(types.SET_LOADING, true)
    let saveRes, handleSave
    // 保存已锁定或者列表中只有一条录音尝试保存当前打分条目
    if (state.recordList.length === 1) {
      handleSave = true
      commit(types.HANDLE_SAVELOCK, false)
      saveRes = await dispatch(types.HANDLE_SAVESCOREINFO, 1)
    }

    if (state.saveLock) {
      handleSave = true
      saveRes = await dispatch(types.HANDLE_SAVESCOREINFO, 1)
    }
    if ((saveRes === 0 || saveRes !== true) && handleSave) {
      commit(types.SET_LOADING, false)
      if (state.recordList.length === 1) {
        // saveRes === 0 为前端判断的错误已经弹过窗口此处不弹
        saveRes !== 0 && Message({
          type: 'error',
          message: '提交失败',
          customClass: 'element-ui-message'
        })
      }
      return new Promise((resolve, reject) => {
        reject(0)
      })
    }
    const result = await addRecordScoreToSubmit()
    if (result === true) {
      Message({
        type: 'success',
        message: '提交成功',
        customClass: 'element-ui-message'
      })
      return Promise.resolve(true)
    } else {
      Message({
        type: 'error',
        message: result.message,
        customClass: 'element-ui-message'
      })
      commit(types.SET_LOADING, false)
      return Promise.reject()
    }
  },
  async [types.GET_MUSIC]({ state, commit }) {
    commit(types.SET_MUSIC, await getMusic())
    return Promise.resolve()
  }
}
