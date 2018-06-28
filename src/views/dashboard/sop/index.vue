<template>
<div class="sop-dashboard-wrapper" :style="{width: `${wrapperWidth}px`}">
  <div class="line-header">
    <span></span>
    <h3>听线数</h3>
  </div>
  <div class="chart-wrapper" id="chart-wrapper" :style="{height: `${chartHeight}px`}" ref='posrel'>
    <div :style="{width: expendWidth}" ref='widthauto'>
      <bar ref="bar" :width="100 * this.number + 'px'" style="max-height:140px;margin-top: 20px;" :barData="barData" :xAxisData="xAxisData" :fontColor="fontColor" :barColor="barColor" :barHoverColor="barHoverColor">
      </bar>
      <div class="tip">
        <p><span>事业部： </span>{{manageOrgName}}</p>
        <p><span>军团数： </span>{{manageArmyCount}}</p>
        <p><span>执行率</span></p>
      </div>
      <span class="arrow" @click="expand" v-show="!isLong" ref='expandarrow'>
        <i class="el-icon-arrow-right"></i>
      </span>
      <span class="arrow" @click="shrink" v-show="isLong" ref='shrinkarrow'>
        <i class="el-icon-arrow-left"></i>
      </span>
    </div>
    <i></i>
    <div v-show="fade">
      <p>{{dayListenStartDate}} ~ {{dayListenEndDate}}</p>
      <ul>
        <li>
          <span>{{recordDay[4].weekDay}}</span>
          <span>{{recordDay[4].date | formatTime}}</span>
          <span>{{recordDay[4].dayCount}}</span>
        </li>
        <li>
          <span>{{recordDay[3].weekDay}}</span>
          <span>{{recordDay[3].date | formatTime}}</span>
          <span>{{recordDay[3].dayCount}}</span>
        </li>
        <li>
          <span>{{recordDay[2].weekDay}}</span>
          <span>{{recordDay[2].date | formatTime}}</span>
          <span>{{recordDay[2].dayCount}}</span>
        </li>
        <li>
          <span>{{recordDay[1].weekDay}}</span>
          <span>{{recordDay[1].date | formatTime}}</span>
          <span>{{recordDay[1].dayCount}}</span>
        </li>
        <li>
          <span>{{recordDay[0].weekDay}}</span>
          <span>{{recordDay[0].date | formatTime}}</span>
          <span>{{recordDay[0].dayCount}}</span>
        </li>
      </ul>
      <line-marker ref="line" :lineData="lineData"></line-marker>
    </div>
    <i></i>
    <div v-show="fade">
      <h3>周听线数 （通）</h3>
      <div class="_line">
        <i :style="{ width: `${oneWeekCount}%` }"></i>
        <span>{{oneWeekCount}}</span>
      </div>
      <p>本周</p>
      <div class="_line">
        <i :style="{ width: `${twoWeekCount}%` }"></i>
        <span>{{twoWeekCount}}</span>
      </div>
      <p>前一周</p>
      <div class="_line">
        <i :style="{ width: `${threeWeekCount}%` }"></i>
        <span>{{threeWeekCount}}</span>
      </div>
      <p>前二周</p>
      <i class="line-col"></i>
    </div>
    <i></i>
    <div v-show="fade">
      <div>
        <p>周听线数 {{hearNumber}}通</p>
        <p>周听线时长 {{Math.ceil(time)}} 分钟</p>
        <span>本周</span>
      </div>
      <div>
        <ul>
          <li>
            <span>军团报告数</span>
            <span>{{gorpNumber}}</span>
          </li>
          <li>
            <span>精品录音数</span>
            <span>{{recordNumber}}</span>
          </li>
          <li>
            <span>提交策略数</span>
            <span>{{strategyNumber}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="approve-header">
    <span></span>
    <h3>审批管理</h3>
    <i></i>
    <!-- <el-radio v-model="radio" @change="handleRadioChange" label="1">已通过</el-radio>
    <el-radio v-model="radio" @change="handleRadioChange" label="2">全部</el-radio> -->
    <router-link tag="span" :to="{ path: 'myStrategy' }">查看更多 ></router-link>
  </div>
  <el-container>
    <el-main>
      <div class="strategy-main">
        <ul>
          <li v-for="(item,index) in strategyList" :key="index">
            <p class="item-header">
              <span @click="toMyStrategy(item.id)">{{item.groupName}}{{item.name}}</span>
              <span v-show="item.isAdd">追加</span>
              <span></span>
              <span v-show="item.status===2">通过</span>
              <span v-show="item.status===3">驳回</span>
              <span v-show="item.status===1">待审核</span>
              <span v-show="item.status===0">草稿</span>
              <span v-show="item.readStatus===1 ">已阅</span>
            </p>
            <p><span>项目：{{item.firstProjectName}}</span>
            </p>
            <p>
              <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; width: 50%;">适用部门： {{fullBranchName(item.applydeparts)}}</span>
              <span>地域： {{item.area}}</span>
              <span></span>
              <span>{{item.createDate}}</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="record-header" style="margin-left: -20px;">
        <span></span>
        <h3>录音质检</h3>
        <i></i>
        <router-link tag="span" :to="{ path: 'myArmy' }">查看更多 ></router-link>
      </div>
      <div class="table-wrapper" id="table-wrapper">
        <ul>
          <li>责任人</li>
          <li>事业部</li>
          <li>军团</li>
          <li>销售部（组）</li>
          <li>机器初筛违规</li>
          <li>录音性质</li>
          <li>是否报名</li>
          <li>质检员</li>
          <li>状态</li>
          <li>工号</li>
        </ul>
        <ul v-for="(item,index) in tableData" :key="index">
          <li>{{item.sellName}}</li>
          <li>{{item.enterpriseName}}</li>
          <li>{{item.groupName}}</li>
          <li>{{item.sellAndGroupName}}</li>
          <li>{{item.isSystem}}</li>
          <li>{{item.recType}}</li>
          <li>{{item.isApply}}</li>
          <li>{{item.examineName}}</li>
          <li>{{item.selectStatus}}</li>
          <li>{{item.workNum}}</li>
        </ul>
      </div>
    </el-main>
    <el-aside>
      <div class="aside-wrapper">
        <header>
          <h3>排行榜</h3>
          <el-select ref="sel" v-model="value" placeholder="请选择" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </header>
        <div class="rank-wrapper">
          <ul>
            <li v-for="(item,index) in ranks" :key="index">
              <span>{{index + 1}}</span>
              <i class="avatar" :class="item.color">{{item.username.slice(0,1)}}</i>
              <span>{{item.username}}</span>
              <span v-if="sort === 'recordCount'">{{item.recordCount}}</span>
              <span v-if="sort === 'totleTime'">{{item.totleTime}}</span>
              <span v-if="sort === 'goodCount'">{{item.goodCount}}</span>
            </li>
          </ul>
          <div class="bottom">
            <router-link tag="span" :to="{ name: '录音排行榜',query:{ sort: sort }}">更多 ></router-link>
          </div>
        </div>
      </div>
    </el-aside>
  </el-container>
</div>
</template>
<script>
import bar from '@/components/charts/bar'
import lineMarker from '@/components/charts/lineMarker'
import fetch from '@/utils/fetch'

export default {
  data() {
    return {
      tableData: [],
      expendWidth: 21.5,
      oneWeekCount: null,
      twoWeekCount: null,
      threeWeekCount: null,
      strategyList: [],
      ranks: [],
      recordDay: [],
      sort: 'recordCount',
      thisWeekCount: '',
      armyReportCount: '',
      strategyCount: '',
      strategyAddCount: '',
      rankName: [],
      rankWeekCount: '',
      radio: '1',
      value: '周听线数',
      lineData: [],
      options: [{
        value: '周听线数'
      },
      {
        value: '精品录音数'
      },
      {
        value: '听线时长（分钟）'
      }
      ],
      dayListenStartDate: '',
      dayListenEndDate: '',
      today: '',
      xAxisData: [],
      names: [],
      values: [],
      barData: [],
      manageOrgName: '',
      manageArmyCount: '',
      fontColor: '#fff',
      barColor: '#ffada2',
      barHoverColor: '#ffc760',
      sumTimeLength: '',
      hearNumber: '',
      time: '',
      gorpNumber: '',
      strategyNumber: '',
      strategyAddNumber: '',
      recordNumber: '',
      wrapperWidth: '',
      chartHeight: 180,
      dropDown: null,
      elSelect: null,
      isLong: false,
      fade: true
    }
  },
  created() {
    fetch({ // 策略列表
      url: '/strategies?status=&pageSize=3&auditStatus=0&pageNum=1&area=&own=&orgs=&firstProjectId='
    }).then(res => {
      this.strategyList = res.content
    })
    fetch({
      url: `/calls??page=1&size=5&enterpriseId=&groupId=&sellId=&sellGroupId=&workNum=&state=&recordType=&recType=&isApply=&isSystem=&startTimeLength=0&endTimeLength=0&selectStatus=`
    }).then(res => {
      this.$set(this, 'tableData', res.content.content)
    })
    fetch('/qc/statistics/dayListen').then(res => {
      const timeArr = res.startDate.split('-')
      const timeArr2 = res.endDate.split('-')
      this.dayListenStartDate = `${timeArr[0]}年${timeArr[1]}月${timeArr[2]}日`
      this.dayListenEndDate = `${timeArr2[0]}年${timeArr2[1]}月${timeArr2[2]}日`
      this.recordDay = res.recordDay
      for (let i = 0; i < this.recordDay.length; i++) {
        this.lineData.push(this.recordDay[i].dayCount)
      }
    })
  },
  mounted() {
    const width = (document.body.clientWidth - 180 - 20)
    this.wrapperWidth = width
    window.addEventListener('resize', () => {
      const width = (document.body.clientWidth - 180 - 20)
      this.wrapperWidth = width
    })
    this.fetchRanks()
    fetch('/qc/statistics/weekListen').then(res => {
      this.oneWeekCount = res.oneWeekCount
      this.twoWeekCount = res.twoWeekCount
      this.threeWeekCount = res.threeWeekCount
    })
    fetch('/qc/statistics/details').then(res => {
      this.hearNumber = res.hearNumber
      this.time = res.time
      this.gorpNumber = res.gorpNumber
      this.strategyNumber = res.strategyNumber
      this.strategyAddNumber = res.strategyAddNumber
      this.recordNumber = res.recordNumber
    })
    setTimeout(() => {
      fetch('/reports/workbench').then(res => {
        this.manageOrgName = res.manageOrgName
        this.manageArmyCount = res.manageArmyCount
        for (const key in res.content) {
          this.names.push(key)
          this.values.push(res.content[key])
        }
        if (this.names.length > 3) {
          this.xAxisData = [this.names[0], this.names[1]]
          this.barData = [this.values[0], this.values[1]]
        } else if (this.names.length === 1 && this.names.length < 2) {
          this.xAxisData = [this.names[0]]
          this.barData = [this.values[0]]
          this.$refs.expandarrow.style.display = 'none'
        }
      })
    }, 200)
    window.addEventListener('scroll', (e) => {
      if (e.target.className === 'el-main') {
        this.dropDown.style.top = `${400 - e.target.scrollTop}px`
      }
    }, true)
  },
  updated() {
    this.dropDown = document.querySelector('.el-select-dropdown')
  },
  components: {
    bar,
    lineMarker
  },
  computed: {
    number() {
      return this.barData.length
    }
  },
  methods: {
    fetchRanks() {
      const url = `/qc/statistics/ranks?startDate=&endDate=&sort=${this.sort}`
      fetch({
        url: url
      }).then(res => {
        // if (this.$refs.numlist.length > 10) {
        //   this.$refs.numlist.siblings.eq(10).style.display = 'none'
        // }
        const list = res.map(item => {
          const obj = Object.assign({}, item)
          if (obj.roleName === 'SOP') {
            obj.color = 'yellow'
          } else if (obj.roleName === 'SOPS') {
            obj.color = 'orange'
          }
          return obj
        })
        this.ranks = list.length > 10 ? list.slice(0, 10) : list
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
    },
    expand() {
      const wrapperHeight = document.querySelector('#chart-wrapper').clientHeight
      if (wrapperHeight === 180) {
        const height = wrapperHeight * 2 + 20
        this.chartHeight = height
      }
      const length = this.values.length
      if (length >= 3 && length < 6) {
        this.barData = this.values
        this.xAxisData = this.names
        this.expendWidth = (21.5 + 22 + 0.5) + '%'
      } else if (length >= 1 && length < 3) {
        this.barData = this.values
        this.xAxisData = this.names
        this.chartHeight = 180
        this.expendWidth = (21.5) + '%'
      } else if (length >= 6 && length < 8) {
        this.barData = this.values
        this.xAxisData = this.names
        this.expendWidth = (21.5 + 22 * 2 + 0.5) + '%'
      } else if (length >= 8) {
        this.barData = this.values
        this.xAxisData = this.names
        this.expendWidth = 100 + '%'
        this.$refs.widthauto.style.overflow = 'auto'
        this.$refs.widthauto.style.position = 'static'
        this.$refs.posrel.style.position = 'relative'
        this.$refs.shrinkarrow.style.top = '80px'
      } else if (length >= 10 && length < 100) {
        this.barData = this.values
        this.xAxisData = this.names
        this.expendWidth = 100 + '%'
        this.$refs.widthauto.style.overflow = 'auto'
        this.$refs.widthauto.style.position = 'static'
        this.$refs.posrel.style.position = 'relative'
        this.$refs.shrinkarrow.style.top = '80px'
      }
      this.isLong = true
    },
    shrink() {
      document.querySelector('#chart-wrapper').style.height = `180px`
      this.expendWidth = 21.5 + '%'
      this.$refs.widthauto.style.overflowX = 'hidden'
      this.$refs.posrel.style.position = 'static'
      this.$refs.widthauto.style.position = 'relative'
      if (this.names.length > 3) {
        this.xAxisData = [this.names[0], this.names[1]]
        this.barData = [this.values[0], this.values[1]]
      } else if (this.names.length === 1 && this.names.length < 2) {
        this.xAxisData = [this.names[0]]
        this.barData = [this.values[0]]
        this.$refs.expandarrow.style.display = 'none'
      }
      this.isLong = false
      this.chartHeight = 180
      this.fade = false
      setTimeout(() => {
        this.fade = true
      }, 400)
    }
  },
  watch: {
    value(val) {
      if (val === '周听线数') {
        this.sort = 'recordCount'
        this.fetchRanks()
      } else if (val === '精品录音数') {
        this.sort = 'goodCount'
        this.fetchRanks()
      } else {
        this.sort = 'totleTime'
        this.fetchRanks()
      }
    }
  },
  filters: {
    formatTime(value) {
      return value.slice(5, 10).replace(/-/, '/')
    }
  }
}
</script>
<style lang="scss" src="./index.scss">
</style>
