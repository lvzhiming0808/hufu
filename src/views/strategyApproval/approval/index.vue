<template>
  <div class="approval-wrapper">
    <div class="approval-left myStrategy-left">
      <div class="approval-left-top sop-myStrategy-top">
        <div class="approval-left-top-sels">
          <div class="approval-area" >
            <el-select @change="areaChange" v-model="value" placeholder="请选择" ref="areas">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="approval-area-text">地域</span>
          </div>
          <div class="approval-area all_deparement">
            <span class="approval-area-text">适用部门</span>
            <el-input class="approval-area-input" v-model="input" @click.native="showBranch" readonly="readonly"></el-input>
            <el-tree v-show="branchShow" show-checkbox node-key="id" ref="tree" :data="treeData" @check-change="throttle(showItem)" :props="defaultProps">
            </el-tree>
          </div>
          <div class="approval-area">
            <el-select @change="projectChange" v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="approval-area-text">项目</span>
          </div>
        </div>
        <div class="approval-left-top-btn">
          <el-button class="approval-btn-succ approval-btns" @click="allSure">确定</el-button>
          <el-button class="approval-btn-reset approval-btns" type="reset" value="Reset" @click="resetButton">重置</el-button>
        </div>
      </div>

      <div class="approval-left-bot">
         <div class="sop-myStrategy-isstat">
           <div class="sop-myStrategy-isstat-my">
             <!--<select v-model="selected" @change="myOrall(selected)">
                <option :value="test.value" :key="index"  v-for="(test,index) in tests">{{ test.text }}</option>
            </select>-->
           </div>
          <ul>
            <li style="cursor: pointer"><span @click="getAllOrReaddOrNoread(0)" :class="{'approvaListbg': nowIndex === 0}">全部</span></li>
            <li style="cursor: pointer"><span @click="getAllOrReaddOrNoread(1)" :class="{'approvaListbg': nowIndex === 1}">已审批</span></li>
            <li style="cursor: pointer"><span @click="getAllOrReaddOrNoread(2)" :class="{'approvaListbg': nowIndex === 2}">未审批</span></li>
          </ul>
        </div>
        <div class="sop-myStrategy-radios" v-show="nowIndex ===1">
          <el-radio-group v-model="radio" @change="differentStatus">
            <el-radio change label="">全部</el-radio>
            <el-radio label="2">已通过</el-radio>
            <el-radio label="3">驳回</el-radio>
          </el-radio-group>
        </div>
        <div class="approval-bot-list">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <h3 @click="strategyPages(item.id,item.groupName,item.name,true)">
                <span class="bot-list-title">{{item.groupName}}</span>
                <span class="bot-list-strategy">{{item.name}}</span>
              </h3>
              <span class="bot-isadd" v-show="item.isAdd" style="color:red; position: absolute; margin-left: 5px;">(追加)</span>
              <div class="bot-list-status">
                <span class="bot-list-success" v-show="item.status===2">通过</span>
                <span class="bot-list-reject" v-show="item.status===3">驳回</span>
                <span class="bot-list-reject" v-show="item.status===1">待审核</span>
                <span class="bot-list-raded" v-show="item.readStatus===1 ">已阅</span>
              </div>
              <div class="bot-list-allinformation">
                <span class="list-allinformation-time">{{item.createDate|date-string}}</span>
                <span>项目：<i class="list-allinformation-project">{{item.firstProjectName}}</i></span>
               <!-- <span>适用部门：<i class="list-allinformation-department">使用部门</i></span>-->
                <span class="list-allinformation-department">适用部门：<i>{{fullBranchName(item.applydeparts)}}</i></span>
                <span>地域：<i class="list-allinformation-area">{{item.area}}</i></span>
              </div>
              <div class="additional-export">
                <button class="approval-btn-reset approval-btns additional" @click="strategyPages(item.id)">备注</button>
                <button class="approval-btn-reset approval-btns export" @click="downLoad(item.id)">导出</button>
              </div>
            </li>
          </ul>
        </div>

        <div class="block strategy-pagination">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pagination.size"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.number"
            :total="pagination.totalElements">
          </el-pagination>
       </div>
      </div>
    </div>

    <div class="approval-right">
      <div class="approval-right-top approval-right-box">
          <div class="right-box-top-title">
              <h3>策略话术排行榜</h3>
              <span class="approvel-right-more" @click="excellentStrategyMore">更多 ></span>
          </div>
          <div class="approval-right-box-radios">
            <el-radio-group v-model="radios1" @change="eleclentStrategy">
              <el-radio label="1">我的</el-radio>
              <el-radio label="2">全部</el-radio>
            </el-radio-group>
          </div>

          <div class="approval-right-box-list">
            <ol>
              <li @click="toDetails(item.id)" style="cursor: pointer" :key="index" v-for="(item, index) in strategyList">
                <span class="numnerDisplayed">{{index+1}}</span>
                <span class="right-box-list-title">{{item.groupName}}</span>
                <div class="right-box-list-title right-box-list-approvalName">{{item.name}}</div>
                <span class="executive-ability" v-if="item.analysisProperties">执行力<i class="executive-ability-number">{{item.analysisProperties.enforcedPolicies}}%</i></span>
              </li>
              <p :class="{disanleds1:strategyList.length>0}" style="color:#ccc;font-size:14px;">暂无分析报告</p>
            </ol>
          </div>

      </div>
      <div class="approval-right-mid approval-right-box">
        <div class="right-box-top-title">
          <h3>优秀策略话术排行</h3>
            <span class="approvel-right-more" @click="speechRecommendation">更多 ></span>
          </div>
          <div class="approval-right-box-radios">
            <el-radio-group v-model="radios2" @change="eleclentTalk">
              <el-radio label="0">我的</el-radio>
              <el-radio change label="1">全部</el-radio>
            </el-radio-group>
          </div>
          <div class="approval-right-box-list" style="width:90%;">
            <ol>
              <li @click="toDetails(item.id)" style="cursor: pointer" v-for="(item,index) in goodStrategyList" :key="index">
                <span class="right-list-point"></span>
                <span class="right-box-army">{{item.groupName}}</span>
                <span class="right-box-sellStrategy"> {{item.name}}</span>
              </li>
              <p :class="{disanleds1:goodStrategyList.length>0}" style="color:#ccc;font-size:16px;">暂无优秀策略话术</p>
            </ol>
          </div>
      </div>
      <div class="approval-right-bot approval-right-box">
        <div class="approval-right-mid approval-right-box">
        <div class="right-box-top-title">
          <h3>优秀录音推荐</h3>
            <span class="approvel-right-more" @click="eleclentRadioMore">更多 ></span>
        </div>
        <div class="approval-right-box-radios">
          <el-radio-group v-model="radios3" @change="eleclentRadio">
            <el-radio label="0">我的</el-radio>
            <el-radio label="1">全部</el-radio>
          </el-radio-group>
        </div>
        <div class="approval-right-box-list">
          <ol>
            <li style="cursor: pointer" @click="toRcordDetails(item.id)" v-for="(item,index) in goodRecordList" :key="index">
              <span class="right-list-point"></span>
              <span class="right-box-sellStrategy"> {{item.groupName}}</span>
              <span class="right-box-sellStrategy"> {{item.counselorName}}</span>
              <span class="right-box-sellStrategy"> {{item.goodType}}</span>
              <span class="right-box-sellStrategy"> ({{item.itemType}})</span>
              <span class="right-box-sellStrategy"> 录音</span>
            </li>
            <p :class="{disanleds1:goodRecordList.length>0}" style="color:#ccc;font-size:14px;">暂无优秀录音</p>
          </ol>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findByConditions, queryStrategy, queryGoodStrategy, queryGoodRecord } from '@/api/myStrategy'
import { downLoadStrategy, getAreas, getProjects, mes } from '../../../api/createStrategy'
import { mapGetters, mapActions } from 'vuex'
import * as types from '@/store/modules/approval/actionTypes'
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      options1: [],    //  存储地域的数组
      options2: [],   //  存储项目的数组
      selected: 1,
      branchShow: false,
      value: '',
      value2: '',
      // radio: '',
      radios1: '1',
      radios2: '0',
      radios3: '0',
      mymine: '',
      list: [],
      groupID: '',
      strategyList: [],
      goodStrategyList: [],
      goodRecordList: [],
      branch: [],
      treeData: [],
      placeholder: '请选择',
      // nowIndex: 0,
      input: '',
      defaultProps: {
        children: 'item',
        label: 'name'
      },
      props: {
        value: 'label',
        children: 'cities'
      },
      key: '',
      showSelect: { },
      confirmSelect: { },
      loading: false
    }
  },
  computed: {
    ...mapGetters('approval', [
      'pagination',
      'radio',
      'nowIndex'
    ]),
    radio: {
      get() {
        return this.$store.state.approval.radio
      },
      set(value) {
        this[types.SETRADIO](value)
      }
    }
  },
  methods: {
    ...mapActions('approval', [
      types.SETPAGINATION,
      types.SETRADIO,
      types.SETNOWINDEX
    ]),
    excellentStrategyMore() {
      this.$router.push({ path: '/layout/dataTable/strategyList', query: { id: this.radios1 }})
    },
    speechRecommendation(labels) {
      this.$router.push({ path: '/layout/boutiqueBank/speechcraft', query: { id: this.radios2 }})
    },
    eleclentRadioMore() {
      this.$router.push({ path: '/layout/boutiqueBank/record', query: { ida: this.radios3 }})
    },
    // 显示部门
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
    getStrategyList(status, auditStatus, pageNum, area, orgs, firstProjectId) {
      this.loading = true
      queryStrategy({ // 策略列表
        status: status,    // 全部'' , 通过2， 驳回3
        pageSize: 5,
        auditStatus: auditStatus,        // 审核情况  0 全部， 1，已审批， 2，未审批 this.nowIndex
        pageNum: pageNum,       // 页数 this.currentPage
        area: area,            // 地域  this.value
        own: '',      // 1--我的   0--全部
        orgs: orgs,            // 适用部门
        firstProjectId: firstProjectId        //   项目  this.value2
      })
        .then(res => {
          this.loading = false
          // this.itemTotal = res.totalElements
          this[types.SETPAGINATION]({
            number: res.pageNumber,
            size: 5,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          })
          this.list = res.content
        })
    },
    eleclentStrategy(i) {   // 策略话术排行榜的筛选
      findByConditions({ // 策略话术排行榜
        range: i,
        sort: 2,
        size: 5
      }).then(res => {
        this.strategyList = res.content
      })
    },
    handleCurrentChange() {
      if (this.loading) return
      const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
      const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
      const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
      this.getStrategyList(this.radio, this.nowIndex, this.pagination.number, area, orgs, projectId)
    },
    strategyPages(id, armyName, storegyName, CreatedReport) {
      sessionStorage.setItem('urlOfList', location.pathname)
      sessionStorage.setItem('ids', id)
      sessionStorage.setItem('CreatedReport', CreatedReport)
      this.$router.push({
        path: '/strategyDetail'
      })
    },
    toDetails(id) {
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
      // alert(this.$route.query.showShare)
      sessionStorage.setItem('record', location.pathname)
      this.$router.push({
        path: '/audioPlay',
        query: {
          showDetail: id,
          // 从审批管理页面进入录音详情不显示按钮
          showBtn: false
        }
      })
    },
    differentStatus(i) {
      const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
      const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
      const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
      this.getStrategyList(this.radio, this.nowIndex, 1, area, orgs, projectId)
    },
    showBranch() {
      this.branchShow = !this.branchShow
    },
    showItem() {
      const checkedList = this.$refs.tree.getCheckedNodes(true)
      this.branch = []
      for (let i = 0; i < checkedList.length; i++) {
        this.branch.push(checkedList[i].id)
      }
      this.$set(this.showSelect, 'orgs', this.branch.toString())
      this.input = ''
      for (let i = 0; i < checkedList.length; i++) {
        const thisId = checkedList[i].id
        const arr2 = this.findPath({
          item: this.treeData
        }, thisId).map(x => x.name).reverse()
        arr2.pop()
        const inputArr = [checkedList[i].name, ...arr2]
        let nameItem = ''
        for (let i = inputArr.length - 1; i >= 0; i--) {
          const item = inputArr[i]
          nameItem += `${item} - `
        }
        nameItem = nameItem.substring(0, nameItem.lastIndexOf('-'))
        nameItem += `, `
        this.input += nameItem
      }
      setTimeout(() => {
        this.branchShow = false
      }, 500)
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

    areaChange(value) {  // 地域改变
      this.$set(this.showSelect, 'area', value)
    },
    projectChange(value) {  //  项目筛选
      this.$set(this.showSelect, 'projectId', value)
    },
    allSure() {
      for (const value in this.showSelect) {
        if (!(this.showSelect[value] === null)) {
          (() => {
            this.$set(this.confirmSelect, value, this.showSelect[value])
          })()
        }
      }
      if (this.value === '' && this.value2 === '' && this.input === '') {
        this.$message({
          message: '请输入筛选条件~~~',
          type: 'warning',
          customClass: 'element-ui-message'
        })
        return
      } else {
        // const orgs = encodeURIComponent(this.branch.toString())
        const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
        const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
        const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
        this.getStrategyList(this.radio, this.nowIndex, 1, area, orgs, projectId)
      }
    },
    // 导出功能
    downLoad(id) {
      downLoadStrategy(id)
    },
    resetButton() {
      this.value = ''
      this.value2 = ''
      this.confirmSelect = {}
      this.showSelect = {}
      this.$refs.tree.setCheckedKeys([])
      this.getStrategyList(this.radio, this.nowIndex, 1, '', '', '')   // 重置初始化页面时获取列表
    },
    getAllOrReaddOrNoread(index) {    // 全部
      this[types.SETNOWINDEX](index)
      const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
      const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
      const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
      this.getStrategyList(this.radio, this.nowIndex, 1, area, orgs, projectId)
    },
    eleclentTalk(i) {
      queryGoodStrategy({ // 优秀策略话术推荐
        own: i,   //   0 --- 我的  1---全部
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodStrategyList = res.content
      })
    },
    eleclentRadio(i) {
      queryGoodRecord({ // 优秀录音推荐
        own: i,
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodRecordList = res.content
      })
    }
  },
  mounted() {
    mes()
      .then(res => {
        this.treeData = res.mngOrganizations
      })
    getAreas()
      .then(res => {
        this.options1 = res.map((item) => ({
          value: item.id,
          label: item.name
        }))
      })
    getProjects()
      .then(res => { // 获取项目列表
        this.options2 = res.map((item) => ({
          value: item.id,
          label: item.name
        }))
      })
    this.options = this.$store.getters.organization.item.map((item) => ({  // 获取适用部门
      value: item.id,
      label: item.name
    }))
    findByConditions({ // 策略话术排行榜
      range: 1,    // 1 -- 我的
      sort: 2,
      size: 5
    }).then(res => {
      this.strategyList = res.content
    })
    this.getStrategyList(this.radio, this.nowIndex, this.pagination.number, '', '', '')   // 初始化页面时获取列表
    queryGoodStrategy({ // 优秀策略话术推荐
      own: 0,
      pageSize: 5,
      pageNum: 1
    }).then(res => {
      this.goodStrategyList = res.content
    })
    queryGoodRecord({ // 优秀录音推荐
      own: 0,
      pageSize: 5,
      pageNum: 1
    }).then(res => {
      this.goodRecordList = res.content
    })
  }
}
</script>
<style lang="scss" src="../myStrategy/index.scss"></style>
