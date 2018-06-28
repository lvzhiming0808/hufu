<template>
<div class="compare-wrapper">
  <main>
    <header class="filte-header">
      <i></i><span>筛选方式</span><i></i>
      <span @click="back">< 军团仪表盘</span>
    </header>
    <div class="filte">
      <el-select v-model="value" size="small" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="weekVal" @change="setWeek" size="small" type="week" v-if="showWeek" format="yyyy 第 WW 周" placeholder="选择周">
      </el-date-picker>
      <el-date-picker v-model="monthVal" @change="setMonth" size="small" type="month" v-if="showMonth" placeholder="选择月">
      </el-date-picker>
      <el-select v-model="options2Value" size="small" placeholder="请选择" @change="handleLevelChange">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div class="input-wrapper">
        <el-input v-model="input" placeholder="选择组织机构" @click.native="willShowTree" size="small" readonly="readonly"></el-input>
      </div>
      <el-tree show-checkbox node-key="id" v-show="showTree" ref="tree" :data="treeData" @check-change="throttle(showItem)" :props="defaultProps">
      </el-tree>
      <el-button type="primary" size="small" @click="PK">PK</el-button>
      <el-button size="small" @click="resetChecked">重置</el-button>
    </div>
    <header class="compare-header">
      <i></i><span>抽查部门分析对比</span><i></i>
    </header>
    <div class="list-wrapper">
      <ul :style="{width: listWrapperWidth}">
        <li v-for="(item,index) in items" :key="index">
          <div class="wrapper">
            <h3>{{item.orgName}}</h3>
            <p class="line">
              <span></span>
            </p>
            <p class="pie-title">策略执行率</p>
             <!-- @click="toItemcompare('6',branch[index])" -->
            <div class="pie-wrapper">
              <com-pie :ref="pie" name="数据对比-策略执行率" :startTime="startTime" :endTime="endTime" :value="pieValues[index]" :orgId="branch[index]" :color="pieColor" :backGround="bgColor" :fontColor="fontColor" :position="barPosition"></com-pie>
            </div>
            <p class="opportunity-header">总机会数</p>
            <p class="opportunity-num">{{item.content.chanceCountSum}}</p>
            <p class="process">流程完整度</p>
             <!-- style="cursor:pointer" @click="toItemcompare('0',branch[index])" -->
            <p class="process-num">{{item.content.finishNumHight}}%</p>
            <div class="process-bar">
              <p>
                <!-- style="" @click="toItemcompare('6',branch[index])" -->
                <span :style="{ width: `${item.content.finishNumHight === '-' ? 0 : item.content.finishNumHight}%`}"></span>
              </p>
            </div>
            <p class="radar-header">数据分析</p>
            <div class="radar-wrapper">
              <radar :radarVal="[item.content.agentsScore,item.content.sellConvertRate === '-' ? 0 : item.content.sellConvertRate,item.content.majorsRate,item.content.classTypeRate,item.content.putAwayRate]"></radar>
            </div>
            <p class="opportunity-header">质检抽检数</p>
             <!-- style="cursor:pointer" @click="toItemcompare('10',branch[index])" -->
            <p class="opportunity-num">{{item.content.recordSum}}</p>
            <p class="opportunity-header" style="margin-top: -25px;">占比<span>{{item.content.spotCheckRate}}%</span></p>
            <p class="opportunity-header" style="margin: 13px 0 18px 0;">违规率</p>
             <!-- @click="toItemcompare('11',branch[index])" -->
             <!-- <img src="../../../../static/img/down-arrow.png" :class="{percentRotate:Number(item.content.violationRate)>=0}"> -->
            <p class="violations-num">{{item.content.violationRate}}%</p>
            <div class="process-bar" style="margin-bottom: 22px;">
              <p>
                <span :style="{ width: `${item.content.violationRate === '-' ? 0 : item.content.violationRate}%`}"></span>
              </p>
            </div>
            <p class="opportunity-header">RPA</p>
             <!-- style="cursor:pointer" @click="toItemcompare('7',branch[index])" -->
            <p class="opportunity-num">{{item.content.rapRate}}</p>
          </div>
        </li>
        <li style="clear: both;"></li>
      </ul>
    </div>

  </main>
</div>
</template>
<script>
import radar from '@/components/charts/radar'
import comPie from '@/components/charts/comPie'
import {
  getOrgLevels
} from '@/api/compare'
import fetch from '@/utils/fetch'

export default {
  data() {
    return {
      listWrapperWidth: 'auto',
      isReadonly: true,
      pie: null,
      radarVal: [],
      pieColor: '#f79300',
      fontColor: '#f79300',
      bgColor: '#c1c1c1',
      barPosition: ['50%', '50%'],
      showWeek: true,
      showMonth: false,
      startTime: '',
      endTime: '',
      weekVal: '',
      monthVal: '',
      treeData: [],
      showTree: false,
      branch: [],
      pieValues: [],
      items: [],
      options2: [{
        value: 'ARMY',
        label: '军团'
      }, {
        value: 'SALES_DEPARTMENT',
        label: '销售部'
      }, {
        value: 'SALES_GROUP',
        label: '销售组'
      }],
      options: [{
        value: '日期（周）'
      }, {
        value: '日期（月）'
      }],
      options2Value: '军团',
      value: '日期（周）',
      input: '',
      checkedLen: null,
      defaultProps: {
        children: 'item',
        label: 'name'
        // disabled(data, node) { // 是否有可对比数据
        //   return !data.hasQualityData
        // }
      },
      organizationLevel: '',
      orgId: null
    }
  },
  mounted() {
    // const idArr = JSON.parse(sessionStorage.getItem('idArr'))
    // console.log(idArr)
    // if ((idArr === null) || (idArr.length === 0)) {
    const orgId = this.$store.state.user.organization.id
    this.orgId = orgId
    this.organizationLevel = 'ARMY'
    fetch({
      url: `/calls/commons/orgs?id=${this.orgId}`
    }).then(res => {
      for (let i = 0; i < res.length; i++) {
        this.branch.push(res[i].id)
      }
      fetch({
        url: `/reports/strategy/dataPk`,
        data: {
          startTime: this.startTime,
          endTime: this.endTime,
          orgIds: this.branch.toString()
        }
      }).then(res => {
        this.pieValues = []
        for (let i = 0; i < res.length; i++) {
          this.pieValues.push(res[i].content.enforcedPolicies)
        }
        if (this.pieValues.length > 5) {
          this.listWrapperWidth = (this.pieValues.length) * 250 + 'px'
        }
        this.$set(this, 'items', res)
      })
    })
    getOrgLevels(this.organizationLevel).then(res => {
      this.treeData = res
    })

    // this.$refs.tree.setCheckedKeys([this.orgId])
    // } else {
    // const level = JSON.parse(sessionStorage.getItem('level'))
    // this.organizationLevel = level
    // getOrgLevels(this.organizationLevel).then(res => {
    //   this.treeData = res
    //   console.log(res)
    // })
    // console.log(this.$refs.tree)
    // this.$refs.tree.setCheckedKeys(idArr)
    // if (this.organizationLevel === 'ARMY') {
    //   this.options2Value = '军团'
    // } else if (this.organizationLevel === 'SALES_DEPARTMENT') {
    //   this.options2Value = '销售部'
    // } else {
    //   this.options2Value = '销售组'
    // }
    // setTimeout(() => {
    //   this.showItem()
    // }, 300)
    // fetch({
    //   url: `/reports/strategy/dataPk`,
    //   data: {
    //     startTime: this.startTime,
    //     endTime: this.endTime,
    //     orgIds: idArr.toString()
    //   }
    // }).then(res => {
    //   this.pieValues = []
    //   for (let i = 0; i < res.length; i++) {
    //     res[i].content.rapRate = 0
    //     this.pieValues.push(res[i].content.enforcedPolicies)
    //   }
    //   console.log(this.pieValues)
    //   this.$set(this, 'items', res)
    // })
    // }

    const item = document.querySelectorAll('.sidebar-item')
    item[2].className += ' router-link-exact-active active'
  },
  methods: {
    showItem(i) {
      // let checkedList
      // if (i === 2) {
      // checkedList = this.$store.state.user.organization.item
      // } else {
      const checkedList = this.$refs.tree.getCheckedNodes(true)
      // }
      this.branch = []
      for (let i = 0; i < checkedList.length; i++) {
        this.branch.push(checkedList[i].id)
      }
      const len = this.branch.length
      this.checkedLen = len
      if (this.checkedLen > 10) {
        let name = ''
        if (this.organizationLevel === 'ARMY') {
          name = '军团'
        } else if (this.organizationLevel === 'SALES_DEPARTMENT') {
          name = '销售部'
        } else {
          name = '销售组'
        }
        this.$message({
          message: `最多可对比10个${name}的数据~~~`,
          type: 'warning',
          customClass: 'element-ui-message'
        })
      }
      this.input = ''
      for (let i = 0; i < checkedList.length; i++) {
        const thisId = checkedList[i].id
        // console.log(thisId)
        const arr2 = this.findPath({
          item: this.treeData
        }, thisId).map(x => x.name).reverse()
        arr2.pop()
        const inputArr = [checkedList[i].name, ...arr2]
        // console.log(inputArr)
        let nameItem = ''
        for (let i = inputArr.length - 1; i >= 0; i--) {
          const item = inputArr[i]
          nameItem += `${item} - `
        }
        nameItem = nameItem.substring(0, nameItem.lastIndexOf('-'))
        nameItem += `, `
        this.input += nameItem
      }
    },
    throttle(method, context) {
      clearTimeout(method.tId)
      method.tId = setTimeout(() => {
        method.call(context)
      }, 300)
    },
    findPath(node, id, path) {
      if (!path) {
        path = []
      }
      if (node.id === id) {
        return path
      }
      path.push(node)
      if (node.item.some(child => this.findPath(child, id, path))) {
        return path
      }
      path.pop()
      return false
    },
    resetChecked() {
      this.startTime = ''
      this.endTime = ''
      this.organizationLevel = 'ARMY'
      this.options2Value = '军团'
      this.value = '日期（周）'
      this.showWeek = true
      this.showMonth = false
      this.showTree = false
      this.weekVal = ''
      this.monthVal = ''
      this.$refs.tree.setCheckedKeys([])
      sessionStorage.setItem('level', JSON.stringify('ARMY'))
      sessionStorage.setItem('idArr', JSON.stringify([]))
    },
    PK() {
      this.showTree = false
      if (this.checkedLen > 10) {
        let name = ''
        if (this.organizationLevel === 'ARMY') {
          name = '军团'
        } else if (this.organizationLevel === 'SALES_DEPARTMENT') {
          name = '销售部'
        } else {
          name = '销售组'
        }
        this.$message({
          message: `最多可对比10个${name}的数据~~`,
          type: 'warning',
          customClass: 'element-ui-message'
        })
      } else {
        if (this.branch.length === 0) {
          this.$message({
            message: `请选择组织机构~~`,
            type: 'warning',
            customClass: 'element-ui-message'
          })
        } else {
          fetch({
            url: `/reports/strategy/dataPk`,
            data: {
              startTime: this.startTime,
              endTime: this.endTime,
              orgIds: this.branch.toString()
            }
          }).then(res => {
            this.pieValues = []
            for (let i = 0; i < res.length; i++) {
              this.pieValues.push(res[i].content.enforcedPolicies)
            }
            if (this.pieValues.length > 5) {
              this.listWrapperWidth = (this.pieValues.length) * 250 + 'px'
            }
            this.$set(this, 'items', res)
          })
        }
      }
    },
    willShowTree() {
      this.showTree = !this.showTree
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
    getDate(year, month) { // 获取每月有多少天
      const d = new Date(year, month, 0)
      return d.getDate()
    },
    setMonth(val) {
      if (!val) {
        this.startTime = ''
        this.endTime = ''
      } else {
        const timeStamp1 = val.getTime()
        const date = new Date(timeStamp1)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const timeStamp2 = val.getTime() + 86400000 * (this.getDate(year, month) - 1)
        this.startTime = this.formatTime(timeStamp1)
        this.endTime = this.formatTime(timeStamp2)
      }
    },
    setWeek(val) {
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
    handleLevelChange(val) {
      this.organizationLevel = val
      getOrgLevels(this.organizationLevel).then(res => {
        this.treeData = res
      })
      this.input = ''
      // this.$refs.tree.setCheckedKeys([])
    },
    back() {
      this.$router.go(-1)
    }
    // toItemcompare(type, ids) {//点击进入详情页
    //   this.$router.push({
    //     name: '人员对比',
    //     query: {
    //       orgId: ids,
    //       type: type,
    //       startTime: this.startTime,
    //       endTime: this.endTime
    //     }
    //   })
    // }
  },
  components: {
    comPie,
    radar
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal === '日期（周）') {
          this.showWeek = true
          this.showMonth = false
          this.startTime = ''
          this.endTime = ''
          this.weekVal = ''
          this.monthVal = ''
        } else {
          this.showWeek = false
          this.showMonth = true
          this.startTime = ''
          this.endTime = ''
          this.weekVal = ''
          this.monthVal = ''
        }
      },
      deep: true
    }
  },
  beforeRouteLeave(to, from, next) {
    const item = document.querySelectorAll('.sidebar-item')
    item[2].className = 'sidebar-item'
    sessionStorage.setItem('level', JSON.stringify(this.organizationLevel))
    sessionStorage.setItem('idArr', JSON.stringify(this.branch))
    next()
  }
}
</script>
<style lang="scss" src="./compare.scss">
</style>
