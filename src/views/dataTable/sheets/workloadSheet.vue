<template>
<div>
  <header-bar></header-bar>
  <div class="work-wrapper">
    <header>
      <span @click="back">< 列表页</span>
      <i></i>
      <el-button plain @click="handleDownload">导出</el-button>
    </header>
    <main>
      <div class="table-name">
        {{label}}
      </div>
      <ul class="table-header">
        <li>排名</li>
        <li>SOP专员</li>
        <li>负责事业部</li>
        <li>负责军团数</li>
        <li class="flex2">负责军团</li>
        <li>周听线数（通）</li>
        <li>听线时长</li>
        <li>军团报告数</li>
        <li>优秀录音标记数</li>
        <li>系统策略提交数</li>
      </ul>
      <ul class="table-main" v-for="(item,index) in tableData">
        <li>{{item.rank}}</li>
        <li>{{item.name}}</li>
        <li>{{item.divisionName}}</li>
        <li>{{item.number}}</li>
        <li class="flex2">{{item.legionName}}</li>
        <li>{{item.hearNumber}}</li>
        <li>{{item.time}}</li>
        <li>{{item.gorpNumber}}</li>
        <li>{{item.recordNumber}}</li>
        <li>{{item.strategyNumber}}</li>
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
      id: '',
      label: '',
      tableData: [],
      weekNum: '',
      month: '',
      workType: ''
    }
  },
  created() {
    this.weekNum = this.$route.query.weekNum
    this.month = this.$route.query.month
    this.workType = this.$route.query.workType
    if (typeof (this.weekNum) === 'undefined') {
      this.label = '月工作量报表'
      fetch({
        url: `/week/info?month=${this.month}&workType=${this.workType}`
      }).then(res => {
        this.tableData = res
      })
    } else {
      this.label = '周工作量报表'
      fetch({
        url: `/week/info?weekNum=${this.weekNum}&month=${this.month}&workType=${this.workType}`
      }).then(res => {
        this.tableData = res
      })
    }
  },
  methods: {
    handleDownload() {
      if (this.workType === 'month') {
        const url = `/week/download?workType=month&dates=${this.month}@0`
        download(url)
      } else {
        const url = `/week/download?workType=week&dates=${this.month}@${this.weekNum}`
        download(url)
      }
    },
    back() {
      this.$router.go(-1)
    }
  },
  components: {
    HeaderBar
  }
}
</script>

<style lang="scss" src="./workloadSheet.scss">
</style>
