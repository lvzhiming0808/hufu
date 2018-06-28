import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    // basic status
    agegroup: [],
    ageStage: '',
    heightEducation: [],
    degree: '',
    seekdeage: [],
    consultDegreeStage: '',
    sex: '',
    sexlistValue: [{ id: '0', name: '男' }, { id: '1', name: '女' }],
    isLoading: true,
    currentId: '',
    errorTime: 0,
    recordType: '',
    recordTypeValue: [],
    recType: '',
    recTypeValue: [],
    state: '',
    stateValue: [],
    aim: '',
    aimValue: [],
    professionalDegreeNumOne: '',
    majordegreeValue: [{ id: '1', name: '答非所问' }, { id: '2', name: '常规' }],
    professionalDegreeNumTwo: '',
    majordegreeValue1: [],
    professionalDegreeNumThree: '',
    majordegreeValue2: [],
    professionalDegreeNumFour: '',
    majordegreeValue3: [],
    satisfactionNum: '',
    satisfiedValue: [{ id: '1', name: '一星' }, { id: '2', name: '二星' },
    { id: '3', name: '三星' }, { id: '4', name: '四星' }, { id: '5', name: '五星' }],
    finishNum: '',
    finishNumValue: [{ id: '4', name: '4' }, { id: '6', name: '6' },
    { id: '8', name: '8' }, { id: '10', name: '10' }],
    isGood: '',
    isGoodValue: [{ id: '0', name: '否' }, { id: '1', name: '是' }],
    goodType: '',
    goodTypeValue: [],
    timeLength: '',
    // 一级项目二级项目联动
    majorTypeOneName: '',
    majorTypeTwoName: '',
    index: '',
    /**
     * saveLock it is prepare for sopper if someone wanner toggle other record
     * that should have to save the current one who had scorded
     */
    saveLock: false,
    /**
     * operationLock it will be work only when you are seeing a detail for a record
     * you can't scord for it and the illegal Masker will not be shown when you
     * hit the pause key
     */
    operationLock: false,
    /**
     * the common info for the current record, this data will be used in the
     * Player component
     */
    musicData: {},
    /**
     * basicError info use for active Illegal basic info
     * if it is a automatic Error this will be useless
     */
    basicError: null,
    /**
     * studentAndOrderInfo
     */
    studentAndOrder: null,
    /**
     * the record occupied by current user that will be shown in the left list
     * for toggle
     */
    recordList: [],
    /**
     * if current record has been confirmed for illegal this param will be true
     * the record onece confirmed to be a bad one it can't change to be a good
     */
    isCurrentBad: false,
    // questions for qulityInfo
    questions: [],
    // evaluate
    comment: '',
    isWater: '0', // 是否扣除流水
    forfeit: 0, // 罚款金额
    /**
     * for gray bad list
     */
    errorsList: [],
    // 播放器模式, 默认为 'score' 表示打分模式; 'detail 表示详情模式'
    playerMode: 'score',
    totalScore: 0,
    recordStrategy: null,
    strategyPhaseInfo: null,
    arrs: [],
    ok: 0,
    indexs: 0,
    isSecQuality: true,
    secRemark: ''
  },
  mutations,
  actions,
  getters
}
