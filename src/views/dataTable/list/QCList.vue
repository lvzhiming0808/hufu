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
              <el-radio v-model="radio" label="1" @change="getType">月报</el-radio>
              <el-radio v-model="radio" label="2" @change="getType">周报</el-radio>
            </el-form-item>
          </el-form>
        </p>
        <p class="leftcontflot" style="position: relative;">
          <el-date-picker v-model="week" style="position: absolute; z-index: 1; height:28px;" size="mini" v-if="showWeek" @change="setWeek" type="week" format="yyyy 第 WW 周" placeholder="选择周">
          </el-date-picker>
          <el-date-picker v-model="month" style="position: absolute; z-index: 1; height:28px;" v-if="showMonth" size="mini" @change="setMonth" type="month" placeholder="选择月">
          </el-date-picker>
        </p>
        <p class="leftcontflot">
          <el-form ref="form2" label-width="70px" size="mini">
          </el-form>
        </p>
        <div class="leftcontflotright" style="margin-left:130px">
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
                }" fit style="border-bottom: none;" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="50">
            </el-table-column>
            <el-table-column prop="month" v-if="monthItem" label="报表名称" width="300px">
            </el-table-column>
            <el-table-column prop="weekNum" v-if="weekItem" label="报表名称" width="350px">
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
import { mapActions } from 'vuex'
/* eslint-disable */ 
import fetch, {
  download
} from '@/utils/fetch'

export default {
  data() {
    return {
      list: [],
      timeList: [],
      showTable: false,
      showLegion: true,
      totalPages: null, // 总页数
      radio: '1',
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
        return this.$store.state.dataTable.QC.page
      },
      set(value) {
        this['setPage'](value)
      }
    },
    week: {
      get() {
        return this.$store.state.dataTable.QC.week
      },
      set(value) {
        this['setWeekTime'](value)
      }
    },
    month: {
      get() {
        return this.$store.state.dataTable.QC.month
      },
      set(value) {
        this['setMonthTime'](value)
      }
    },
    // showMonth: {
    //   get() {
    //     return this.$store.state.dataTable.QC.showMonth
    //   },
    //   set(value) {
    //     this['setShowMonth'](value)
    //   }
    // },
    // showWeek: {
    //   get() {
    //     return this.$store.state.dataTable.QC.showWeek
    //   },
    //   set(value) {
    //     this['setShowWeek'](value)
    //   }
    // },
    startTime: {
      get() {
        return this.$store.state.dataTable.QC.startTime
      },
      set(value) {
        this['setStartTime'](value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.dataTable.QC.endTime
      },
      set(value) {
        this['setEndTime'](value)
      }
    }
  },
  methods: {
    ...mapActions('dataTable/QC', [
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
        url: `/reports/qualityWeeks?page=${this.page - 1}&type=${this.radio}&startTime=${this.startTime}&endTime=${this.endTime}`
      }).then(res => {
        const data = res.content
        for (let i = 0; i < data.length; i++) {
          const el = data[i]
          if (!el.weekNum) {
            el.nbdata = el.month + '@0'
            el.month = `虎符质检综合月报 ${el.month}`
          } else {
            const year = el.month.slice(0, 4)
            el.nbdata = el.month + '@' + el.weekNum
            el.weekNum = `虎符质检综合周报 ${el.startTime}-${el.endTime}`
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
        const v = this.nbIds.map(item => item.nbdata).toString()
        url = `/reports/qualityWeeks/download?dates=${v}&reportType=${this.radio}`
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
      if (this.radio === '1') {
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
        url: `/reports/qualityWeeks?page=${this.page - 1}&type=${this.radio}`
      }).then(res => {
        const data = res.content
        for (let i = 0; i < data.length; i++) {
          const el = data[i]
          if (!el.weekNum) {
            el.nbdata = el.month + '@0'
            el.month = `虎符质检综合月报 ${el.month}`
            this.showMonth = true
          } else {
            const year = el.month.slice(0, 4)
            el.nbdata = el.month + '@' + el.weekNum
            el.weekNum = `虎符质检综合周报 ${el.startTime}-${el.endTime}`
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
        url: `/reports/qualityWeeks?page=${this.page - 1}&type=${this.radio}&startTime=${this.startTime}&endTime=${this.endTime}`
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
      this.nbIds = val
      this.selectedArr = val.map(item => item.weekId)
    },
    goDetail(row, column, cell, event) {
      if (column.property) {
        if (row.weekNum) {
          const week = row.weekNum
          this.$router.push({
            name: '质检综合报表详情',
            query: {
              month: row.month,
              weekNum: week,
              type: 2,
              nbdata: row.nbdata
            }
          })
        } else {
          const month = row.month.substr(9, 7)
          this.$router.push({
            name: '质检综合报表详情',
            query: {
              month: month,
              type: 1,
              nbdata: row.nbdata
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
      if (this.radio === '1') {
        this.showWeek = false
        this.showMonth = true
        this.monthItem = true
        this.weekItem = false
        this['setMonthTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
        fetch({
          url: `/reports/qualityWeeks?page=${this.page - 1}&type=${this.radio}`
        }).then(res => {
          const data = res.content
          for (let i = 0; i < data.length; i++) {
            const el = data[i]
            if (!el.weekNum) {
              el.nbdata = el.month + '@0'
              el.month = `虎符质检综合月报 ${el.month}`
            } else {
              const year = el.month.slice(0, 4)
              el.nbdata = el.month + '@' + el.weekNum
              el.weekNum = `虎符质检综合周报 ${el.startTime}-${el.endTime}`
            }
          }
          this.$set(this, 'list', data)
          if (res.content.length > 0) {
            this.showTable = true
          }
          this.totalPages = res.totalPages
        })
      } else {
        this.showWeek = true
        this.showMonth = false
        this.monthItem = false
        this.weekItem = true
        this['setWeekTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
        fetch({
          url: `/reports/qualityWeeks?page=${this.page - 1}&type=${this.radio}`
        }).then(res => {
          const data = res.content
          for (let i = 0; i < data.length; i++) {
            const el = data[i]
            if (!el.weekNum) {
              el.nbdata = el.month + '@0'
              el.month = `虎符质检综合月报 ${el.month}`
            } else {
              const year = el.month.slice(0, 4)
              el.nbdata = el.month + '@' + el.weekNum
              el.weekNum = `虎符质检综合周报 ${el.startTime}-${el.endTime}`
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
