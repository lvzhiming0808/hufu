<template>
<div>
  <header-bar></header-bar>
  <div class="QCTable-wrapper">
    <header>
      <span @click="back">< 列表页</span>
      <i></i>
      <el-button plain @click="downLoad">导出</el-button>
    </header>
    <main>
      <ul class="unit-header">
        <li>事业部</li>
        <li>总机会数</li>
        <li>抽取数</li>
        <li>抽取率</li>
        <li class="flex2">执行率（执行得分）</li>
        <li>环比</li>
        <li>执行排名</li>
        <li>探需</li>
        <li>主推专业执行占比</li>
        <li>主推班型执行占比</li>
        <li>截杀策略执行占比</li>
        <li>流程完整度</li>
        <li>销转</li>
        <li>RPA</li>
        <li>订单数量</li>
        <li>总体质检数</li>
        <li>质检率</li>
        <li>违规数</li>
        <li>违规率</li>
        <li>环比</li>
      </ul>
      <ul v-for="(item,index) in unit" class="unit-item">
        <li>{{item.orgUnit}}</li>
        <li>{{item.chanceCount}}</li>
        <li>{{item.checkCount}}</li>
        <li>{{item.checkPercent}}</li>
        <li class="flex2">{{item.implementPercent}}</li>
        <li>{{item.implementMom}}</li>
        <li>{{item.rankNum}}</li>
        <li>{{item.talkPercent}}</li>
        <li>{{item.mainMajorPercent}}</li>
        <li>{{item.mainClassPercent}}</li>
        <li>{{item.runOutPercent}}</li>
        <li>{{item.taskFinishPercent}}</li>
        <li>{{item.transfer}}</li>
        <li>{{item.rpa}}</li>
        <li>{{item.orderCount}}</li>
        <li>{{item.qualityCheckCount}}</li>
        <li>{{item.qualityCheckPercent}}</li>
        <li>{{item.violationCount}}</li>
        <li>{{item.violationPercent}}</li>
        <li>{{item.violationMom}}</li>
      </ul>
      <ul class="army-header">
        <li>
          <span>事业部</span>
          <span>军团</span>
          <span>地区</span>
        </li>
        <li>总机会数</li>
        <li>抽取数</li>
        <li>抽取率</li>
        <li class="flex2">执行率（执行得分）</li>
        <li>环比</li>
        <li>执行排名</li>
        <li>探需</li>
        <li>主推专业执行占比</li>
        <li>主推班型执行占比</li>
        <li>截杀策略执行占比</li>
        <li>流程完整度</li>
        <li>销转</li>
        <li>RPA</li>
        <li>订单数量</li>
        <li>总体质检数</li>
        <li>质检率</li>
        <li>违规数</li>
        <li>违规率</li>
        <li>环比</li>
      </ul>
      <ul class="army-item army-header" v-for="(item,index1) in army">
        <li>
          <span>{{item.orgUnit}}</span>
          <span>{{item.orgArmy}}</span>
          <span>{{item.aimName}}</span>
        </li>
        <li>{{item.chanceCount}}</li>
        <li>{{item.checkCount}}</li>
        <li>{{item.checkPercent}}</li>
        <li class="flex2">{{item.implementPercent}}</li>
        <li>{{item.implementMom}}</li>
        <li>{{item.rankNum}}</li>
        <li>{{item.talkPercent}}</li>
        <li>{{item.mainMajorPercent}}</li>
        <li>{{item.mainClassPercent}}</li>
        <li>{{item.runOutPercent}}</li>
        <li>{{item.taskFinishPercent}}</li>
        <li>{{item.transfer}}</li>
        <li>{{item.rpa}}</li>
        <li>{{item.orderCount}}</li>
        <li>{{item.qualityCheckCount}}</li>
        <li>{{item.qualityCheckPercent}}</li>
        <li>{{item.violationCount}}</li>
        <li>{{item.violationPercent}}</li>
        <li>{{item.violationMom}}</li>
      </ul>
      <ul class="army-header">
        <li>
          <span>军团</span>
          <span>销售部</span>
          <span>地区</span>
        </li>
        <li>总机会数</li>
        <li>抽取数</li>
        <li>抽取率</li>
        <li class="flex2">执行率（执行得分）</li>
        <li>环比</li>
        <li>执行排名</li>
        <li>探需</li>
        <li>主推专业执行占比</li>
        <li>主推班型执行占比</li>
        <li>截杀策略执行占比</li>
        <li>流程完整度</li>
        <li>销转</li>
        <li>RPA</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul class="army-item army-header" v-for="(item,index2) in department">
        <li>
          <span>{{item.orgArmy}}</span>
          <span>{{item.orgDepartment}}</span>
          <span>{{item.aimName}}</span>
        </li>
        <li>{{item.chanceCount}}</li>
        <li>{{item.checkCount}}</li>
        <li>{{item.checkPercent}}</li>
        <li class="flex2">{{item.implementPercent}}</li>
        <li>{{item.implementMom}}</li>
        <li>{{item.rankNum}}</li>
        <li>{{item.talkPercent}}</li>
        <li>{{item.mainMajorPercent}}</li>
        <li>{{item.mainClassPercent}}</li>
        <li>{{item.runOutPercent}}</li>
        <li>{{item.taskFinishPercent}}</li>
        <li>{{item.transfer}}</li>
        <li>{{item.rpa}}</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </main>
  </div>
</div>
</template>

<script>
import HeaderBar from '@/views/layout/HeadBar'
import fetch, {
  download
} from '@/utils/fetch'

export default {
  data() {
    return {
      whole: [],
      unit: [],
      army: [],
      department: [],
      month: '',
      weekNum: ''
    }
  },
  created() {
    const weekNum = this.$route.query.weekNum
    const month = this.$route.query.month
    this.month = month
    this.weekNum = weekNum
    if (typeof (weekNum) === 'undefined') {
      fetch({
        url: `/reports/qualityWeekInfo`,
        data: {
          reportType: 1,
          month: this.$route.query.nbdata.split('@')[0]
        }
      }).then(res => {
        this.unit = [...res.whole, ...res.unit]
        this.unit[0].orgUnit = '总计'
        this.army = res.army
        this.department = res.department
      })
    } else {
      const nbdata = this.$route.query.nbdata
      fetch({
        url: `/reports/qualityWeekInfo`,
        data: {
          reportType: 2,
          month: month,
          weekNum: nbdata.split('@')[1]
        }
      }).then(res => {
        this.unit = [...res.whole, ...res.unit]
        this.unit[0].orgUnit = '总计'
        this.army = res.army
        this.department = res.department
      })
    }
  },
  methods: {
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
    },
    back() {
      this.$router.go(-1)
    },
    downLoad() {
      const type = this.$route.query.type
      const nbdata = this.$route.query.nbdata
      const url = `/reports/qualityWeeks/download?dates=${nbdata}&reportType=${type}`
      download(url)
    }
  },
  components: {
    HeaderBar
  }

}
</script>

<style lang="scss" src="./QCsheet.scss">
</style>
