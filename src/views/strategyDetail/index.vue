<template>
  <div>
    <header-bar></header-bar>
    <div class="detail_wrapper">
      <el-row class="detail_header">
        <el-col :span="2" class="detail_header_list"><span @click="goList" style="cursor: pointer"><&nbsp;&nbsp;列表页</span> </el-col>
        <el-col :span="20" class="detail_btn-group">
          <span v-if="$checkRole('approval')">
            <el-button class="button" @click="toApproval" v-show="status===1" plain >审批</el-button>
          </span>
          <span v-if="$checkRole('setUniqueStrategy')">
             <el-button class="button" plain @click="shareEvent(strategy.id,strategy.boutiqueNum)" :class="{disable1: strategy.boutiqueNum ===0}">分享</el-button>
            <el-button v-show="!isUnique && status===2" class="button" plain @click="setUnique">设为精品</el-button>
            <el-button v-show="isUnique && status===2" class="button" plain @click="canCleUnique">取消精品</el-button>
          </span>
          <el-button class="button" plain @click="downLoad">导出</el-button>
          <span v-if="$checkRole('editStrategy')">
            <el-button class="button" plain v-show="(status===0 || status===3) && own===1 "  @click="toStrategyEdit">编辑</el-button>
          </span>
          <span v-if="$checkRole('addTactics')">
            <el-button @click="showAddStrategy" v-show="(status===1 || status===2) && isAddButton && own===1"  class="button" plain>追加</el-button>
          </span>
          <el-button class="button" @click="toComment" v-if="$checkRole('comment')" plain >批注</el-button>
          <el-button class="button" @click="toNote" v-if="$checkRole('remarks')" plain >备注</el-button>
          <el-button class="button" @click="addPublishStrategy" v-if="$checkRole('publishStrategy') && isPublish" plain>发布</el-button>
          <span v-if="$checkRole('createAnalysisReport')">
            <el-button class="button" plain @click="toCreatingAnalysis" v-show="oks==='1' && strategy.analyze===0 && status===2 && CreatedReport === 'true'"><span style="display: inline-block;margin-left: -3px;">创建分析报告</span></el-button>
          </span>
        </el-col>
        <el-col :span="2"><span @click="goBack" style="cursor: pointer">X</span></el-col>
      </el-row>
      <el-row class="mask" v-show="maskShow"></el-row>
      <el-row class="detail_content">
        <div style="width: 66%">
          <div class="detail_content_title">
            <span class="detail_content_strategy">{{strategy.name}}</span>
            <span class="detail_content_type" v-show="strategy.readStatus ===1">已阅</span>
          </div>
          <split></split>
          <div class="detail_strategy_basic">
            <p class="detail_strategy_basicNews">基础信息</p>
            <p class="detail_strategy_area">适用部门 : {{fullBranchName}}</p>
            <div class="detail_strategy_news">
              <span class="detail_strategy_branch">地域 : {{strategy.areaName}}</span>
              <span class="detail_strategy_project">项目 : {{strategy.firstProjectName}}</span>
            </div>
            
          </div>
          <split></split>
          <first-strategy-que :strategy="strategy" :firstStrategyPhase="firstStrategyPhase" ref="firstStrQue"></first-strategy-que>
          <div class="downLoadStrategy">
            <span class="downLoadStrategy_title">下载首资策略话术:</span>
            <span class="downLoadStrategy_file" @click="downLoadStrategyPhase(firstStrategyPhaseId)">{{firstStrategyPhase.fileName}}</span>
          </div>
          <split></split>
          <within-seven :secStrategyPhase="secStrategyPhase" ref="secQue"></within-seven>
          <div class="downLoadStrategy">
            <span class="downLoadStrategy_title">下载七天内策略话术:</span>
            <span class="downLoadStrategy_file" @click="downLoadStrategyPhase(secStrategyPhaseId)">{{secStrategyPhase.fileName}}</span>
          </div>
          <split></split>
          <repor-store :finalStrategyPhase="finalStrategyPhase"  ref="finalQue"></repor-store>
          <div class="downLoadStrategy">
            <span class="downLoadStrategy_title">下载库存策略话术:</span>
            <span class="downLoadStrategy_file" @click="downLoadStrategyPhase(finalStrategyPhaseId)">{{finalStrategyPhase.fileName}}</span>
          </div>
          <split></split>
          <competor :strategy="strategy"></competor>
        </div>
        <div style="width: 30%">
          <div class="detail_strategy_status">
            <div class="strategy_status_title">
              <span class="vertical_line"></span>
              <span>策略状态</span>
            </div>
            <div class="lines">
              <span :class="{ circle1: isAcriveCircle1, graycircle1:isGray, successCircle1: !isAcriveCircle1 }"></span>
              <span :class="{ levelLine1: isAcriveLine1, successLevelLine1: !isAcriveLine1 }"></span>
              <span :class="{ circle2: isAcriveCircle2, graycircle1: isGray, successCircle2: !isAcriveCircle2 }"></span>
              <span :class="{ levelLine2: isActiveLine2, successLevelLine2: !isActiveLine2 }"></span>
              <span :class="{ circle3: isAcrivCircle3, successCircle3: !isAcrivCircle3 }"></span>
            </div>
            <div class="strategy_status_des">
              <span class="status_submit" v-show="status !== 0">已提交</span>
              <span class="status_add" v-show="strategy.additionNum > 0">追加策略</span>
              <span class="status_approval" v-show="status===1">审批中...</span>
              <span class="status_pass" v-show="status===2">通过</span>
              <span class="status_reject" v-show="status===3">驳回</span>
            </div>
          </div>
          <div class="detail_strategy_ranking">
            <div class="strategy_status_title">
              <span class="vertical_line"></span>
              <span>排行</span>
            </div>
            <p class="ranking_number">NO.{{this.paihang.rankNum | status1}}</p>
            <div class="v_line"></div>
            <div class="ranking_rate">
              <div class="ranking_left">
                <span class="ranking_left_per">{{this.paihang.implementPercent}}</span>
                <span class="ranking_left_loop1">环比</span>
                <span class="ranking_left_loop2">{{this.paihang.implementMom}}%<span v-if="this.ok1==='1'">↑</span><span v-else style="color:#909090">↓</span></span>
                <p class="ranking_left_execute">策略执行力</p>
              </div>
              <span class="ranking_line"></span>
              <div class="ranking_middle">
                <p class="ranking_middle_per">{{this.paihang.transfer |status2}}</p>
                <p class="ranking_middle_resell">销转</p>
              </div>
              <span class="ranking_line1"></span>
              <div class="ranking_right ranking_middle">
                <p class="ranking_middle_per">{{this.paihang.rpa |status3}}</p>
                <p class="ranking_middle_resell">RPA</p>
              </div>
            </div>
          </div>
          <el-button type="warning" :disabled="lookStrategyBtn" plain @click="lookStrategyAnalysis"><span></span>查看该策略分析报告</el-button>
          <el-button type="warning" plain @click="lookDataReport(isAmaryStregy)" v-if="$checkRole('lookChartAnalyse')"><span></span>查看数据图表分析</el-button>
          <div class="detail_strategy_data">
            <div class="data_collection">
              <p class="data_collection_num">{{strategy.boutiqueNum}}</p>
              <p class="data_collection_des">精品</p>
            </div>
            <span class="ranking_line"></span>
            <div class="data_collection">
              <p class="data_collection_num">{{strategy.additionNum}}</p>
              <p class="data_collection_des">追加</p>
            </div>
            <span class="ranking_line"></span>
            <div class="data_collection">
              <p class="data_collection_num">{{strategy.postilNum}}</p>
              <p class="data_collection_des">批注</p>
          </div>
          </div>
          <div class="add_strategy_record">
            <div class="strategy_status_title">
              <span class="vertical_line"></span>
              <span>追加记录</span>
            </div>
            <div class="record_message" :key="index" v-for="(item,index) in addRecord">
              <div class="record_name">
                <p style="color: rgb(247,147,0)">{{item.username}}</p>
                <p>{{item.date|date-string}}</p>
                <p class="add_record_sta">{{item.status | status}}</p>
              </div>
              <div class="point"></div>
              <div class="record_res">
                <p v-for="(des,index) in item.contentDetails" :key="index">{{des.content}}</p>
              </div>
            </div>
            <p v-show="noAdd" style="text-align: center; margin-top: 30px; font-size: 16px; padding-bottom: 20px">暂时没有追加内容</p>
            <div class="look_more" v-show="getAddButton" @click="getAdd">查看更多</div>
            <div class="look_more" v-show="packAddButton" @click="packUpAdd">收起</div>
          </div>
          <div class="add_strategy_record">
            <div class="strategy_status_title">
              <span class="vertical_line"></span>
              <span>事业部负责人批注</span>
            </div>
            <div class="record_message" :key="index" v-for="(business, index) in businessNotes">
              <div class="record_name">
                <p style="color: rgb(247,147,0)">{{business.username}}</p>
                <p>{{business.year}}</p>
                <p>{{business.dateTime|date-string}}</p>
              </div>
              <div class="point"></div>
              <div class="record_res">
                <p>{{business.description}}</p>
              </div>
            </div>
            <p v-show="noBusinessNote" style="text-align: center; margin-top: 30px; font-size: 16px; padding-bottom: 20px">暂时没有批注内容</p>
            <div class="look_more" v-show="getNoteButton" @click="getNote">查看更多</div>
            <div class="look_more" v-show="packNoteButton" @click="packUpNote">收起</div>
          </div>
          <div class="add_strategy_record">
            <div class="strategy_status_title">
              <span class="vertical_line"></span>
              <span>备注记录</span>
            </div>
            <div class="record_message" :key="index" v-for="(remark, index) in remarkRecord">
              <div class="record_name">
                <p style="color: rgb(247,147,0)">{{remark.username}}</p>
                <p>{{remark.year}}</p>
                <p>{{remark.dateTime|date-string}}</p>
              </div>
              <div class="point"></div>
              <div class="record_res">
                <p>{{remark.description}}</p>
              </div>
            </div>
            <p v-show="noRemark" style="text-align: center; margin-top: 30px; font-size: 16px; padding-bottom: 20px">暂时没有备注内容</p>
            <div class="look_more" v-show="getRemarkButton" @click="getRemark">查看更多</div>
            <div class="look_more" v-show="packRemarkButton" @click="packUpRemark">收起</div>
          </div>
          <div class="add_strategy_record">
            <div class="strategy_status_title">
              <span class="vertical_line"></span>
              <span>操作记录</span>
            </div>
            <div class="record_message" :key="index" v-for="(action, index) in actionsRecord">
              <div class="record_name">
                <p style="color: rgb(247,147,0)">{{action.username}}</p>
                <p>{{action.dateTime|date-string}}</p>
              </div>
              <div class="point"></div>
              <div class="record_res">
                <p>{{action.description}}</p>
              </div>
            </div>
            <p v-show="noActions" style="text-align: center; margin-top: 30px; font-size: 16px; padding-bottom: 20px">暂时没有操作内容</p>
            <div class="look_more look_more_actions" v-show="getActionsButton" @click="getActions">查看更多</div>
            <div class="look_more" v-show="packActionsButton" @click="packUpActions">收起</div>
          </div>
        </div>
      </el-row>
      <el-row class="remarkBox" v-show="approvalShow">
        <div class="remarkBoxTitle">
          <span class="remarkBoxTitle_name">审批</span>
          <span class="remarkBoxTitle_close" @click="coloseRemarkBox">X</span>
        </div>
        <div class="remarkBox_is">是否通过该策略话术?</div>
        <div class="remarkBox_choice">备注(选填)</div>
        <el-input type="textarea" v-model="approvalMessages" v-validate="'max:250'" name="approvalMsg"></el-input>
        <span class="errorApproval" v-show="errors.has('approvalMsg')" >{{ errors.first('approvalMsg') }}</span>
        <div class="remarkBox_button">
          <el-button class="remarkBox_button1" @click="rejectStrategy">驳回</el-button>
          <el-button class="remarkBox_button2" @click="passStrategy">通过</el-button>
        </div>
      </el-row>
      <el-row class="noteBox" v-show="sopNoteShow">
        <div class="noteBoxTitle">
          <span class="noteBoxTitle_name">备注</span>
          <span class="noteBoxTitle_close" @click="closeNoteBox">X</span>
        </div>
        <el-input style="margin-top: 20px" v-validate="'max:250'" name="note" type="textarea" v-model="noteDetails"></el-input>
        <span class="error" v-show="errors.has('note')" >{{ errors.first('note') }}</span>
        <el-button class="noteBox_button" @click="saveMessage">保存</el-button>
      </el-row>
      <el-row class="noteBox" v-show="sopRemarkShow">
        <div class="noteBoxTitle">
          <span class="noteBoxTitle_name">批注</span>
          <span class="noteBoxTitle_close" @click="closeNoteBox">X</span>
        </div>
        <el-input style="margin-top: 20px" v-validate="'max:250'" name="remark" type="textarea" v-model="commentDetails"></el-input>
        <span class="error" v-show="errors.has('remark')" >{{ errors.first('remark') }}</span>
        <el-button class="noteBox_button" @click="saveComment">保存</el-button>
      </el-row>
    </div>
    <div class="markk" v-if="isMark">
    <div class="mark-boxs">
      <div class="box-content">
        <div class="lefts">
            <h3>将话术分享给</h3>
            <el-input @click.native="toShare($event)" class="approval-area-input" v-model="input2" readonly="readonly" placeholder="组织架构">
                <i slot="suffix" class="el-icon-arrow-right"></i>
            </el-input>
            <span slot="footer" class="dialog-footer">
              <button class="cancel" @click="cancel">取消</button>
              <button class="sure" @click="Sure">确定</button>          
            </span>
        </div>
        <div class="rights">
            <div class="tops">
              <span @click="toOne($event)"><i class="el-icon-arrow-left"></i></span>
              <button @click="resetButton($event)">重置</button>
            </div>
            <!-- <el-input class="inps" v-model="input" placeholder="组织架构">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input> -->
            <el-tree v-show="branchShow" show-checkbox node-key="id" ref="tree" @check-change="throttle(showItem)" :data="treeData" :props="defaultProps">
            </el-tree>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import HeaderBar from '../layout/HeadBar.vue'
  import Vue from 'vue'
  import split from './split.vue'
  import firstStrategyQue from './firstStrategyQue.vue'
  import withinSeven from './withinSeven.vue'
  import reporStore from './reporStore.vue'
  import competor from './competor.vue'
  import Modal from '@/components/modal'
  import confirm from '@/components/modal/confirm'
  import VeeValidate, { Validator } from 'vee-validate'
  import zh from 'vee-validate/dist/locale/zh_CN'
  import { userOrg, Share, getDetail, getValidityAppendices } from '@/api/goodStategy'
  Validator.addLocale(zh)
  const config = {
    locale: 'zh_CN'
  }
  const dictionary = {
    zh_CN: {
      messages: {
        max: () => '你输入的内容超出了字符的限制~~'
      },
      attributes: {
        remark: '批注',
        note: '备注'
      }
    }
  }
  Validator.updateDictionary(dictionary)
  Vue.use(VeeValidate, config)
  import { getStrategyDetails, setOrCancelUnique, isUniqueStrategy, getActionRecord, getAddRecord, downLoadPhase, downLoadStrategy, passOrReject, remarkOrNote } from '../../api/createStrategy'
  Vue.use(Modal, {
    modals: {
      confirm
    }
  })
  import { getStrategyProData, addSecStrategyDat } from '../../api/createStrategy'
  export default {
    components: {
      HeaderBar,
      split,
      firstStrategyQue,
      withinSeven,
      reporStore,
      competor
    },
    data() {
      return {
        input2: '',
        isMark: false,
        paihang: {},
        branchShow: true,
        branch: [],
        treeData: [],
        defaultProps: {
          children: 'item',
          label: 'name'
        },
        boutiNums: '',
        noteNumber: 1,         // 批注记录的计数
        remarkNumber: 1,     //  备注记录的计数
        actionsNumber: 1,   // 操作记录的计数
        addRecordNumber: 1,
        isUnique: null,
        status: null,
        isGray: false,
        isAcrivCircle3: true,
        isAcriveLine1: true,
        isActiveLine2: true,
        isAcriveCircle2: true,
        isAcriveCircle1: true,
        noBusinessNote: false,   // 无批注内容
        noAdd: false,  // 无追加内容
        noRemark: false, // 无备注内容
        noActions: false, // 误操作内容
        isPublish: false,   //  发布按钮
        isAddButton: true,    //  控制追加按钮
        maskShow: false,     //  控制遮罩层的显示和隐藏
        sopNoteShow: false,    //  sop备注框的显示和隐藏
        sopRemarkShow: false,   // 批注框的显示和隐藏
        getActionsButton: true, // 操作记录的查看更多
        packActionsButton: false, // 操作记录的收起按钮
        getAddButton: true,   // 追加记录的查看更多
        packAddButton: false,    // 追加记录的收起
        getNoteButton: true,         //  事业部负责人批注查看更多
        packNoteButton: false,            // 批注收起
        getRemarkButton: true,            // 备注查看更多
        packRemarkButton: false,           // 备注收起
        lookStrategyBtn: false,   // 查看分析报告 的按钮
        noteDetails: '',
        analysisId: null,
        StrategyId: null,
        isAddShow: true,
        strategyProData: { },
        strategyDetails: { },
        firstStrategyPhase: { },
        secStrategyPhase: { },
        finalStrategyPhase: { },
        strategy: { },
        approvalMessages: '',    // 审批的内容
        commentDetails: '',   // 备注的内容
        addRecord: [], // 追加记录
        approvalShow: false,      // 审批框
        businessNotes: [],     // 批注记录
        remarkRecord: [],      // 备注记录
        actionsRecord: [],     // 操作记录
        firstStrategyPhaseId: null,
        secStrategyPhaseId: null,
        finalStrategyPhaseId: null,
        own: '',  // 策略是不是自己的
        analysisReportId: null,
        isAmaryStregy: '', // 是否是军团策略
        oks: '',
        ok1: '',
        CreatedReport: ''
      }
    },
    filters: {
      status(status) {
        switch (status) {
          case 0:
            return '草稿'
          case 1:
            return '待审核'
          case 2:
            return '已通过'
          default:
            return '被驳回'
        }
      },
      status1(status1) {
        switch (status1) {
          case 0:
            return '-'
          default:
            return status1
        }
      },
      status2(status2) {
        switch (status2) {
          case null:
            return '0.0%'
          default:
            return status2
        }
      },
      status3(status3) {
        switch (status3) {
          case null:
            return '0'
          default:
            return status3
        }
      }
    },
    mounted() {
      userOrg()
      .then(res => {
        this.treeData = res
      })
      this.CreatedReport = sessionStorage.getItem('CreatedReport')
      const isCreatReport = this.$route.query.isCreatReport
      if (isCreatReport !== undefined) {
        if (isCreatReport === true || isCreatReport === 'true') {
          this.oks = '1'
        } else {
          this.oks = '0'
        }
      } else {
        this.oks = '1'
      }
    },
    computed: {
      fullBranchName() {
        const applydeparts = this.strategy.applydeparts
        if (applydeparts) {
          const ret = []
          const b = applydeparts.map(item => {
            return [item.name, [
              item.item.map(item => item.name)
            ]]
          })
          b.forEach(item => {
            const str = item[0]
            item[1][0].length ? item[1][0].forEach(item1 => {
              ret.push(str + '-' + item1)
            }) : ret.push(str)
          })
          return ret.join(' ')
        }
      }
    },
    created() {
      // this.pageNum = this.$route.query.pageNum
      // this.StrategyId = this.$route.query.id
      // 获取用户登录后是否将策略设置为精品
      this.StrategyId = this.$route.query.id || sessionStorage.getItem('ids') || sessionStorage.getItem('rowId')
      isUniqueStrategy(this.StrategyId)
        .then(res => {
          this.isUnique = res
        })
      // 获取策略排行的相关数据
      getStrategyProData(this.StrategyId)
        .then(res => {
          this.strategyProData = res
        })
      getStrategyDetails(this.StrategyId)
        .then(res => {
          this.isAmaryStregy = res.strategy.additionNum
          // console.log('hhhhhhhhhhhhhhhh', res.strategy.isArmy)
          this.strategyDetails = res   // 策略详情的大对象
          this.strategy = res.strategy
          this.own = this.strategy.own
          this.analysisReportId = this.strategy.analysisReportId
          this.status = this.strategy.status
          this.status === 2 || this.status === 3 ? this.isActiveLine2 = false : this.isActiveLine2 = true    // 通过和驳回的样式
          this.status === 2 || this.status === 3 ? this.isAcrivCircle3 = false : this.isAcrivCircle3 = true   // 通过和驳回的样式
          this.status === 2 || this.status === 3 ? this.isAcriveCircle2 = true : this.isAcriveCircle2 = false   // 通过和驳回的样式
          this.status === 1 || this.status === 2 || this.status === 3 ? this.isAcriveCircle1 = true : this.isAcriveCircle1 = false
          this.status === 1 ? this.isAcriveCircle2 = false : this.isAcriveCircle2 = true
          this.status === 0 ? this.isAcriveLine1 = false : this.isAcriveLine1 = true
          this.status === 0 ? this.isGray = true : this.isGray = false
          this.boutiNums = res.strategy.boutiqueNum
          res.firstStrategyPhase ? this.firstStrategyPhase = res.firstStrategyPhase : this.firstStrategyPhase = { }
          res.secStrategyPhase ? this.secStrategyPhase = res.secStrategyPhase : this.secStrategyPhase = { }
          res.finalStrategyPhase ? this.finalStrategyPhase = res.finalStrategyPhase : this.finalStrategyPhase = { }
          this.firstStrategyPhaseId = this.firstStrategyPhase.id    // 首咨阶段id
          this.secStrategyPhaseId = this.secStrategyPhase.id    // 七天回访的id
          this.finalStrategyPhaseId = this.finalStrategyPhase.id
          const analyze = this.strategy.analyze
          analyze === 0 ? this.lookStrategyBtn = true : this.lookStrategyBtn = false
        })
      this.getActionsRecordMethod()   // 定义获取操作记录
      this.getRemarkRecordMethod()   // 获取备注记录
      this.getBusinessNotesMethod()  // 获取批注记录
      this.getAddRecordMethod()        // 获取追加记录
      getDetail(this.StrategyId)
      .then(res => {
        this.paihang = res
        // transfer  rpa   implementMom
        if (res.implementMom.indexOf('-') === -1) {
          this.ok1 = '1'// 正的
          return
        } else {
          this.ok1 = '0'
        }
      })
    },
    methods: {
      // 定义获取操作记录
      getActionsRecordMethod() {
        getActionRecord(this.StrategyId, {    //  初始化时获取操作记录
          number: this.actionsNumber,
          type: 0
        })
          .then(res => {
            this.actionsRecord = res.content
            if (this.actionsRecord.length === 0) {
              this.noActions = true
              this.getActionsButton = false
              this.packActionsButton = false
            }
          })
      },
      //  定义获取批注记录的方法
      getBusinessNotesMethod() {
        getActionRecord(this.StrategyId, {      // 初始化时 获取批注记录
          number: this.noteNumber,
          type: 2
        })
          .then(res => {
            this.businessNotes = res.content
            if (this.businessNotes.length === 0) {
              this.noBusinessNote = true
              this.getNoteButton = false
              this.packNoteButton = false
            }
          })
      },
      // 定义获取备注的方法
      getRemarkRecordMethod() {
        getActionRecord(this.StrategyId, {      // 初始化时 获取备注记录
          number: this.remarkNumber,
          type: 1
        })
          .then(res => {
            this.remarkRecord = res.content
            if (this.remarkRecord.length === 0) {
              this.noRemark = true
              this.getRemarkButton = false
              this.packRemarkButton = false
            }
          })
      },
      // 定义获取追加记录的方法
      getAddRecordMethod() {
        getAddRecord(this.StrategyId, {        // 初始化时 获取追加记录
          number: this.addRecordNumber
        })
          .then(res => {
            this.addRecord = res.content
            if (this.addRecord.length === 0) {
              this.noAdd = true
              this.getAddButton = false
              this.packAddButton = false
            }
          })
      },
      shareEvent(id, num) { // 分享
        if (num > 0) {
          this.input2 = ''
          this.isMark = true
          document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        } else {
          return false
        }
      },
      cancel() {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        this.isMark = false
        this.input2 = ''
        this.$message({
          message: '取消分享',
          type: 'info',
          customClass: 'element-ui-message'
        })
      },
      Sure() {
        if (this.input2.trim().length > 0) {
          this.isMark = false
          Share({
            organizationIds: this.branch.toString(),
            strategyId: this.StrategyId
          })
          .then(res => {
            if (res === true) {
              document.getElementsByTagName('body')[0].style.overflow = 'auto'
              this.$message({
                message: '分享成功',
                type: 'success',
                customClass: 'element-ui-message'
              })
            } else {
              document.getElementsByTagName('body')[0].style.overflow = 'auto'
              this.$message({
                message: '分享失败',
                type: 'error',
                customClass: 'element-ui-message'
              })
            }
          })
        } else {
          this.$message({
            message: '您还没有选择要分享的部门哦',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
      },
      toShare(event) {
        var ss = document.querySelector('.box-content')
        ss.style.marginLeft = '-410px'
      },
      toOne(event) {
        event.stopPropagation()
        event.preventDefault()
        var ss = document.querySelector('.box-content')
        ss.style.marginLeft = '0px'
      },
      findPath(node, id, path) {
        if (!path) {
          path = []
        }
        if (node.id === id) {
          return path
        }
        path.push(node)
        if (node.item.some(child => this.findPath(child, id, path))) {
          return path
        }
        path.pop()
        return false
      },
      resetButton() {
        this.$refs.tree.setCheckedKeys([])
      },
      showItem() {
        const checkedList = this.$refs.tree.getCheckedNodes()
        this.branch = []
        this.branch = checkedList.map(res => res.id)
        for (let i = 0; i < checkedList.length; i++) {
          const len = checkedList[i].item.length
          if (len > 0) {
            checkedList.splice(i + 1, len)
          }
        }

        this.input2 = ''
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i].item.length > 0) {
            this.input2 += `${checkedList[i].name} , `
          } else {
            const thisId = checkedList[i].id

            const arr2 = this.findPath({
              item: this.treeData
            }, thisId).map(x => x.name).reverse()
            arr2.pop()
            if (arr2.length === 0) {
              this.input2 += checkedList[i].name + ','
            } else {
              this.input2 += `${arr2[0]} - ${checkedList[i].name},`
            }
          }
        }
      },
      throttle(method, context) {
        clearTimeout(method.tId)
        method.tId = setTimeout(() => {
          method.call(context)
        }, 300)
      },
      showAddStrategy() {
        getValidityAppendices(this.StrategyId)
        .then(res => {
          if (res === true) {
            this.$refs.firstStrQue.showAdd()
            this.$refs.secQue.showAdd()
            this.$refs.finalQue.showAdd()
            this.isPublish = true
            this.isAddButton = false
          }
        })
      },
      goBack() {
        this.$router.push(sessionStorage.getItem('urlOfList'))
      },
      goList() {
        this.$router.push({
          path: '/layout/myStrategy'
        })
      },
      lookStrategyAnalysis() {
        if (this.strategy.analyze === 1) {
          this.$router.push({
            path: '/analysisDetail',
            query: {
              strategyId: this.StrategyId,
              id: this.analysisReportId
            }
          })
        } else {
          this.$message({
            message: '您还没有创建分析报告，请先创建',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
      },
      lookDataReport(isAmarys) {
        this.$router.push({ path: '/layout/myArmy', query: { armaySattus: isAmarys }})
      },
      toCreatingAnalysis() {
        sessionStorage.setItem('editMessage', location.pathname)
        this.$router.push({
          path: '/creatingAnalysis',
          query: {
            id: this.StrategyId
          }
        })
      },
      toStrategyEdit() {
        sessionStorage.setItem('url', location.pathname)
        this.$router.push({
          path: '/createStrategy1',
          query: {
            status: 1,
            id: this.StrategyId
          }
        })
      },
      setUnique() {
        this.$modal.confirm({
          content: '是否设为精品策略'
        }).then(() => {
          setOrCancelUnique(this.StrategyId, 1)
            .then(res => {
              this.isUnique = true
              this.$message({
                message: '恭喜您，该策略已被设为精品',
                type: 'success',
                customClass: 'element-ui-message'
              })
            })
        }).catch(() => {
          setOrCancelUnique(this.StrategyId, 0)
            .then(res => {
              this.isUnique = false
            })
        })
      },
      canCleUnique() {
        this.$modal.confirm({
          content: '是否取消精品策略'
        }).then(() => {
          setOrCancelUnique(this.StrategyId, 0)
            .then(res => {
              this.isUnique = false
              this.$message({
                message: '该策略已成功被取消为精品',
                type: 'success',
                customClass: 'element-ui-message'
              })
            })
        }).catch(() => {
          setOrCancelUnique(this.StrategyId, 1)
            .then(res => {
              this.isUnique = true
            })
        })
      },
      getAdd() {  // 点击获取追加记录
        this.addRecordNumber += 10
        getAddRecord(this.StrategyId, {
          number: this.addRecordNumber
        })
          .then(res => {
            this.addRecord = res.content
            const totalSize = res.totalElements
            this.businessNotes.splice(1, (this.businessNotes.length - 1))
            this.noteNumber = 1
            this.remarkRecord.splice(1, (this.remarkRecord.length - 1))
            this.remarkNumber = 1
            this.actionsRecord.splice(1, (this.actionsRecord.length - 1))
            this.actionsNumber = 1
            if (this.businessNotes.length === 0) {
              this.getNoteButton = false         //  事业部负责人批注查看更多
              this.packNoteButton = false           // 批注收起
            } else {
              this.getNoteButton = true         //  事业部负责人批注查看更多
              this.packNoteButton = false           // 批注收起
            }
            if (this.remarkRecord.length === 0) {
              this.getRemarkButton = false            // 备注查看更多
              this.packRemarkButton = false         // 备注收起
            } else {
              this.getRemarkButton = true            // 备注查看更多
              this.packRemarkButton = false         // 备注收起
            }
            if (this.actionsRecord.length === 0) {
              this.getActionsButton = false   // 操作记录的查看更多
              this.packActionsButton = false
            } else {
              this.getActionsButton = true   // 操作记录的查看更多
              this.packActionsButton = false
            }
            if (this.addRecord.length >= totalSize) {
              this.getAddButton = false
              this.packAddButton = true
              this.$message({
                message: '已经没有更多的追加记录啦~~~',
                type: 'warning',
                customClass: 'element-ui-message'
              })
            }
          })
      },
      getNote() {   // 点击获取批注记录
        this.noteNumber += 10
        getActionRecord(this.StrategyId, {
          number: this.noteNumber,
          type: 2
        })
          .then(res => {
            this.businessNotes = res.content
            const totalSize = res.totalElements
            this.addRecord.splice(1, (this.addRecord.length - 1))
            this.addRecordNumber = 1
            this.remarkRecord.splice(1, (this.remarkRecord.length - 1))
            this.remarkNumber = 1
            this.actionsRecord.splice(1, (this.actionsRecord.length - 1))
            this.actionsNumber = 1
            if (this.addRecord.length === 0) {
              this.getAddButton = false   // 追加记录的查看更多
              this.packAddButton = false
            } else {
              this.getAddButton = true   // 追加记录的查看更多
              this.packAddButton = false
            }
            if (this.remarkRecord.length === 0) {
              this.getRemarkButton = false            // 备注查看更多
              this.packRemarkButton = false         // 备注收起
            } else {
              this.getRemarkButton = true            // 备注查看更多
              this.packRemarkButton = false         // 备注收起
            }
            if (this.actionsRecord.length === 0) {
              this.getActionsButton = false   // 操作记录的查看更多
              this.packActionsButton = false
            } else {
              this.getActionsButton = true   // 操作记录的查看更多
              this.packActionsButton = false
            }
            if (this.businessNotes.length >= totalSize) {
              this.packNoteButton = true
              this.getNoteButton = false
              this.$message({
                message: '已经没有更多的批注记录啦~~~',
                type: 'warning',
                customClass: 'element-ui-message'
              })
            }
          })
      },
      getRemark() {  // 点击获取备注记录
        this.remarkNumber += 10
        getActionRecord(this.StrategyId, {
          number: this.remarkNumber,
          type: 1
        })
          .then(res => {
            this.remarkRecord = res.content
            const totalSize = res.totalElements
            this.addRecord.splice(1, (this.addRecord.length - 1))
            this.addRecordNumber = 1
            this.businessNotes.splice(1, (this.businessNotes.length - 1))
            this.noteNumber = 1
            this.actionsRecord.splice(1, (this.actionsRecord.length - 1))
            this.actionsNumber = 1
            if (this.addRecord.length === 0) {
              this.getAddButton = false   // 追加记录的查看更多
              this.packAddButton = false
            } else {
              this.getAddButton = true   // 追加记录的查看更多
              this.packAddButton = false
            }
            if (this.businessNotes.length === 0) {
              this.getNoteButton = false         //  事业部负责人批注查看更多
              this.packNoteButton = false           // 批注收起
            } else {
              this.getNoteButton = true         //  事业部负责人批注查看更多
              this.packNoteButton = false           // 批注收起
            }
            if (this.actionsRecord.length === 0) {
              this.getActionsButton = false   // 操作记录的查看更多
              this.packActionsButton = false
            } else {
              this.getActionsButton = true   // 操作记录的查看更多
              this.packActionsButton = false
            }
            if (this.remarkRecord.length >= totalSize) {
              this.packRemarkButton = true
              this.getRemarkButton = false
              this.$message({
                message: '已经没有更多的备注记录啦~~~',
                type: 'warning',
                customClass: 'element-ui-message'
              })
            }
          })
      },
      getActions() {   // 点击时获取操作记录
        this.actionsNumber += 10
        getActionRecord(this.StrategyId, {
          number: this.actionsNumber,
          type: 0
        })
          .then(res => {
            this.actionsRecord = res.content
            const totalSize = res.totalElements
            this.addRecord.splice(1, (this.addRecord.length - 1))
            this.addRecordNumber = 1
            this.businessNotes.splice(1, (this.businessNotes.length - 1))
            this.noteNumber = 1
            this.remarkRecord.splice(1, (this.remarkRecord.length - 1))
            this.remarkNumber = 1
            if (this.addRecord.length === 0) {
              this.getAddButton = false   // 追加记录的查看更多
              this.packAddButton = false
            } else {
              this.getAddButton = true   // 追加记录的查看更多
              this.packAddButton = false
            }
            if (this.businessNotes.length === 0) {
              this.getNoteButton = false         //  事业部负责人批注查看更多
              this.packNoteButton = false           // 批注收起
            } else {
              this.getNoteButton = true         //  事业部负责人批注查看更多
              this.packNoteButton = false           // 批注收起
            }
            if (this.remarkRecord.length === 0) {
              this.getRemarkButton = false            // 备注查看更多
              this.packRemarkButton = false         // 备注收起
            } else {
              this.getRemarkButton = true            // 备注查看更多
              this.packRemarkButton = false         // 备注收起
            }
            if (this.actionsRecord.length >= totalSize) {
              this.packActionsButton = true
              this.getActionsButton = false
              this.$message({
                message: '已经没有更多的操作记录啦~~~',
                type: 'warning',
                customClass: 'element-ui-message'
              })
            }
          })
      },
      packUpActions() {     // 收起操作记录
        this.actionsRecord.splice(1, (this.actionsRecord.length - 1))
        this.actionsNumber = 1
        this.packActionsButton = false
        this.getActionsButton = true
      },
      packUpAdd() {    // 收起追加记录
        this.addRecord.splice(1, (this.addRecord.length - 1))
        this.addRecordNumber = 1
        this.getAddButton = true
        this.packAddButton = false
      },
      packUpNote() {         // 收起批注
        this.businessNotes.splice(1, (this.businessNotes.length - 1))
        this.noteNumber = 1
        this.getNoteButton = true
        this.packNoteButton = false
      },
      packUpRemark() {   // 收起备注
        this.remarkRecord.splice(1, (this.remarkRecord.length - 1))
        this.remarkNumber = 1
        this.getRemarkButton = true
        this.packRemarkButton = false
      },
      downLoad() {
        downLoadStrategy(this.StrategyId)   // 导出策略详情
      },
      downLoadStrategyPhase(id) {         // 导出策略阶段话术
        downLoadPhase(id)
      },
      toNote() {    //  备注按钮
        this.sopNoteShow = true
        this.maskShow = true
      },
      toComment() {   // 批注按钮
        this.sopRemarkShow = true
        this.maskShow = true
      },
      toApproval() {    // 审批按钮
        this.approvalShow = true
        this.maskShow = true
      },
      coloseRemarkBox() {   // 关闭批注弹框
        this.approvalShow = false
        this.maskShow = false
        this.approvalMessages = ''
      },
      closeNoteBox() {    //  关闭备注弹框
        this.sopNoteShow = false
        this.sopRemarkShow = false
        this.maskShow = false
        this.noteDetails = ''
        this.commentDetails = ''
      },
      saveComment() {    // 保存批注内容
        let ok = 0
        const commentMsg = this.commentDetails
        if (commentMsg.trim().length === 0) {
          ok = 1
        }
        if (commentMsg.length > 250) {
          ok = 2
        }
        if (ok === 1) {
          this.$message({
            message: '你还没有写任何批注内容~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
        if (ok === 2) {
          this.$message({
            message: '请输入250字符以内的内容~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
        ok === 0 && remarkOrNote(this.StrategyId, {
          strategyId: this.StrategyId,
          content: commentMsg
        })
          .then(res => {
            if (res === true) {
              this.$message({
                message: '恭喜您，批注成功',
                type: 'success',
                customClass: 'element-ui-message'
              })
            }
            this.commentDetails = ''
            this.sopNoteShow = false
            this.sopRemarkShow = false
            this.maskShow = false
          })
      },
      saveMessage() {   // 保存备注内容
        let isOk = 0
        const noteMsg = this.noteDetails
        if (noteMsg.trim().length === 0) {
          isOk = 1
        }
        if (noteMsg.length > 250) {
          isOk = 2
        }
        if (isOk === 1) {
          this.$message({
            message: '您还没有填写备注内容~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
        if (isOk === 2) {
          this.$message({
            message: '请输入250字符以内的内容~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
        isOk === 0 && remarkOrNote(this.StrategyId, {
          strategyId: this.StrategyId,
          content: noteMsg
        })
          .then(res => {
            if (res === true) {
              this.$message({
                message: '恭喜您，备注成功',
                type: 'success',
                customClass: 'element-ui-message'
              })
            }
            this.noteDetails = ''
            this.sopNoteShow = false
            this.maskShow = false
          })
      },
      passStrategy() {    // 审批通过该策略
        const remarkMsg = this.approvalMessages
        let ok = 0
        remarkMsg.length > 250 ? ok = 2 : ok = 0
        if (ok === 2) {
          this.$message({
            message: '请输入250字符以内的内容~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
        // if (remarkMsg) {
        //   remarkOrNote(this.StrategyId, {
        //     strategyId: this.StrategyId,
        //     content: remarkMsg
        //   })
        //     .then(res => {
        //     })
        // }
        passOrReject(this.StrategyId, {
          auditStatus: 'PASS',
          logContent: remarkMsg
        })
          .then(res => {
            if (res === true) {
              this.$message({
                message: '恭喜您，您已通过该策略的审核',
                type: 'success',
                customClass: 'element-ui-message'
              })
              this.status = 2
            }
            this.approvalMessages = ''
            this.approvalShow = false
            this.maskShow = false
          })
      },
      rejectStrategy() {    //  审批驳回该策略
        const remarkMsg = this.approvalMessages
        let ok = 0
        remarkMsg.length > 250 ? ok = 2 : ok = 0
        if (ok === 2) {
          this.$message({
            message: '请输入250字符以内的内容~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
        // if (remarkMsg) {
        //   remarkOrNote(this.StrategyId, {
        //     strategyId: this.StrategyId,
        //     content: remarkMsg
        //   })
        //     .then(res => {
        //     })
        // }
        passOrReject(this.StrategyId, {
          auditStatus: 'REJECT',
          logContent: remarkMsg
        })
          .then(res => {
            if (res === true) {
              this.$message({
                message: '您已成功将该策略驳回',
                type: 'success',
                customClass: 'element-ui-message'
              })
              this.status = 3
            }
            this.approvalMessages = ''
            this.approvalShow = false
            this.maskShow = false
          })
      },
      addPublishStrategy() {
        const addStrategyPhaseModels = []
        let ok = 0  // 定义一个变量控制提示内容的的不同   0 --- 表单无错误   1 --- 有内容没填全   2 --- 字数超出范围
        const firstStrategyPhaseData = this.$refs.firstStrQue.form
        const secStrategyPhaseData = this.$refs.secQue.form1
        const finalStrategyPhaseData = this.$refs.finalQue.form2
        const firstNeeds = firstStrategyPhaseData.needs       // 获取追加首咨的需求
        const firstProjects = firstStrategyPhaseData.secondProjects   // 获取追加首咨的主推项目
        const firstClassSizes = firstStrategyPhaseData.mainClassSizes  // 获取追加首咨的主推班型
        const firstKills = firstStrategyPhaseData.killStrategies   // 获取追加首咨的主推截杀策略
        if (firstNeeds) {
          for (let i = 0; i < firstNeeds.length; i++) {
            const obj = { content: firstNeeds[i].needName, number: (this.firstStrategyPhase.needs.length + i), strategyPhaseId: this.firstStrategyPhaseId, type: 1 }
            addStrategyPhaseModels.push(obj)
          }
          firstNeeds.forEach((item, index) => {
            if (item.needName.trim().length === 0) {
              ok = 1
            }
            if (item.needName.length > 250) {
              ok = 2
            }
          })
        }
        if (firstProjects) {
          let type = null
          if (this.strategy.projectType === '主推项目') {
            type = 0
          } else if (this.strategy.projectType === '主推专业') {
            type = 2
          } else if (this.strategy.projectType === '主推院校') {
            type = 3
          }
          for (let i = 0; i < firstProjects.length; i++) {
            const obj = { content: firstProjects[i].description, number: (this.firstStrategyPhase.secondProjects.length + i), strategyPhaseId: this.firstStrategyPhaseId, type: type }
            addStrategyPhaseModels.push(obj)
          }
          firstProjects.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        if (firstClassSizes) {
          for (let i = 0; i < firstClassSizes.length; i++) {
            const obj = { content: firstClassSizes[i].description, number: (this.firstStrategyPhase.mainClassSizes.length + i), strategyPhaseId: this.firstStrategyPhaseId, type: 4 }
            addStrategyPhaseModels.push(obj)
          }
          firstClassSizes.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        if (firstKills) {
          for (let i = 0; i < firstKills.length; i++) {
            const obj = { content: firstKills[i].description, number: (this.firstStrategyPhase.killStrategies.length + i), strategyPhaseId: this.firstStrategyPhaseId, type: 5 }
            addStrategyPhaseModels.push(obj)
          }
          firstKills.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        const secondNeeds = secStrategyPhaseData.needs       // 获取追加七天的需求
        const secondSolve = secStrategyPhaseData.solveFirstProblems   // 获取追加七天的解决遗留问题
        const secondClassSizes = secStrategyPhaseData.mainClassSizes  // 获取追加七天的主推班型
        const secondKills = secStrategyPhaseData.killStrategies   // 获取追加七天的主推截杀策略
        if (secondNeeds) {
          for (let i = 0; i < secondNeeds.length; i++) {
            const obj = { content: secondNeeds[i].needName, number: (this.secStrategyPhase.needs.length + i), strategyPhaseId: this.secStrategyPhaseId, type: 1 }
            addStrategyPhaseModels.push(obj)
          }
          secondNeeds.forEach((item, index) => {
            if (item.needName.trim().length === 0) {
              ok = 1
            }
            if (item.needName.length > 250) {
              ok = 2
            }
          })
        }
        if (secondSolve) {
          for (let i = 0; i < secondSolve.length; i++) {
            const obj = { content: secondSolve[i].solve, number: (this.secStrategyPhase.solveFirstProblems.length + i), strategyPhaseId: this.secStrategyPhaseId, type: 6 }
            addStrategyPhaseModels.push(obj)
          }
          secondSolve.forEach((item, index) => {
            if (item.solve.trim().length === 0) {
              ok = 1
            }
            if (item.solve.length > 250) {
              ok = 2
            }
          })
        }
        if (secondClassSizes) {
          for (let i = 0; i < secondClassSizes.length; i++) {
            const obj = { content: secondClassSizes[i].description, number: (this.secStrategyPhase.mainClassSizes.length + i), strategyPhaseId: this.secStrategyPhaseId, type: 4 }
            addStrategyPhaseModels.push(obj)
          }
          secondClassSizes.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        if (secondKills) {
          for (let i = 0; i < secondKills.length; i++) {
            const obj = { content: secondKills[i].description, number: (this.secStrategyPhase.killStrategies.length + i), strategyPhaseId: this.secStrategyPhaseId, type: 5 }
            addStrategyPhaseModels.push(obj)
          }
          secondKills.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        const finalOpens = finalStrategyPhaseData.triggerOpens       // 获取追加库存的触发式开场
        const finalTool = finalStrategyPhaseData.AssistTool   // 获取追加七天的解决遗留问题
        const finalClassSizes = finalStrategyPhaseData.mainClassSizes  // 获取追加七天的主推班型
        const finalKills = finalStrategyPhaseData.killStrategies   // 获取追加七天的主推截杀策略
        if (finalOpens) {
          for (let i = 0; i < finalOpens.length; i++) {
            const obj = { content: finalOpens[i].triggerOpen, number: (this.finalStrategyPhase.triggerOpens.length + i), strategyPhaseId: this.finalStrategyPhaseId, type: 7 }
            addStrategyPhaseModels.push(obj)
          }
          finalOpens.forEach((item, index) => {
            if (item.triggerOpen.trim().length === 0) {
              ok = 1
            }
            if (item.triggerOpen.length > 250) {
              ok = 2
            }
          })
        }
        if (finalTool) {
          for (let i = 0; i < finalTool.length; i++) {
            const obj = { content: finalTool[i].tool, number: (this.finalStrategyPhase.assistTools.length + i), strategyPhaseId: this.finalStrategyPhaseId, type: 8 }
            addStrategyPhaseModels.push(obj)
          }
          finalTool.forEach((item, index) => {
            if (item.tool.trim().length === 0) {
              ok = 1
            }
            if (item.tool.length > 250) {
              ok = 2
            }
          })
        }
        if (finalClassSizes) {
          for (let i = 0; i < finalClassSizes.length; i++) {
            const obj = { content: finalClassSizes[i].description, number: (this.finalStrategyPhase.mainClassSizes.length + i), strategyPhaseId: this.finalStrategyPhaseId, type: 4 }
            addStrategyPhaseModels.push(obj)
          }
          finalClassSizes.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        if (finalKills) {
          for (let i = 0; i < finalKills.length; i++) {
            const obj = { content: finalKills[i].description, number: (this.finalStrategyPhase.killStrategies.length + i), strategyPhaseId: this.finalStrategyPhaseId, type: 5 }
            addStrategyPhaseModels.push(obj)
          }
          finalKills.forEach((item, index) => {
            if (item.description.trim().length === 0) {
              ok = 1
            }
            if (item.description.length > 250) {
              ok = 2
            }
          })
        }
        if (ok === 1) {
          this.$message({
            message: '你还有内容没有填写完~~~',
            type: 'error',
            customClass: 'element-ui-message'
          })
        }
        if (ok === 2) {
          this.$message({
            message: '请输入250字符以内的数据',
            type: 'error',
            customClass: 'element-ui-message'
          })
        }
        if (addStrategyPhaseModels.length === 0) {
          this.$message({
            message: '你还没有输入任何追加内容，请确定后再追加',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
        ok === 0 && this.$modal.confirm({
          content: '您是否确定发布追加的策略'
        }).then(() => {
          addSecStrategyDat(addStrategyPhaseModels, this.StrategyId)
            .then(res => {
              this.$router.push({
                path: '/layout/myStrategy'
              })
              this.isPublish = false
            })
        })
      }
    }
  }
</script>
<style lang="scss" src="./index.scss" scoped>
</style>
