<template>
<div class="addstrategy-wrapper">
  <header-bar></header-bar>
  <div class="addstrategy-head">
    <a @click="backToList">
      <i class="el-icon-arrow-left"></i> 返回列表页
    </a>
    <div class="addstrategy-head-times">
      <span class="head-starttime">{{createDate}}</span>
      <span class="head-army">{{legion}}</span>
      <span>&nbsp;{{reportName}}</span>
    </div>
    <div class="addstrategy-head-btn">
      <button @click="download">导出</button>
      <button @click="openBox">备注</button>
    </div>
    <span @click="cancel">X</span>
  </div>
  <div class="analysiSreport">
    <div class="army-name">
      军团长：<span class="army-name-text">{{egatus}}</span>
    </div>
    <div class="annlycont">
      <div class="dynamicdata">
        <div class="policyexecution2">
          <p>策略执行率</p>
        </div>
        <div class="policyexecution">
          <p><img src="../../assets/strategyss.png" :class="{isRotate:ok1!=='1'}"></p>
          <p><span class="lllegal">{{implementMom}}%</span></p>
          <p class="mom">环比</p>
        </div>
        <pie :value="implementPercent" :color="color" :fontColor="fontcolor" :backGround="back"></pie>
        <div class="ranking">
          <!-- <p>军团排行：<span class="lllegal">{{performRanking || '-'}}</span></p> -->
          <p>集团排行：<span class="lllegal">{{rankNum}}</span></p>
        </div>
      </div>
      <div class="dynamicdata">
        <div class="policyexecution2">
          <p>流程完整度</p>
        </div>
        <div class="policyexecution">
          <p><img src="../../assets/strategyss.png" :class="{isRotate:ok2!=='1'}"></p>
          <p><span class="lllegal">{{taskFinishMom}}%</span></p>
          <p class="mom">环比</p>
        </div>
        <pie :value="taskFinishPercent || 0" :color="color2" :fontColor="fontcolor" :backGround="back"></pie>
        <div class="ranking ranking2">
          <p>探需：<span class="lllegal">{{talkPercent}}</span></p>
          <p>专业：<span class="lllegal">{{mainMajorPercent}}</span></p>
          <p>班型：<span class="lllegal">{{mainClassPercent}}</span></p>
          <p>截杀：<span class="lllegal">{{runOutPercent}}</span></p>
          <p>销转：<span class="lllegal">{{transfer || '-'}}</span></p>
        </div>
      </div>
      <p class="annlyp">抽检数量：<span class="lllegal">{{checkCount}}</span></p>
      <p class="annlyp">抽检率：<span class="lllegal">{{qualityCheckPercent || '-'}}</span></p>
      <p class="annlyp">违规率：<span class="lllegal">{{violationPercent || '-'}}</span></p>
      <p class="annlyp">RPA：<span class="lllegal">{{rpa || '-'}}</span></p>
    </div>
    <div class="mains">
      <div class="mians-left">
        <div class="analystrategy-text">
          <span class="analystrategy-text-title">
        执行问题与建议
      </span>
          <div class="analystrategy-text-question">
            <p>{{issuesAndrec}}</p>
          </div>
        </div>
        <div class="analystrategy-text">
          <span class="analystrategy-text-title">
        用户模块
      </span>
          <ol class="analystrategy-text-question students-question">
            <li><span>学生最关心的问题1：</span>{{question1}}</li>
            <li><span>学生最关心的问题2：</span>{{question2}}</li>
            <li><span>学生最关心的问题3：</span>{{question3}}</li>
          </ol>
        </div>
        <div class="analystrategy-text">
          <span class="analystrategy-text-title">
            用户分析
          </span>
          <div class="analystrategy-text-question">
            <p>{{userAnalysis}}</p>
          </div>
        </div>
        <div class="vio">
          <div class="analystrategy-text">
            <span class="analystrategy-text-title">
              主要违规点1
            </span>
            <div class="analystrategy-text-question">
              <p>{{mainViolationOneName || ''}}</p>
            </div>
          </div>
          <!-- <p class="vio-header">
            <span>主要违规点1</span>
            <span>{{mainViolationOneName || ''}}</span>
          </p> -->
          <div class="analystrategy-text">
            <span class="analystrategy-text-title">
              问题话术
            </span>
            <div class="analystrategy-text-question">
              <p>{{questionWord || ''}}</p>
            </div>
          </div>
          <div class="analystrategy-text">
            <span class="analystrategy-text-title">
              建议话术
            </span>
            <div class="analystrategy-text-question">
              <p>{{suggestedWord || ''}}</p>
            </div>
          </div>
        </div>
        <div class="vio">
          <div class="analystrategy-text">
            <span class="analystrategy-text-title">
              主要违规点2
            </span>
            <div class="analystrategy-text-question">
              <p>{{mainViolationTwoName || ''}}</p>
            </div>
          </div>
          <!-- <p class="vio-header">
            <span>主要违规点2</span>
            <span>{{mainViolationTwoName || ''}}</span>
          </p> -->
          <div class="analystrategy-text">
            <span class="analystrategy-text-title">
              问题话术
            </span>
            <div class="analystrategy-text-question">
              <p>{{questionWord2 || ''}}</p>
            </div>
          </div>
          <div class="analystrategy-text">
            <span class="analystrategy-text-title">
              建议话术
            </span>
            <div class="analystrategy-text-question">
              <p>{{suggestedWord2 || ''}}</p>
            </div>
          </div>
        </div>
        <div class="analystrategy-text">
          <span class="analystrategy-text-title">
            上周培训效果分析
          </span>
          <div class="analystrategy-text-question">
            <p>{{weekEffect}}</p>
          </div>
        </div>
        <div class="analystrategy-text">
          <span class="analystrategy-text-title">
        备注
      </span>
          <div class="analystrategy-text-question">
            <p>{{remark}}</p>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="add_strategy_record">
          <div class="strategy_status_title">
            <span class="vertical_line"></span>
            <span>备注记录</span>
          </div>
          <div class="record_message" v-show="remarkRecord.length" v-for="(item, index) in remarkRecord" :key="index">
            <div class="record_name">
              <p style="color: rgb(247,147,0)">{{item.name}}</p>
              <p>{{item.crtDate}}</p>
            </div>
            <div class="point"></div>
            <div class="record_res">
              <p>{{item.msg}}</p>
            </div>
          </div>
          <p v-show="noRemark" style="text-align: center; margin-top: 30px; font-size: 16px; padding-bottom: 20px">暂时没有备注内容</p>
          <div class="look_more" v-show="getRemarkButton" @click="getRemark">查看更多</div>
          <div class="look_more" v-show="packRemarkButton" @click="packUpRemark">收起</div>
        </div>
      </div>

    </div>
  </div>
  <msg-box ref="box" v-on:submitRemark="saveRemark"></msg-box>
</div>
</template>
<script>
import pie from '@/components/charts/pie'
import HeaderBar from '../layout/HeadBar.vue'
import msgBox from './msgBox.vue'
import {
  getDetail
} from '@/api/analysisDetail'
import {
  addRemark
} from '@/api/dataTable'
import fetch, {
  download
} from '@/utils/fetch'

export default {
  components: {
    HeaderBar,
    pie,
    msgBox
  },
  data() {
    return {
      implementPercent: 0,
      username: '',
      getRemarkButton: false,
      packRemarkButton: false,
      noRemark: false,
      remarkRecord: [],
      form: {
        type: '',
        desc: ''
      },
      color: '#f59303',
      fontcolor: '#f59303',
      color2: '#f59303',
      back: '#c2c2c2',
      value: '',
      value2: '',
      enforcedLinkBack: '',
      integrityLinkBack: '',
      taskFinishPercent: 0,
      transfer: '',
      checkCount: '',
      violationPercent: '',
      violationLinkBack: '',
      rpa: '',
      talkPercent: '',
      mainMajorPercent: '',
      mainClassPercent: '',
      runOutPercent: '',
      qualityCheckPercent: '',
      performRanking: '',
      rankNum: '',
      value5: [],
      now: 'double-arrow-down',
      isActive: true,
      isActives: false,
      strategyId: null,
      id: null,
      reportName: '',
      legion: '',
      egatus: '',
      creater: '',
      issuesAndrec: '',
      question1: '',
      question2: '',
      question3: '',
      userAnalysis: '',
      type: '',
      createDate: '',
      modifyDate: '',
      questionWord: '',
      suggestedWord: '',
      questionWord2: '',
      suggestedWord2: '',
      mainViolationOneName: '',
      mainViolationTwoName: '',
      weekEffect: '',
      remark: '',
      totalElements: '',
      load: 0,
      implementMom: '',
      ok1: '',
      ok2: '',
      taskFinishMom: ''
    }
  },
  methods: {
    updown(e) {
      if (this.now === 'double-arrow-down') {
        this.now = 'double-arrow-up'
        this.isActive = false
        this.isActives = true
      } else {
        this.now = 'double-arrow-down'
        this.isActive = true
        this.isActives = false
      }
    },
    getRemark() {
      if (this.load === 0) {
        this.remarkRecord = []
      }
      fetch({
        url: `/reports/${this.id}/comments?page=${this.load}`,
        method: 'get'
      }).then(res => {
        this.remarkRecord = this.remarkRecord.concat(res.content)
        const len = this.remarkRecord.length
        if (len < res.totalElements) {
          this.load += 1
        } else {
          this.getRemarkButton = false
          this.packRemarkButton = true
          this.$message({
            message: '已经没有更多的备注记录啦~~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
      })
    },
    packUpRemark() {
      fetch({
        url: `/reports/${this.id}/comments?page=0`,
        method: 'get'
      }).then(res => {
        const len = res.content.length
        if (len === 0) {
          this.noRemark = true
        } else {
          this.remarkRecord = [res.content[0]]
          this.getRemarkButton = true
        }
        this.load = 0
      })
      this.packRemarkButton = false
    },
    openBox() {
      this.$refs.box.showError = false
      this.$refs.box.showMusk = true
      this.$refs.box.showBox = true
      this.$refs.box.textarea = ''
    },
    saveRemark() {
      const msg = this.$refs.box.textarea
      if ((msg.length > 250) || (msg.length === 0)) {
        return false
      } else {
        const data = {
          analyzeId: this.id,
          msg
        }
        addRemark(this.id, data).then(res => {
          if (res.id) {
            this.$message({
              message: '保存成功!',
              type: 'success',
              customClass: 'element-ui-message'
            })
            this.$refs.box.showMusk = false
            this.$refs.box.showBox = false
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              customClass: 'element-ui-message'
            })
          }
        })
      }
    },
    download() {
      const url = `/reports/analyzes/download?ids=${this.id}`
      download(url)
    },
    backToList() {
      this.$router.push({
        path: '/layout/myStrategy'
      })
    },
    cancel() {
      // sessionStorage.setItem('urlOfList', location.hash.substring(1))
      this.$router.go(-1)
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.strategyId = this.$route.query.strategyId
    getDetail(this.id)
      .then(res => {
        this.reportName = res.reportName
        this.legion = res.legion
        this.egatus = res.egatus
        this.creater = res.creater
        this.issuesAndrec = res.issuesAndrec
        this.question1 = res.userModules[0].name
        this.question2 = res.userModules[1].name
        this.question3 = res.userModules[2].name
        this.userAnalysis = res.userAnalysis
        this.modifyDate = res.modifyDate
        this.questionWord = res.questionWord
        this.suggestedWord = res.suggestedWord
        this.questionWord2 = res.questionWordTwo
        this.suggestedWord2 = res.suggestedWordTwo
        this.mainViolationOneName = res.mainViolationOneName
        this.mainViolationTwoName = res.mainViolationTwoName
        this.weekEffect = res.weekEffect
        this.remark = res.remark

        function checkTime(i) {
          if (i < 10) {
            i = '0' + i
          }
          return i
        }
        const createDate = res.createDate
        const hd = new Date(createDate)
        this.createDate = `${checkTime(hd.getMonth() + 1)}月${checkTime(hd.getDate())}日`
      })
    fetch({
      url: `/reports/integrated/${this.strategyId}`
    }).then(res => {
      this.implementPercent = res.implementPercent.replace(/%/, '') // 执行力
      this.taskFinishPercent = res.taskFinishPercent.replace(/%/, '') // 完整度
      this.talkPercent = res.talkPercent
      this.mainMajorPercent = res.mainMajorPercent
      this.mainClassPercent = res.mainClassPercent
      this.runOutPercent = res.runOutPercent
      this.transfer = res.transfer
      this.rpa = res.rpa
      this.qualityCheckPercent = res.qualityCheckPercent
      this.performRanking = res.performRanking
      this.violationPercent = res.violationPercent
      this.checkCount = res.checkCount
      this.rankNum = res.rankNum
      this.implementMom = res.implementMom
      this.taskFinishMom = res.taskFinishMom
      if (res.implementMom.indexOf('-') === -1) {
        this.ok1 = '1'// 正的
      } else {
        this.ok1 = '0'
      }
      if (res.taskFinishMom.indexOf('-') === -1) {
        this.ok2 = '1'
      } else {
        this.ok2 = '0'
      }
    })

    fetch({
      url: `/reports/${this.id}/comments?page=0`,
      method: 'get'
    }).then(res => {
      const len = res.content.length
      if (len === 0) {
        this.noRemark = true
      } else {
        this.remarkRecord = [res.content[0]]
        this.getRemarkButton = true
      }
    })
  },
  watch: {
    '$route': 'cancel'
  }
}
</script>
<style lang="scss" src="./index.scss">
</style>
