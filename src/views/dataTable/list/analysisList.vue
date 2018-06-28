<template>
<div class="main-wrapper">
  <div class="rightbox">
    <el-tabs v-model="range" style="background:#fff">
      <!-- 我的 -->
      <el-tab-pane label="我的" name="1">
        <div class="righttitle">
          <span class="rightspanbg"></span>
          <span class="rightspanbg2">筛选方式</span>
        </div>
        <div class="rightcont">
          <div class="righctop">
            <p class="leftcontflot">
              <el-form label-width="70px" size="mini">
                <el-form-item label="筛选维度">
                  <el-cascader size="mini" :options="types" v-model="item">
                  </el-cascader>
                </el-form-item>
              </el-form>
            </p>
            <p class="leftcontflot">
              <el-date-picker v-model="week" size="mini" v-if="showWeek" @change="setWeekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
              </el-date-picker>
              <el-date-picker v-model="month" v-if="showMonth" size="mini" @change="setMonthValue" type="month" placeholder="选择月">
              </el-date-picker>
              <el-cascader :props="props" change-on-select :options="orgsMy" size="mini" placeholder="选择组织结构" v-model="orgItem" v-show="showOrg" @change="handleSelectOrg">
              </el-cascader>
            </p>
            <p class="leftcontflot">
              <el-form ref="form2" label-width="70px" size="mini" v-show="false">
                <el-form-item label="排序方式">
                  <el-select v-model="sortValue" @change="changeSort" placeholder="请选择">
                    <el-option v-for="(item, index) in sortOptions" :value="item.value" :key="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </p>
            <div class="leftcontflotright">
              <el-button @click="submit" type="warning" size="mini">确定</el-button>
              <el-button type="warning" plain size="mini" @click="reset">重置</el-button>
            </div>
          </div>
          <div class="righcent">
            <div class="down">
              <el-button @click="downLoad" type="warning" size="mini">下载</el-button>
            </div>
            <div class="righcentlist">
              <el-table ref="multipleTable" :data="list" stripe :header-cell-style="{
                  'border-bottom': 'none',
                }" @cell-click="goDetail" :cell-style="{
                  'border-bottom': 'none',
                  cursor: 'pointer',
                  padding: '5px 0'
                }" fit style="border-bottom: none;" @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" width="50">
                </el-table-column>
                <el-table-column prop="reportName" label="分析报告名称" width="300px">
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
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
      </el-tab-pane>
      <!-- 全部  -->
      <el-tab-pane label="全部" name="2">
        <div class="righttitle">
          <span class="rightspanbg"></span>
          <span class="rightspanbg2">筛选方式</span>
        </div>
        <div class="rightcont">
          <div class="righctop">
            <p class="leftcontflot">
              <el-form label-width="70px" size="mini">
                <el-form-item label="筛选维度">
                  <el-cascader size="mini" :options="types" v-model="item">
                  </el-cascader>
                </el-form-item>
              </el-form>
            </p>
            <p class="leftcontflot">
              <el-date-picker v-model="week" v-if="showWeek" size="mini" @change="setWeekValue" type="week" format="yyyy 第 WW 周" placeholder="选择周">
              </el-date-picker>
              <el-date-picker v-model="month" v-if="showMonth" size="mini" @change="setMonthValue" type="month" placeholder="选择月">
              </el-date-picker>
              <el-cascader :props="props" :options="orgsAll" change-on-select size="mini" placeholder="选择组织结构" v-model="orgItem" v-show="showOrg" @change="handleSelectOrg">
              </el-cascader>
            </p>
            <p class="leftcontflot">
              <el-form ref="form2" label-width="70px" size="mini" v-show="false">
                <el-form-item label="排序方式">
                  <el-select v-model="sortValue" placeholder="请选择" @change="changeSort">
                    <el-option v-for="(item,index) in sortOptions" :value="item.value" :key="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </p>
            <div class="leftcontflotright">
              <el-button @click="submit" type="warning" size="mini">确定</el-button>
              <el-button type="warning" plain size="mini" @click="reset">重置</el-button>
            </div>
          </div>
          <div class="righcent">
            <div class="down">
              <el-button @click="downLoad" type="warning" size="mini">下载</el-button>
            </div>
            <div class="righcentlist">
              <el-table ref="multipleTable" :data="list" stripe :header-cell-style="{
                  'border-bottom': 'none',
                }" @cell-click="goDetail" :cell-style="{
                  'border-bottom': 'none',
                  cursor: 'pointer',
                  padding: '5px 0'
                }" fit style="border-bottom: none;" @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" width="50">
                </el-table-column>
                <el-table-column prop="reportName" label="分析报告名称" width="300px">
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
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
      </el-tab-pane>
    </el-tabs>
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
      props: {
        value: 'id',
        children: 'children'
      },
      list: [],
      timeList: [],
      showLegion: true,
      totalPages: null, // 总页数
      orgsMy: [],
      orgsAll: [],
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
      },
      {
        value: 'org',
        label: '组织结构'
      }
      ],
      sortOptions: [{
        value: '策略执行率（从高到低）'
      }, {
        value: '策略执行率（从低到高）'
      }],
      selectedArr: []
    }
  },
  created() {
    fetch({
      url: `/reports/organization?range=1`
    }).then(res => {
      this.orgsMy = res
    })
    fetch({
      url: `/reports/organization?range=2`
    }).then(res => {
      this.orgsAll = res
    })
  },
  computed: {
    range: {
      get() {
        return this.$store.state.dataTable.analysis.range
      },
      set(value) {
        this['setRange'](value)
      }
    },
    page: {
      get() {
        return this.$store.state.dataTable.analysis.page
      },
      set(value) {
        this['setPage'](value)
      }
    },
    sort: {
      get() {
        return this.$store.state.dataTable.analysis.sort
      },
      set(value) {
        this['changeSort'](value)
      }
    },
    sortValue: {
      get() {
        return this.$store.state.dataTable.analysis.sortValue
      },
      set(value) {
        this['changeSort'](value)
      }
    },
    item: {
      get() {
        return this.$store.state.dataTable.analysis.item
      },
      set(value) {
        this['setItem'](value)
      }
    },
    week: {
      get() {
        return this.$store.state.dataTable.analysis.week
      },
      set(value) {
        this['setWeekTime'](value)
      }
    },
    month: {
      get() {
        return this.$store.state.dataTable.analysis.month
      },
      set(value) {
        this['setMonthTime'](value)
      }
    },
    showMonth: {
      get() {
        return this.$store.state.dataTable.analysis.showMonth
      },
      set(value) {
        this['setShowMonth'](value)
      }
    },
    showWeek: {
      get() {
        return this.$store.state.dataTable.analysis.showWeek
      },
      set(value) {
        this['setShowWeek'](value)
      }
    },
    showOrg: {
      get() {
        return this.$store.state.dataTable.analysis.showOrg
      },
      set(value) {
        this['setShowOrg'](value)
      }
    },
    startTime: {
      get() {
        return this.$store.state.dataTable.analysis.startTime
      },
      set(value) {
        this['setStartTime'](value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.dataTable.analysis.endTime
      },
      set(value) {
        this['setEndTime'](value)
      }
    },
    orgItem: {
      get() {
        return this.$store.state.dataTable.analysis.orgItem
      },
      set(value) {
        this['setOrgItem'](value)
      }
    },
    orgId: {
      get() {
        return this.$store.state.dataTable.analysis.orgId
      },
      set(value) {
        this['setOrgId'](value)
      }
    }
  },
  methods: {
    ...mapActions('dataTable/analysis', [
      'changeSort',
      'setRange',
      'setPage',
      'setItem',
      'setWeekTime',
      'setMonthTime',
      'setShowWeek',
      'setShowMonth',
      'setShowOrg',
      'setStartTime',
      'setEndTime',
      'setOrgItem',
      'setOrgId'
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
      const len = this.$store.state.dataTable.analysis.item.length
      if (len === 1) {
        this['setPage'](1)
        fetch({
          url: `/reports/analyzes?page=${this.page - 1}&startTime=${this.startTime}&endTime=${this.endTime}&sort=${this.sort}&range=${this.range}&orgId=${this.orgId || ''}`
        }).then(res => {
          this.list = res.content
          this.totalPages = res.totalPages
        })
      } else {
        this['setPage'](1)
        fetch({
          url: `/reports/analyzes?page=${this.page - 1}&startTime=${this.startTime}&endTime=${this.endTime}&sort=${this.sort}&range=${this.range}&orgId=${''}`
        }).then(res => {
          this.list = res.content
          this.totalPages = res.totalPages
        })
      }
    },
    setMonthValue(val) {
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
    setWeekValue(val) {
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
        const url = `/reports/analyzes/download?ids=${this.selectedArr.toString()}`
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
      this['changeSort']('策略执行率（从高到低）')
      this['setItem'](['time', 'week'])
      this['setWeekTime']('')
      this['setMonthTime']('')
      this['setStartTime']('')
      this['setEndTime']('')
      this['setOrgId']('')
    },
    init() {
      fetch({
        url: `/reports/analyzes?page=${this.page - 1}&range=${this.range}&startTime=${this.startTime}&endTime=${this.endTime}&sort=${this.sort}&orgId=${this.orgId || ''}`
      }).then(res => {
        this.list = res.content
        this.totalPages = res.totalPages
      })
    },
    handleSizeChange(page) {
      this['setPage'](page)
      fetch({
        url: `/reports/analyzes?page=${this.page - 1}&range=${this.range}&startTime=${this.startTime}&endTime=${this.endTime}&sort=${this.sort}&orgId=${this.orgId || ''}`
      }).then(res => {
        this.list = res.content
        this.totalPages = res.totalPages
      })
    },
    handleSelectionChange(val) {
      this.selectedArr = val.map(item => item.id)
    },
    goDetail(row, column, cell, event) {
      if (column.property) {
        this.$router.push({
          path: '/analysisDetail',
          query: {
            id: row.id,
            strategyId: row.strategyId
          }
        })
      } else {
        return false
      }
    },
    handleSelectOrg(val) {
      this['setOrgId'](val[val.length - 1])
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    range(val) {
      this['changeSort']('策略执行率（从高到低）')
      this['setPage'](1)
      this['setItem'](['time', 'week'])
      this['setWeekTime']('')
      this['setMonthTime']('')
      this['setShowMonth'](false)
      this['setShowWeek'](true)
      this['setStartTime']('')
      this['setEndTime']('')
      this.orgs = []
      this['setOrgItem']([])
      this['setOrgId'](null)
      this.init()
    },
    item(val) {
      this['setMonthTime']('')
      this['setWeekTime']('')
      const item = this.item[this.item.length - 1]
      if (item === 'week') {
        this['setShowMonth'](false)
        this['setShowWeek'](true)
        this['setShowOrg'](false)
        this['setOrgItem']([])
        this['setWeekTime']('')
        this['setMonthTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
      } else if (item === 'month') {
        this['setWeekTime']('')
        this['setMonthTime']('')
        this['setStartTime']('')
        this['setEndTime']('')
        this['setShowMonth'](true)
        this['setShowWeek'](false)
        this['setShowOrg'](false)
        this['setOrgItem']([])
      } else {
        this['setWeekTime']('')
        this['setMonthTime']('')
        this['setShowMonth'](false)
        this['setShowWeek'](false)
        this['setStartTime']('')
        this['setEndTime']('')
        this['setOrgItem']([])
        this['setShowOrg'](true)
      }
    }
  }
}
</script>
