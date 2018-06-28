<template>
<div class="main-wrapper">
  <div class="rightbox">
    <!-- 我的 -->
    <div class="righttitle">
      <span class="rightspanbg"></span>
      <span class="rightspanbg2">筛选方式</span>
    </div>
    <div class="rightcont">
      <div class="righctop">
        <p class="leftcontflot">
          <el-form label-width="70px" size="mini">
            <el-form-item label="筛选维度">
              <el-radio v-model="type" label="month" @change="getType">月报</el-radio>
              <el-radio v-model="type" label="week" @change="getType">周报</el-radio>
            </el-form-item>
          </el-form>
        </p>
        <p class="leftcontflot weekMounth" style="position: relative;">
          <el-date-picker style="position: absolute; z-index: 1; height:28px;" v-model="week" size="mini" v-if="showWeek" @change="setWeek" type="week" format="yyyy 第 WW 周" placeholder="选择周">
          </el-date-picker>
          <el-date-picker style="position: absolute; z-index: 1; height:28px;" v-model="month" v-if="showMonth" size="mini" @change="setMonth" type="month" placeholder="选择月">
          </el-date-picker>
        </p>
        <p class="leftcontflot">
          <el-form ref="form2" label-width="70px" size="mini">
          </el-form>
        </p>
        <div class="leftcontflotright" style="margin-left: 130px;">
          <el-button @click="submit" type="warning" size="mini">确定</el-button>
          <el-button type="warning" plain size="mini" @click="reset">重置</el-button>
        </div>
      </div>
      <div class="righcent">
        <div class="down">
          <el-button @click="downLoad" type="warning" size="mini">下载</el-button>
        </div>
        <div class="righcentlist">
          <el-table v-if="showTable" ref="multipleTable" :data="list" stripe :header-cell-style="{
                  'border-bottom': 'none',
                }" @cell-click="goDetail" :cell-style="{
                  'border-bottom': 'none',
                  cursor: 'pointer',
                  padding: '5px 0'
                }" fit style="border-bottom: none;padding-bottom:20px" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="50">
            </el-table-column>
            <el-table-column prop="month" v-if="monthItem" label="报表名称" width="300px">
            </el-table-column>
            <el-table-column prop="weekNum" v-if="weekItem" label="报表名称" width="300px">
            </el-table-column>
          </el-table>
        </div>
        <div class="righcentlistbtn">
          <div class="block approval-pagination">
            <el-pagination layout="prev, pager, next" :current-page.sync="page" :page-count="totalPages" @current-change="handleSizeChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions
  // mapMutations
  // mapGetters
} from 'vuex'

import fetch, {
  download
} from '@/utils/fetch'

export default {
  data() {
    return {
      tempselectedArr: [],
      list: [],
      timeList: [],
      showTable: false,
      showLegion: true,
      totalPages: null, // 总页数
      type: 'month',
      monthItem: true,
      weekItem: false,
      showWeek: false,
      showMonth: true,
      types: [{
        value: 'time',
        label: '时间',
        children: [{
          value: 'week',
          label: '周'
        }, {
          value: 'month',
          label: '月'
        }]
      }],
      selectedArr: []
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.dataTable.workLoad.page
      },
      set(value) {
        this['setPage'](value)
      }
    },
    week: {
      get() {
        return this.$store.state.dataTable.workLoad.week
      },
      set(value) {
        this['setWeekTime'](value)
      }
    },
    month: {
      get() {
        return this.$store.state.dataTable.workLoad.month
      },
      set(value) {
        this['setMonthTime'](value)
      }
    },
    // showMonth: {
    //   get() {
    //     return this.$store.state.dataTable.workLoad.showMonth
    //   },
    //   set(value) {
    //     this['setShowMonth'](value)
    //   }
    // },
    // showWeek: {
    //   get() {
    //     return this.$store.state.dataTable.workLoad.showWeek
    //   },
    //   set(value) {
    //     this['setShowWeek'](value)
    //   }
    // },
    startTime: {
      get() {
        return this.$store.state.dataTable.workLoad.startTime
      },
      set(value) {
        this['setStartTime'](value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.dataTable.workLoad.endTime
      },
      set(value) {
        this['setEndTime'](value)
      }
    }
  },
  methods: {
    ...mapActions('dataTable/workLoad', [
      'setPage',
      'setWeekTime',
      'setMonthTime',
      // 'setShowWeek',
      // 'setShowMonth',
      'setStartTime',
      'setEndTime'
    ]),
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
    getDate(year, month) { // 获取每月有多少天
      const d = new Date(year, month, 0)
      return d.getDate()
    },
    submit() {
      this['setPage'](1)
      fetch({
        url: `/week?pageNumber=${this.page - 1}&workType=${this.type}&startTime=${this.startTime}&endTime=${this.endTime}`
      }).then(res => {
        const data = res.content
        for (let i = 0; i < data.length; i++) {
          const el = data[i]
          if (el.weekNum === 0) {
            el.nbdata = el.month + '@0'
            el.month = `月工作量报表 ${el.month}`
          } else {
            el.nbdata = el.month + '@' + el.weekNum
            el.weekNum = `周工作量报表 ${el.month}年第${el.weekNum}周`
          }
        }
        this.$set(this, 'list', data)
        if (res.content.length > 0) {
          this.showTable = true
        }
        this.totalPages = res.totalPages
      })
    },
    setMonth(val) {
      if (!val) {
        this['setStartTime']('')
        this['setEndTime']('')
      } else {
        const timeStamp1 = val.getTime()
        const date = new Date(timeStamp1)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const timeStamp2 = val.getTime() + 86400000 * (this.getDate(year, month) - 1)
        this['setStartTime'](this.formatTime(timeStamp1))
        this['setEndTime'](this.formatTime(timeStamp2))
      }
    },
    setWeek(val) {
      if (!val) {
        this['setStartTime']('')
        this['setEndTime']('')
      } else {
        const timeStamp1 = val.getTime() - 86400000
        const timeStamp2 = val.getTime() + 86400000 * 5
        this['setStartTime'](this.formatTime(timeStamp1))
        this['setEndTime'](this.formatTime(timeStamp2))
      }
    },
    downLoad() {
      if (this.selectedArr.length > 0) {
        let url
        const v = this.tempselectedArr.map(item => item.nbdata).toString()
        if (this.type === 'month') {
          url = `/week/download?workType=month&dates=${v}`
        } else {
          url = `/week/download?workType=week&dates=${v}`
        }
        download(url)
        window.close()
      } else {
        return false
      }
    },
    toCreate(id, strategyId) {
      this.$router.push({
        path: '/analysisDetail',
        query: {
          id: id,
          strategyId: strategyId
        }
      })
    },
    reset() {
      if (this.type === 'month') {
        this['setMonthTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
      } else {
        this['setWeekTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
      }
    },
    init() {
      fetch({
        url: `/week?pageNumber=${this.page - 1}&workType=${this.type}`
      }).then(res => {
        const data = res.content
        for (let i = 0; i < data.length; i++) {
          const el = data[i]
          if (el.weekNum === 0) {
            el.nbdata = el.month + '@0'
            el.month = `月工作量报表 ${el.month}`
          } else {
            el.nbdata = el.month + '@' + el.weekNum
            el.weekNum = `周工作量报表 ${el.month}年第${el.weekNum}周`
          }
        }
        this.$set(this, 'list', data)
        if (res.content.length > 0) {
          this.showTable = true
        }
        this.totalPages = res.totalPages
      })
    },
    handleSizeChange(page) {
      this['setPage'](page)
      fetch({
        url: `/week?pageNumber=${this.page - 1}&workType=${this.type}&startTime=${this.startTime}&endTime=${this.endTime}`
      }).then(res => {
        if (res.content.length > 0) {
          this.showTable = true
        }
        const data = res.content
        this.$set(this, 'list', data)
        this.totalPages = res.totalPages
      })
    },
    handleSelectionChange(val) {
      this.tempselectedArr = val
      this.selectedArr = val.map(item => item.weekId)
    },
    goDetail(row, column, cell, event) {
      if (column.property) {
        if (row.weekNum !== 0) {
          const week = row.weekNum.replace(/[^0-9]/ig, '').slice(4)
          const month = row.month
          this.$router.push({
            name: '工作量报表详情',
            query: {
              month: month,
              weekNum: week,
              workType: 'week'
            }
          })
        } else {
          const month = row.month.substr(7, 7)
          this.$router.push({
            name: '工作量报表详情',
            query: {
              month: month,
              workType: 'month'
            }
          })
        }
      } else {
        return false
      }
    },
    handleSelectOrg(value) {
    },
    getType(val) {
      if (this.type === 'month') {
        this.showWeek = false
        this.showMonth = true
        // this['setShowWeek'](false)
        // this['setShowMonth'](true)
        this.monthItem = true
        this.weekItem = false
        this['setMonthTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
        fetch({
          url: `/week?pageNumber=${this.page - 1}&workType=${this.type}`
        }).then(res => {
          const data = res.content
          for (let i = 0; i < data.length; i++) {
            const el = data[i]
            if (el.weekNum === 0) {
              el.nbdata = el.month + '@0'
              el.month = `月工作量报表 ${el.month}`
            } else {
              el.nbdata = el.month + '@' + el.weekNum
              el.weekNum = `周工作量报表 ${el.month}年第${el.weekNum}周`
            }
          }
          this.$set(this, 'list', data)
          if (res.content.length > 0) {
            this.showTable = true
          }
          this.totalPages = res.totalPages
        })
      } else {
        // this['setShowWeek'](true)
        // this['setShowMonth'](false)
        this.showWeek = true
        this.showMonth = false
        this.monthItem = false
        this.weekItem = true
        this['setWeekTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
        fetch({
          url: `/week?pageNumber=${this.page - 1}&workType=${this.type}`
        }).then(res => {
          const data = res.content
          for (let i = 0; i < data.length; i++) {
            const el = data[i]
            if (el.weekNum === 0) {
              el.nbdata = el.month + '@0'
              el.month = `月工作量报表 ${el.month}`
            } else {
              el.nbdata = el.month + '@' + el.weekNum
              el.weekNum = `周工作量报表 ${el.month}年第${el.weekNum}周`
            }
          }
          this.$set(this, 'list', data)
          if (res.content.length > 0) {
            this.showTable = true
          }
          this.totalPages = res.totalPages
        })
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.righttitle {
    padding-left: 0;
    margin-bottom: 15px;

    .rightspanbg {
        background: #f79300;
        padding-left: 4px;
    }

    .rightspanbg2 {
        padding-left: 10px;
    }
}
.el-table thead {
    display: none !important;
}
.rightcont {
    width: 100%;
    padding-left: 15px;

    > .righctop {
        width: 100%;
        display: flex;
        margin-top: 16px;
        padding-left: 1px;
    }
    // .weekMounth{
    //   .el-picker-panel,.el-date-picker,.el-popper{
    //     position: absolute;
    //     z-index: 111;
    //   }
    // }
    // .leftcontflot2 {
    //     float: left;
    //     width: 3%;
    //     text-align: center;
    //     line-height: 30px;
    //     margin-right: 2px;
    // }

    .leftcontflot {
        width: auto;
        padding-right: 20px;

        .el-form-item__label {
            text-align: right;
        }
        .el-picker-panel el-date-picker el-popper{
          position: absolute !important;
          z-index: 1 !important;
        }
    }

    .leftinputleft {
        width: 20%;

        .el-date-editor.el-input {
            width: 100%;
        }
    }

    .leftcontflotright2 {
        margin-right: 10px;
    }

    .el-input__ic,
    .el-select__caret {
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }

    .el-icon-arrow-down:before,
    .el-icon-arrow-up:before {
        content: "";
    }

    .el-icon-arrow-up {
        position: absolute;
        top: 12px;
        right: 5px;
        border-bottom: 6px solid #f79300;
    }

    .righcent {
        width: 100%;
        height: auto;

        > div {
            width: 100%;
            height: auto;
        }

        .down {
            margin: 15px 0;
        }

        .righcentlistbtn {
            float: right;
            margin: 30px 10px 30px 0;

            .el-pager li {
                color: #c8c8c8;
            }

            .el-pager li:hover {
                color: #f79300;
            }

            .el-pager li.active {
                color: #f79300;
                cursor: default;
            }
        }
    }
}
</style>
