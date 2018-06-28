<template>
<div class="ranks-wrapper">
  <header>
    <span @click="back">< 返回首页</span>
    <div class="button-wrapper">
      <el-button size="small" @click="downLoad">导出</el-button>
    </div>
  </header>
  <main>
    <main>
      <header>
        <span>排行筛选</span>
        <el-select size="small" v-model="selectItem">
          <el-option v-for="item in selections" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="week" size="small" v-if="showWeek" @change="setWeekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
        </el-date-picker>
        <el-button size="small" type="primary" @click="submit">确定</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </header>
      <main class="items">
        <ul>
          <li v-for="(item,index) in rankItems" :key="item.username">
            <ul>
              <li><span :class="item.color">{{item.username.slice(0,1)}}</span></li>
              <li>姓名<span>{{item.username}}</span></li>
              <li>周听线数<span>{{item.recordCount}}</span></li>
              <li>听线时长<span>{{item.totleTime}}</span></li>
              <li>精品录音数<span>{{item.goodCount}}</span></li>
            </ul>
          </li>
        </ul>
      </main>
    </main>
  </main>
</div>
</template>

<script>
import fetch, {
  download
} from '@/utils/fetch'
export default {
  data() {
    return {
      week: '',
      month: '',
      showWeek: true,
      selectItem: '',
      startTime: '',
      endTime: '',
      sort: '',
      rankItems: [],
      selections: [{
        value: '周听线数'
      },
      {
        value: '精品录音数'
      },
      {
        value: '听线时长（分钟）'
      }
      ]
    }
  },
  methods: {
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
    back() {
      this.$router.go(-1)
    },
    setWeekValue(val) {
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
    submit() {
      const url = `/qc/statistics/ranks?startDate=${this.startTime}&endDate=${this.endTime}&sort=${this.sort}`
      fetch({
        url: url
      }).then(res => {
        this.rankItems = res.map(item => {
          const obj = Object.assign({}, item)
          if (obj.roleName === 'SOP') {
            obj.color = 'yellow'
          } else if (obj.roleName === 'SOPS') {
            obj.color = 'orange'
          }
          return obj
        })
      })
    },
    reset() {
      this.week = ''
      this.selectItem = '周听线数'
      this.startTime = this.getWeekStartDate()
      this.endTime = this.getWeekEndDate()
      // const url = `/qc/statistics/ranks?startDate=${this.startTime}&endDate=${this.endTime}&sort=${this.sort}`
      // fetch({
      //   url: url
      // }).then(res => {
      //   this.rankItems = res.map(item => {
      //     const obj = Object.assign({}, item)
      //     if (obj.roleName === 'SOP') {
      //       obj.color = 'yellow'
      //     } else if (obj.roleName === 'SOPS') {
      //       obj.color = 'orange'
      //     }
      //     return obj
      //   })
      // })
    },
    downLoad() {
      const url = `/week/down?startTime=${this.startTime}&endTime=${this.endTime}`
      download(url)
    }
  },
  mounted() {
    const item = document.querySelectorAll('.sidebar-item')
    item[0].className += ' router-link-exact-active active'
    this.startTime = this.getWeekStartDate()
    this.endTime = this.getWeekEndDate()
    this.sort = this.$route.query.sort
    if (this.sort === 'recordCount') {
      this.selectItem = '周听线数'
    } else if (this.sort === 'goodCount') {
      this.selectItem = '精品录音数'
    } else {
      this.selectItem = '听线时长（分钟）'
    }
    const url = `/qc/statistics/ranks?startDate=${this.startTime}&endDate=${this.endTime}&sort=${this.sort}`
    fetch({
      url: url
    }).then(res => {
      this.rankItems = res.map(item => {
        const obj = Object.assign({}, item)
        if (obj.roleName === 'SOP') {
          obj.color = 'yellow'
        } else if (obj.roleName === 'SOPS') {
          obj.color = 'orange'
        }
        return obj
      })
    })
  },
  watch: {
    selectItem(val) {
      if (val === '周听线数') {
        this.sort = 'recordCount'
      } else if (val === '精品录音数') {
        this.sort = 'goodCount'
      } else {
        this.sort = 'totleTime'
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    const item = document.querySelectorAll('.sidebar-item')
    item[0].className = 'sidebar-item'
    next()
  }
}
</script>

<style lang="scss" src="./ranks.scss">
</style>
