<template>
<div class="army-record-wrapper">
  <div class="army-record-main">
    <header>
      <i></i><span>筛选方式</span><i></i>
      <router-link :to="{ path: '/compare'}">数据对比 ></router-link>
    </header>
    <div class="filte">
      <span class="label">日期 </span>
      <el-date-picker ref="picker" size="small" v-model="dateVal" type="week" @change="setWeekValue" format="yyyy 第 WW 周" placeholder="选择周">
      </el-date-picker>
      <span class="label">组织机构</span>
      <el-cascader :props="props" change-on-select :options="orgs" size="small" placeholder="选择组织机构" v-model="orgItem" @change="handleSelectOrg">
      </el-cascader>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </div>
    <div class="" style="height: 32px;width: 100%;background: #f9f6f3;">
    </div>
    <div class="links">
      <p>
          <span @click="toAnalysisReport">
             <!-- :class="{disabled1:amays==='0'}" -->
          查看分析报告
          <i></i>
        </span>
      </p>
      <p>
          <span @click="toStrategyTalk">查看策略话术
          <i></i> 
        </span>
      </p>
    </div>
    <div class="charts-wrapper">
      <ul class="item">
        <li>
          <h3>策略执行力</h3>
          <bar-polar :barData="enforcedPolicies"></bar-polar>
        </li>
        <li>
          <h3>流程完整度</h3>
          <row-bar chartName="流程完整度" :barData="finishNumHight"></row-bar>
        </li>
        <li>
          <h3>销转</h3>
          <row-bar chartName="销转" :barData="sellConvertRate"></row-bar>
        </li>
      </ul>
      <ul class="item">
        <li>
          <h3>RPA</h3>
          <rpa-bar chartName="RPA" :barData="rapRate"></rpa-bar>
        </li>   
        <li>
          <h3>执行排名</h3>
          <rate-line chartName="执行排名" :barData="executeRank"></rate-line>
        </li>
        <li>
          <h3>质检抽检数</h3>
          <pictorial-bar chartName="质检抽检数" :barData="recordSum"></pictorial-bar>
        </li>
      </ul>
      <ul class="item">
        <li>
          <h3>抽检比例</h3>
          <row-bar chartName="抽检比例" :barData="spotCheckRate"></row-bar>
        </li>
        <li>
          <h3>违规率</h3>
          <row-bar chartName="违规率" :barData="violationRate"></row-bar>
        </li>
        <li>
          <multi-bar :barData="multiBarData"></multi-bar>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import bar from '@/components/charts/bar'
import rowBar from '@/components/charts/rowBar'
import rpaBar from '@/components/charts/rpaBar'
import pictorialBar from '@/components/charts/pictorialBar'
import multiBar from '@/components/charts/multiBar'
import barPolar from '@/components/charts/barPolar'
import rateLine from '@/components/charts/rateLine'
import fetch from '@/utils/fetch'
// import {
//   timeStart,
//   timeEnd
// } from '../../../utils/formatTime'
import {
  mapActions
  // mapMutations
  // mapGetters
} from 'vuex'

export default {
  data() {
    return {
      orgItem: [],
      orgId: null,
      orgs: [],
      props: {
        value: 'id',
        children: 'children'
      },
      xxx: [],
      xAxisData: ['本周', '前一周', '前二周'],
      barData: [],
      finishNumHight: [],
      multiBarData: {},
      enforcedPolicies: [],
      putAwayRate: [],
      recordSum: [],
      classTypeRate: [],
      majorsRate: [],
      agentsScore: [],
      rapRate: [],
      sellConvertRate: [],
      executeRank: [],
      spotCheckRate: [],
      violationRate: [],
      fontColor: '#000',
      enterpriseId: '', // 事业部
      groupId: '', // 军团
      sellId: '', // 销售部
      sellGroupId: '', // 销售组
      id: null,
      today: ''
     // amays: ''
    }
  },
  computed: {
    startTime: {
      get() {
        return this.$store.state.dataCompare.myarmy.startTime
      },
      set(value) {
        this['setStartTime'](value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.dataCompare.myarmy.endTime
      },
      set(value) {
        this['setEndTime'](value)
      }
    },
    dateVal: {
      get() {
        return this.$store.state.dataCompare.myarmy.dateVal
      },
      set(value) {
        this['setDateVal'](value)
      }
    },
    idObj: {
      get() {
        return this.$store.state.dataCompare.myarmy.idObj
      },
      set(value) {
        this['setIdObj'](value)
      }
    }
  },
  created() {
    this.today = this.formatTime(new Date())
    fetch({
      url: `/reports/organization?range=2`
    }).then(res => {
      this.orgs = res
    })
    // const idObj = JSON.parse(sessionStorage.getItem('idObj'))

    for (const variable in this.idObj) {
      if (this.idObj.hasOwnProperty(variable)) {
        this.orgItem.push(this.idObj[variable])
      }
    }
    this.isLeavel()
  },
  methods: {
    ...mapActions('dataCompare/myarmy', [
      'setStartTime',
      'setEndTime',
      'setDateVal',
      'setIdObj'
    ]),
    isLeavel() {
      if ((this.idObj === null) || (JSON.stringify(this.idObj) === '{}')) {
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
      } else {
        this.enterpriseId = this.idObj.enterpriseId
        this.groupId = this.idObj.groupId
        this.sellId = this.idObj.sellId
        this.sellGroupId = this.idObj.sellGroupId
      }
    },
    toAnalysisReport() {
      this.$router.push({ name: '军团策略与分析报告列表', params: {}})
      // if (this.$route.query.armaySattus === '0') {
      //   return false
      // // 不是军团策略
      // } else {
      // // 是军团策略
      //   this.$router.push({ name: '军团策略与分析报告列表', params: {}})
      // }
    },
    toStrategyTalk() {
      this.$router.push({ name: '军团策略话术列表', params: {}})
      // if (this.$route.query.armaySattus === '0') {
      //   return false
      // // 不是军团策略
      // } else {
      // // 是军团策略
      //   this.$router.push({ name: '军团策略话术列表', params: {}})
      // }
    },
    reset() {
      this.$store.state.dataCompare.myarmy.idObj = null
      this.enterpriseId = ''
      this.enterpriseId = ''
      this.sellId = ''
      this.sellGroupId = ''
      this.startTime = ''
      this.endTime = ''
      this.isLeavel()
      this.fetchData()
      this.orgItem = []
      this.dateVal = ''
    },
    formatTime(time) { // 格式化日期
      function checkTime(i) {
        if (i < 10) {
          i = `0${i}`
        }
        return i
      }
      const date = new Date(time)
      return `${date.getFullYear()}-${checkTime(date.getMonth() + 1)}-${checkTime(date.getDate())}`
    },
    getDate(year, month) {
      const d = new Date(year, month, 0)
      return d.getDate()
    },
    setWeekValue(val) {
      this.dateVal = val
      if (!val) {
        this.startTime = ''
        this.endTime = ''
      } else {
        const timeStamp1 = val.getTime() - 86400000
        const timeStamp2 = val.getTime() + 86400000 * 5
        this.startTime = this.formatTime(timeStamp1)
        this.endTime = this.formatTime(timeStamp2)
      }
    },
    getValue(data) {
      const arr = []
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] === '-') {
            data[key] = 0
          }
          arr.push(data[key])
        }
      }
      return arr
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
        this.finishNumHight = this.getValue(res.finishNumHight) // 完整度
        this.recordSum = this.getValue(res.recordSum) // 质检抽检数
        this.agentsScore = this.getValue(res.agentsScore) // 探需
        this.majorsRate = this.getValue(res.majorsRate) // 主推专业
        this.classTypeRate = this.getValue(res.classTypeRate) // 主推班型
        this.putAwayRate = this.getValue(res.putAwayRate) // 截杀
        this.enforcedPolicies = this.getValue(res.enforcedPolicies) // 策略执行率
        this.rapRate = this.getValue(res.rapRate) // RPA
        this.sellConvertRate = this.getValue(res.sellConvertRate) // 销转
        this.executeRank = this.getValue(res.executeRank).map(item => {
          if (item === 0) {
            item = null
          }
          return item
        })
        this.spotCheckRate = this.getValue(res.spotCheckRate) // 抽检比例
        this.violationRate = this.getValue(res.violationRate) // 违规率
        this.multiBarData = {
          putAwayRate: this.putAwayRate,
          majorsRate: this.majorsRate,
          classTypeRate: this.classTypeRate,
          agentsScore: this.agentsScore
        }
      })
    },
    submit() {
      const arr = [
        this.enterpriseId,
        this.groupId,
        this.sellId,
        this.sellGroupId
      ]
      let willFetch
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
          willFetch = false
        } else {
          willFetch = true
          break
        }
      }
      if (willFetch === false) {
        this.$message({
          message: `请选择组织机构~~`,
          type: 'warning',
          customClass: 'element-ui-message'
        })
      } else {
        this.fetchData()
      }
    },
    handleSelectOrg(val) {
      this.enterpriseId = ''
      this.groupId = ''
      this.sellId = ''
      this.sellGroupId = ''
      if (val.length === 1) {
        this.enterpriseId = val[0]
      } else if (val.length === 2) {
        this.enterpriseId = val[0]
        this.groupId = val[1]
      } else if (val.length === 3) {
        this.enterpriseId = val[0]
        this.groupId = val[1]
        this.sellId = val[2]
      } else if (val.length === 4) {
        this.enterpriseId = val[0]
        this.groupId = val[1]
        this.sellId = val[2]
        this.sellGroupId = val[3]
      }
      const obj = {
        enterpriseId: this.enterpriseId,
        groupId: this.groupId,
        sellId: this.sellId,
        sellGroupId: this.sellGroupId
      }
      this['setIdObj'](obj)
    }
  },
  mounted() {
   // this.setWeekValue()
    this.$store.state.dataCompare.myarmy.idObj = null
    this.enterpriseId = ''
    this.enterpriseId = ''
    this.sellId = ''
    this.sellGroupId = ''
    this.startTime = ''
    this.endTime = ''
    this.isLeavel()
    this.fetchData()
    this.orgItem = []
    this.dateVal = ''
  },
  components: {
    bar,
    rowBar,
    rpaBar,
    pictorialBar,
    multiBar,
    barPolar,
    rateLine
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from)
  //   next(vm => {
  //     // 通过 `vm` 访问组件实例
  //   })
  // }
}
</script>
<style lang="scss" src="./index.scss">
</style>
