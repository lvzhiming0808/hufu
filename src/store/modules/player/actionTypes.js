// ==========  全局状态类  ======================================================
export const SET_OPERATIONLOCK = 'SET_OPERATIONLOCK'
export const SET_LOADING = 'SET_LOADING'

// 初始化打分表
export const INIT_PLAYER = 'INIT_PLAYER'

// 初始化详情
export const INIT_DETAIL = 'INIT_DETAIL'

export const INIT_BOUTIQU = 'INIT_BOUTIQU'
// ==========  播放器控制类  ====================================================
export const HANDLE_NEXT = 'HANDLE_NEXT'
export const HANDLE_PREV = 'HANDLE_PREV'
export const HANDLE_CHOOSEITEM = 'HANDLE_CHOOSEITEM'
// 清空某条录音
export const HANDLE_CHOOSEITEM1 = 'HANDLE_CHOOSEITEM1'
// ==========  歌单控制类  ======================================================
export const GET_LIST = 'GET_LIST'
export const SET_LIST = 'SET_LIST'

// ===============录音质检详情页该条录音是否质检====================================
export const GET_ISSECQUALITY = 'GET_ISSECQUALITY'

// ==============是否二次质检过============
export const GET_SECREMARK = 'GET_SECREMARK'

// ========== 单曲信息类  =======================================================
// 获取录音基础信息
export const GET_BASEINFO = 'GET_BASEINFO'

// 获取录音其他信息(包括违规, url)
export const GET_OTHERINFO = 'GET_OTHERINFO'

// 设置录音基础信息(报名信息, 订单信息)
export const SET_STUDENTANDORDER = 'SET_STUDENTANDORDER'
// 一级项目二级项目联动
export const SET_PROJECTS = 'SET_PROJECTS'// 设置问题列表
export const SET_QUESTIONS = 'SET_QUESTIONS'

// ==========  违规操作类  ======================================================
// 确认当前录音为违规录音, 不可再设为优秀
export const HANDLE_COMFIRMILLEGAL = 'HANDLE_COMFIRMILLEGAL'

// 主动判定型违规, 基础信息来源
export const SET_BASICERROR = 'SET_BASICERROR'

// 主动判定型违规, 违规时间来源
export const HANDLE_ERRORTIME = 'HANDLE_ERRORTIME'

// 违规时间点标红提示
export const SET_ALLTIME = 'SET_ALLTIME'
export const GET_ARRS = 'GET_ARRS'

// 设置违规列表
export const SET_ERRORS = 'SET_ERRORS'

// 质检信息表问题模块更新
export const SET_QUESTION = 'SET_QUESTION'

// 违规填写后增加一条违规记录
export const HANDLE_ADDERRORS = 'HANDLE_ADDERRORS'

// ==========  质检打分类  ======================================================
// 设置打分表基础信息
export const SET_STRATEGYPHASEINFO = 'SET_STRATEGYPHASEINFO'

// 打分表
export const SET_RECORDSTRATEGY = 'SET_RECORDSTRATEGY'

// 打分操作
export const MARK = 'MARK'

// 评价
export const HANDLE_EVALUATE = 'HANDLE_EVALUATE'

// 质检打分保存
export const HANDLE_SAVESCOREINFO = 'HANDLE_SAVESCOREINFO'

// 打分后录音设置为已保存
export const SET_CURRENTSTATUS = 'SET_CURRENTSTATUS'

// 提交
export const HANDLE_SUBMITSCOREINFO = 'HANDLE_SUBMITSCOREINFO'

// 各种下拉框逻辑
export const GET_SELECTERS = 'GET_SELECTERS'

export const SET_RECORDTYPE = 'SET_RECORDTYPE'
export const SET_RECORDTYPEVALUE = 'SET_RECORDTYPEVALUE'

export const SET_RECTYPE = 'SET_RECTYPE'
export const SET_RECTYPEVALUE = 'SET_RECTYPEVALUE'

export const SET_STATE = 'SET_STATE'
export const SET_STATEVALUE = 'SET_STATEVALUE'

export const SET_AIM = 'SET_AIM'
export const SET_AIMVALUE = 'SET_AIMVALUE'

export const SET_FINISHNUM = 'SET_FINISHNUM'
export const SET_SEX = 'SET_SEX'

export const SET_ISGOOD = 'SET_ISGOODID'

export const SET_GOODTYPE = 'SET_GOODTYPE'
export const SET_GOODTYPEVALUE = 'SET_GOODTYPEVALUE'

// 一级项目二级项目
export const SET_MAJORTYPEONENAME = 'SET_MAJORTYPEONENAME'
export const SET_MAJORTYPETWONAME = 'SET_MAJORTYPETWONAME'

export const SET_INDEX = 'SET_INDEX'
// 是否已经被认定为违规录音
export const SET_ISVIOLATION = 'SET_ISVIOLATION'

// 是否已经认定为违规录音
export const HANDLE_CONFIRMISILLEGAL = 'HANDLE_CONFIRMISILLEGAL'

// 获取录音信息
export const GET_MUSIC = 'GET_MUSIC'
export const SET_MUSIC = 'SET_MUSIC'

// 在音乐播放后获取小红点
export const FINISHED_MUSIC = 'FINISHED_MUSIC'
// 判断是不是点击小红点然后点击的修改按钮
export const IS_REDPOINTEDIT = 'IS_REDPOINTEDIT'
export const GET_REDPOINTINDEX = 'GET_REDPOINTINDEX'

// 设置播放器模式
export const SET_PLAYERMODE = 'SET_PLAYERMODE'
// 切换保存锁
export const HANDLE_SAVELOCK = 'HANDLE_SAVELOCK'

// 切换操作锁
export const HANDLE_OPERATIONLOCK = 'HANDLE_OPERATIONLOCK'

// 事业部sop打分页面
export const INIT_PLAYERDETAIL = 'INIT_PLAYERDETAIL'

export const SET_TIMELENGTH = 'SET_TIMELENGTH'

// 年龄段
export const SET_AGEGROUP = 'SET_AGEGROUP'
export const SET_AGESTAGE = 'SET_AGESTAGE'

// 最高学历
export const SET_HEIGHTEDUCATION = 'SET_HEIGHTEDUCATION'
export const SET_DEGREE = 'SET_DEGREE'

// 咨询学历层次
export const SET_SEEKDEAGE = 'SET_SEEKDEAGE'
export const SET_CONSULTDEGREESTAGE = 'SET_CONSULTDEGREESTAGE'

// 用户满意度
export const SET_SATISFACTIONNUM = 'SET_SATISFACTIONNUM'
export const SET_SATISFIEDVALUE = 'SET_SATISFIEDVALUE'

// 咨询师专业度
export const SET_MAJORDEGREEVALUE = 'SET_MAJORDEGREEVALUE'
export const SET_PROFESSIONALDEGREENUMONE = 'SET_PROFESSIONALDEGREENUMONE'

export const SET_PROFESSIONALDEGREENUMTWO = 'SET_PROFESSIONALDEGREENUMTWO'
export const SET_MAJORDEGREEVALUE1 = 'SET_MAJORDEGREEVALUE1'

export const SET_PROFESSIONALDEGREENUMTHREE = 'SET_PROFESSIONALDEGREENUMTHREE'
export const SET_MAJORDEGREEVALUE2 = 'SET_MAJORDEGREEVALUE2'

export const SET_PROFESSIONALDEGREENUMFOUR = 'SET_PROFESSIONALDEGREENUMFOUR'
export const SET_MAJORDEGREEVALUE3 = 'SET_MAJORDEGREEVALUE3'

// 是否扣除流水
export const HANDLE_ISWATER = 'HANDLE_ISWATER'
// 罚款金额
export const HANDLE_FORFEIT = 'HANDLE_FORFEIT'
