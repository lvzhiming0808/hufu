<template>
<div class="dashboard-wrapper" :style="{width: `${wrapperWidth}px`}">
  <div class="my-army">
    <div class="my-army-header">
      <span></span>
      <h3>我的军团</h3>
      <router-link tag="span" to="myArmy">查看更多 ></router-link>
    </div>
    <div class="my-army-main">
      <div>
        <h4>策略执行率</h4>
        <pie :value="enforcedPolicies" :color="pieColor[0]"></pie>
        <div class="tag">
          <span>{{executeRank}}</span>
          <span>排行</span>
        </div>
        <div class="percent">
          <img src="../../../assets/arrow.png" alt="" :class="{percentRotate:str==='0'}">
          <span>{{one}}</span>
          <span>环比</span>
        </div>
      </div>
      <div>
        <h4>流程完整度</h4>
        <pie :value="finishNumHight" :color="pieColor[1]"></pie>
        <div class="percent">
          <img src="../../../assets/arrow.png" alt="" :class="{percentRotate:str1==='0'}">
          <span>{{two}}</span>
          <span>环比</span>
        </div>
      </div>
      <div>
        <div>
          <div>
            <span class="item-name">销转</span>
            <span></span>
            <span class="item-value">{{sellConvertRate}}%</span>
          </div>
          <div>
            <span class="item-name">RPA</span>
            <span></span>
            <span class="item-value">{{rapRate}}</span>
          </div>
        </div>
        <div>
          <div>
            <span class="item-name">质检抽检数</span>
            <span></span>
            <p>
              <span class="item-value">{{recordSum}}</span>
              <i class="svg-container pie-icon">
                  <icon-svg icon-class="pie-icon" />
                </i>
              <span>{{spotCheckRate}}%</span>
            </p>
          </div>
          <div class="last-item">
            <span class="item-name">违规率</span>
            <span></span>
            <span class="item-value">{{violationRate}}%</span>
            <div class="percent">
              <img src="../../../assets/arrow.png" alt="" :class="{percentRotate:str2==='0'}">
              <span>{{three}}</span>
              <span>环比</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4>其他</h4>
        <army-bar :barData="multiBarData"></army-bar>
      </div>
    </div>
  </div>
  <div class="dashboard-bottom-wrapper">
    <div class="strategy">
      <div class="strategy-header">
        <span></span>
        <h3>我的策略</h3>
        <span></span>
        <el-button @click="toCreateStrategy" size="mini" type="primary" v-if="$checkRole('createStrategy')">创建+</el-button>
        <router-link to="myStrategy" tag="span">查看更多 ></router-link>
      </div>
      <div class="strategy-main">
        <ul>
          <li v-for="(item,index) in strategyList" :key="index">
            <p class="item-header">
              <span @click="toMyStrategy(item.id)">{{item.groupName}}{{item.name}}</span>
              <span v-show="item.isAdd">追加</span>
              <span></span>
              <span v-show="item.status===2" class="isStatuss">通过</span>
              <span v-show="item.status===3" class="isStatuss">驳回</span>
              <span v-show="item.status===1" class="isStatuss">待审核</span>
              <span v-show="item.status===0" class="isStatuss">草稿</span>
              <span v-show="item.readStatus===1" class="isStatuss">已阅</span>
            </p>
            <p>
              <span></span>
              <span>项目：{{item.firstProjectName}}</span>
            </p>
            <p>
              <span>适用部门： {{fullBranchName(item.applydeparts)}}</span>
              <span>地域： {{item.area}}</span>
              <span></span>
              <span>{{item.createDate}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
    <div class="datatable">
      <div class="datable-header">
        <span></span>
        <h3>数据报表</h3>
        <span></span>
        <el-select size="mini" @change="setAnalyze" v-model="value" placeholder="请选择" v-if="showSelect">
          <el-option v-for="item in orgItem" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <span></span>
        <router-link tag="span" :to="{name: '军团策略与分析报告列表'}">查看更多 ></router-link>
      </div>
      <div class="datatable-main" id="main">
        <div class="top" v-if="hasAnalyze">
          <p>
            {{analyze.reportName || ''}}
          </p>
          <p><span></span>执行问题与建议</p>
          <p>
            {{analyze.issuesAndrec || ''}}
          </p>
          <p><span></span>用户分析</p>
          <p>
            {{analyze.userModules[0].name || ''}}
          </p>
          <span class="more" @click="toDetail">查看详情 ></span>
        </div>
        <div class="top" style="display: flex;justify-content: center; align-items: center;" v-if="!hasAnalyze">
          暂无分析报告
        </div>
        <p></p>
        <div class="bottom">
          <div>
            <p>优秀录音<span @click="myRecords" :class="{ beyellow: ismyRecords }">我的</span>
              <span>|</span>
              <span @click="allRecords" :class="{ beyellow: isallRecords }">全部</span>
              <i></i>
              <router-link tag="span" :to="{ path: '/layout/boutiqueBank/record'}">更多 ></router-link>
            </p>
            <div style="display: flex;justify-content: center; align-items: center;height: 110px;" v-if="goodRecordList.length === 0">
              暂无优秀录音
            </div>
            <ul v-if="goodRecordList.length !== 0">
              <li v-for="(item,index) in goodRecordList" @click="toRcordDetails(item.id)" style="cursor: pointer;" :key="index">
                <span></span>{{item.counselorName}} {{item.goodType}} ({{item.itemType}}) 录音
              </li>
            </ul>
          </div>
          <i></i>
          <div>
            <p>优秀策略话术<span @click="myStrategy" :class="{ beyellow: ismyStrategy }">我的</span>
              <span>|</span>
              <span @click="allStrategy" :class="{ beyellow: isallStrategy }">全部</span><i></i>
              <span @click="toElectTalk">更多 </span>
            </p>
            <ul v-if="goodStrategyList.length!==0">
              <li v-for="(item,index) in goodStrategyList" @click="toDetails(item.id)" style="cursor: pointer;" :key="index">
                <span></span> {{item.groupName}} {{item.name}}
              </li>
            </ul>
            <div style="display: flex;justify-content: center; align-items: center;height: 110px;" v-if="goodStrategyList.length === 0">
              暂无优秀策略话术
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import pie from '@/components/charts/pie'
import armyBar from '@/components/charts/armyBar'
import fetch from '@/utils/fetch'
import {
  queryStrategy
} from '@/api/myStrategy'
import {
  queryGoodStrategy,
  queryGoodRecord
} from '@/api/myStrategy'
export default {
  data() {
    return {
      radios: '0',
      hasAnalyze: true,
      ismyRecords: true,
      ismyStrategy: true,
      isallRecords: false,
      isallStrategy: false,
      goodStrategyList: [],
      goodRecordList: [],
      pieValue1: 0,
      pieValue2: 0,
      strategyList: [],
      pieColor: ['#f9d504', '#a7ec19'],
      // xAxisData: ['探需', '专业', '班型', '截杀'],
      barData: [],
      goodRecord: 0,
      goodStrategy: 1,
      orgItem: [],
      orgItemNames: [],
      orgIds: [],
      analyze: {
        reportName: '',
        issuesAndrec: '',
        userModules: ['', '', '']
      },
      analyzeArr: [],
      value: '',
      showSelect: false,
      week: '',
      startTime: '',
      endTime: '',
      enterpriseId: '',
      groupId: '',
      sellId: '',
      sellGroupId: '',
      // 12项数据展示相关
      finishNumHight: null,
      multiBarData: [],
      enforcedPolicies: null,
      putAwayRate: '',
      recordSum: '',
      classTypeRate: '',
      majorsRate: '',
      agentsScore: '',
      rapRate: '',
      sellConvertRate: '',
      executeRank: '',
      spotCheckRate: '',
      violationRate: '',
      wrapperWidth: '',
      one: '',
      two: '',
      three: '',
      str: '',
      str1: '',
      str2: '',
      ids: ''
    }
  },
  created() {
    fetch({
      url: `/reports/analyzes?page=0&startTime=&endTime=&range=1`
    }).then(res => {
      if (!res.content[0]) {
        this.hasAnalyze = false
      } else {
        this.analyze = res.content[0]
      }
      this.value = res.content[0].legion
      this.analyzeArr = res.content
    })
    this.orgItem = this.$store.getters.organization.item
    this.orgItemNames = this.orgItem.map(item => item.name)
    this.orgIds = this.orgItem.map(item => item.id)
    if (this.$store.getters.organization.organizationLevel === 'BUSINESS_UNIT') {
      this.showSelect = true
    }
    queryStrategy({ // 策略列表
      status: 4, // 全部4 ，草稿0， 待审核1， 通过2， 驳回3
      pageSize: 5,
      auditStatus: '', // 审核情况
      pageNum: 1, // 页数
      area: '', // 地域
      own: '', // 1--我的   2--全部
      applydeparts: '', // 适用部门
      firstProjectId: '' //   项目
    }).then(res => {
      this.strategyList = res.content
    })
    // fetch('/record/selectRecordRank').then(res => {
    //   console.log(res)
    // })
    queryGoodRecord({
      own: 0,
      pageSize: 5,
      pageNum: 1
    }).then(res => {
      this.goodRecordList = res.content
    })
    queryGoodStrategy({ // 优秀策略话术推荐
      own: 0,
      pageSize: 5,
      pageNum: 1
    }).then(res => {
      this.goodStrategyList = res.content
    })
  },
  mounted() {
    this.ids = this.$store.state.user.organization.id
    fetch({
      url: `/reports/mom?recordType=2&dimensionType=army&id=${this.ids}`
    }).then(res => {
      this.one = res.implementMom
      this.two = res.taskFinishMom
      this.three = res.violationMom
      if (this.one.indexOf('-') > -1) {
        this.str = '0'
      } else {
        this.str = '1'
      }
      if (this.two.indexOf('-') > -1) {
        this.str1 = '0'
      } else {
        this.str1 = '1'
      }
      if (this.three.indexOf('-') > -1) {
        this.str2 = '0'
      } else {
        this.str2 = '1'
      }
    })
    this.startTime = this.getWeekStartDate()
    this.endTime = this.getWeekEndDate()
    const level = this.$store.state.user.organization.organizationLevel
    const id = this.$store.state.user.organization.id
    if (level === 'BUSINESS_UNIT') {
      this.enterpriseId = id
    } else if (level === 'ARMY') {
      this.groupId = id
    } else if (level === 'SALES_DEPARTMENT') {
      this.sellId = id
    } else {
      this.sellGroupId = id
    }
    this.fetchData()

    const width = (document.body.clientWidth - 180 - 20)
    this.wrapperWidth = width
    window.addEventListener('resize', () => {
      const width = (document.body.clientWidth - 180 - 20)
      this.wrapperWidth = width
    })
  },
  methods: {
    toElectTalk() {
      this.$router.push({ path: '/layout/boutiqueBank/speechcraft', query: { id: this.radios }})
    },
    formatDate(date) {
      const myyear = date.getFullYear()
      let mymonth = date.getMonth() + 1
      let myweekday = date.getDate()
      if (mymonth < 10) {
        mymonth = '0' + mymonth
      }
      if (myweekday < 10) {
        myweekday = '0' + myweekday
      }
      return (myyear + '-' + mymonth + '-' + myweekday)
    },
    fetchData() {
      fetch({
        url: `/reports/strategy/dataCompare`,
        data: {
          startTime: this.startTime,
          endTime: this.endTime,
          levelOne: this.enterpriseId,
          levelTwo: this.groupId,
          levelThree: this.sellId,
          levelFour: this.sellGroupId
        }
      }).then(res => {
        this.finishNumHight = Number(this.getValue(res.finishNumHight)) // 完整度
        this.recordSum = this.getValue(res.recordSum) // 质检抽检数
        this.agentsScore = this.getValue(res.agentsScore) // 探需
        this.majorsRate = this.getValue(res.majorsRate) // 主推专业
        this.classTypeRate = this.getValue(res.classTypeRate) // 主推班型
        this.putAwayRate = this.getValue(res.putAwayRate) // 截杀
        this.enforcedPolicies = Number(this.getValue(res.enforcedPolicies)) // 策略执行率
        this.rapRate = this.getValue(res.rapRate) // RPA
        this.sellConvertRate = this.getValue(res.sellConvertRate) // 销转
        if (this.getValue(res.executeRank) === 0) {
          this.executeRank = '-'
        } else {
          this.executeRank = this.getValue(res.executeRank) // 执行排行
        }
        this.spotCheckRate = this.getValue(res.spotCheckRate) // 抽检比例
        this.violationRate = this.getValue(res.violationRate) // 违规率
        this.multiBarData = [
          this.agentsScore,
          this.majorsRate,
          this.classTypeRate,
          this.putAwayRate
        ]
      })
    },
    getValue(data) {
      const arr = []
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          arr.push(data[key])
        }
      }
      return arr[1] // 取上周
    },
    now() {
      const now = new Date()
      const nowDayOfWeek = now.getDay()
      const nowDay = now.getDate()
      const nowMonth = now.getMonth()
      let nowYear = now.getYear()
      nowYear += (nowYear < 2000) ? 1900 : 0
      return {
        nowDayOfWeek,
        nowDay,
        nowMonth,
        nowYear
      }
    },
    getWeekStartDate() {
      const weekStartDate = new Date(this.now().nowYear, this.now().nowMonth, this.now().nowDay - this.now().nowDayOfWeek)
      return this.formatDate(weekStartDate)
    },
    getWeekEndDate() {
      const weekEndDate = new Date(this.now().nowYear, this.now().nowMonth, this.now().nowDay + (6 - this.now().nowDayOfWeek))
      return this.formatDate(weekEndDate)
    },
    toDetails(id) { // 优秀策略话术进详情
      sessionStorage.setItem('urlOfList', location.pathname)
      sessionStorage.setItem('ids', id)
      this.$router.push({
        path: '/strategyDetail'
        // query: {
        //   id: id
        // }
      })
    },
    toRcordDetails(id) {
      sessionStorage.setItem('record', location.pathname)
      this.$router.push({
        path: '/audioPlay',
        query: {
          showDetail: id
        }
      })
    },
    toCreateStrategy() {
      sessionStorage.setItem('url', location.pathname)
      this.$router.push({
        path: '/createStrategy1',
        query: {
          status: 0,
          id: 0
        }
      })
    },
    toMyStrategy(id) {
      sessionStorage.setItem('urlOfList', location.pathname)
      sessionStorage.setItem('ids', id)
      this.$router.push({
        path: '/strategyDetail'
        // query: {
        //   id: id
        // }
      })
    },
    toDetail() {
      this.$router.push(`/analysisDetail?id=${this.analyze.id}&strategyId=${this.analyze.strategyId}`)
    },
    myRecords() {
      this.goodRecord = 0
      this.ismyRecords = true
      this.isallRecords = false
      queryGoodRecord({
        own: 0,
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodRecordList = res.content
      })
    },
    allRecords() {
      this.goodRecord = 1
      this.ismyRecords = false
      this.isallRecords = true
      queryGoodRecord({
        own: 1,
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodRecordList = res.content
      })
    },
    myStrategy() {
      this.radios = '0'
      this.goodStrategy = 0
      this.ismyStrategy = true
      this.isallStrategy = false
      queryGoodStrategy({ // 优秀策略话术推荐
        own: 0,
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodStrategyList = res.content
      })
    },
    allStrategy() {
      this.radios = '1'
      this.goodStrategy = 1
      this.ismyStrategy = false
      this.isallStrategy = true
      queryGoodStrategy({ // 优秀策略话术推荐
        own: 1,
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodStrategyList = res.content
      })
    },
    setAnalyze(val) { // 切换军团
      function index(i) {
        return i === val
      }
      const i = this.orgIds.findIndex(index)
      const name = this.orgItemNames[i]
      for (let i = 0; i < this.analyzeArr.length; i++) {
        if (name === this.analyzeArr[i].legion) {
          this.analyze = this.analyzeArr[i]
          this.hasAnalyze = true
          break
        } else {
          this.analyze = []
          this.hasAnalyze = false
        }
      }
    },
    //  显示组织部门
    fullBranchName(applydeparts) {
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
  components: {
    pie,
    armyBar
  }
}
</script>
<style lang="scss" src="./index.scss">
</style>
