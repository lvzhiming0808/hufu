<template>
  <div class="approval-wrapper" :style="{width: `${wrapperWidth}px`}">
    <div class="approval-left">
      <div class="approval-left-top">
        <div class="approval-left-top-sels">
          <div class="approval-area">
            <span class="approval-area-text">地域</span>
            <el-select @change="areaChange" style="width: 180px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="approval-area all_deparement">
            <span class="approval-area-text">适用部门</span>
            <el-input style="width: 180px; margin-left: 10px" v-model="input2" @click.native="showBranch" readonly="readonly"></el-input>
            <el-tree
                     v-show="branchShow"
                     :data="treeData" show-checkbox node-key="id"
                     ref="tree" @check-change="throttle(showItem)"
                     :props="defaultProps">
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
        <div class="all-creat">
          <el-radio-group v-model="radio" @change="differentStatus">
            <el-radio change label="">全部</el-radio>
            <el-radio label="0" v-if="$checkRole('draft')">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">已通过</el-radio>
            <el-radio label="3">驳回</el-radio>
          </el-radio-group>
          <button class="approval-btn-succ approval-btns all-creat-add" v-if="$checkRole('createStrategy')" @click="toCreateStrategy">创建+</button>
        </div>
        <div class="approval-bot-list">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <h3 @click="strategyPages(item.id)">
                <span class="bot-list-title">{{item.groupName}}</span>
                <span class="bot-list-strategy">{{item.name}}</span>
              </h3>
              <span class="bot-isadd" v-show="item.isAdd" style="color:red; position: absolute; margin-left: 5px;">(追加)</span>
              <div class="bot-list-status">
                <span class="bot-list-success" v-show="item.status===2">通过</span>
                <span class="bot-list-reject" v-show="item.status===3">驳回</span>
                <span class="bot-list-reject" v-show="item.status===1">待审核</span>
                <span class="bot-list-reject" v-show="item.status===0">草稿</span>
                <span class="bot-list-raded" v-show="item.readStatus===1">已阅</span>
                <span class="bot-list-goEdit" v-show="(item.status==0 || item.status===3) && item.own===1">继续编辑</span>
              </div>
              <div class="bot-list-allinformation">
                <span class="list-allinformation-time">{{item.createDate|date-string}}</span>
                <span>项目：<i class="list-allinformation-project">{{item.firstProjectName}}</i></span>
                <span class="list-allinformation-department">适用部门：<i>{{fullBranchName(item.applydeparts)}}</i></span>
                <span>地域：<i class="list-allinformation-area">{{item.area}}</i></span>
              </div>
              <div class="additional-export">
                <span v-if="$checkRole('editStrategy')">
                  <button class="approval-btn-reset approval-btns edit" v-show="(item.status==0 || item.status===3) && item.own===1" @click="toEditStrategy(item.id)">编辑</button>
                </span>
                <span v-if="$checkRole('addTactics')">
                  <button class="approval-btn-reset approval-btns additional" v-show="(item.status===1 || item.status===2) && item.own===1" @click="strategyPages(item.id)">追加</button>
                </span>
                <button v-if="$checkRole('remarks')" class="approval-btn-reset approval-btns additional" @click="strategyPages(item.id)">备注</button>
                <button v-if="$checkRole('comment')" @click="strategyPages(item.id)" class="approval-btn-reset approval-btns approval">批注</button>
                <button class="approval-btn-reset approval-btns export" @click="download(item.id)">导出</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="block approval-pagination">
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
            <span class="approvel-right-more" @click="excellentStrategyMore(radios1)">更多 ></span>
        </div>
        <div class="approval-right-box-radios">
          <el-radio-group v-model="radios1" @change="eleclentStrategy">
            <el-radio label="1">我的</el-radio>
            <el-radio label="2">全部</el-radio>
          </el-radio-group>
        </div>

        <div class="approval-right-box-list">
          <ol>
            <li @click="toDetails(item.id)" :key="index" style="cursor: pointer" v-for="(item, index) in strategyList">
              <span class="numnerDisplayed">{{index+1}}</span>
              <span class="right-box-list-title">{{item.groupName}}</span>
              <div class="right-box-list-title right-box-list-approvalName">{{item.name}}</div>
              <span class="executive-ability" v-if="item.analysisProperties">执行力<i class="executive-ability-number">{{item.analysisProperties.enforcedPolicies}}111%</i></span>
            </li>
            <p :class="{disanleds1:strategyList.length>0}" style="color:#ccc;font-size:16px;">暂无分析报告</p>
          </ol>
        </div>
      </div>
      <div class="approval-right-mid approval-right-box">
        <div class="right-box-top-title">
          <h3>优秀策略话术推荐</h3>
            <span class="approvel-right-more" @click="speechRecommendation(radios2)">更多 ></span>
        </div>
        <div class="approval-right-box-radios">
          <el-radio-group v-model="radios2" @change="eleclentTalk">
            <el-radio label="0">我的</el-radio>
            <el-radio label="1">全部</el-radio>
          </el-radio-group>
        </div>
        <div class="approval-right-box-list" style="width: 90%">
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
            <p :class="{disanleds1:goodRecordList.length>0}" style="color:#ccc;font-size:16px;">暂无优秀录音</p>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {} from '@api/'
import { findByConditions, queryGoodStrategy, queryGoodRecord } from '@/api/myStrategy'
import { downLoadStrategy, getAreas, getProjects } from '../../../api/createStrategy'
import { queryStrategy } from '../../../api/myStrategy'
import { mapGetters, mapActions } from 'vuex'
import * as types from '@/store/modules/myStrategy/actionTypes'
export default {
  data() {
    return {
      status: null,
      // currentPage: 1,    // 当前页数
      // itemTotal: null,    //  总条数
      branchShow: false,
      options1: [],
      options2: [],
      treeData: [],
      branch: [],
      input2: '',
      selectedOptions: [],
      value: '',
      value2: '',
      // radio: '',
      radios1: '1',
      radios2: '0',
      radios3: '0',
      list: [],
      defaultProps: {
        children: 'item',
        label: 'name'
      },
      goodStrategyList: [],
      goodRecordList: [],
      strategyList: [],
      showSelect: { },
      confirmSelect: { },
     // structureValue: [], // 适用部门的数据
      structure: [],
      wrapperWidth: ''
    }
  },
  computed: {
    ...mapGetters('myStrategy', [
      'pagination',
      'radio'
      // 'structureValue'
    ]),
    radio: {
      get() {
        return this.$store.state.myStrategy.radio
      },
      set(value) {
        this[types.SETRADIO](value)
      }
    }
  },
  methods: {
    ...mapActions('myStrategy', [
      types.SETPAGINATION,
      types.SETRADIO
    ]),
    excellentStrategyMore(labels) {
      this.$router.push({ path: '/layout/dataTable/strategyList', query: { id: this.radios1 }})
    },
    speechRecommendation(labels) {
      this.$router.push({ path: '/layout/boutiqueBank/speechcraft', query: { id: this.radios2 }})
    },
    eleclentRadioMore() {
      this.$router.push({ path: '/layout/boutiqueBank/record', query: { id: this.radios3 }})
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
    // 定义策略列表的请求
    getStrategyList(status, pageNum, area, orgs, firstProjectId) {
      queryStrategy({ // 策略列表
        status: status,    // 全部'' ，草稿0， 待审核1， 通过2， 驳回3  this.radio
        pageSize: 5,
        auditStatus: '',        // 审核情况
        pageNum: pageNum,       // 页数 this.currentPage
        area: area,             // 地域 this.value
        own: '',      // 1--我的   0--全部
        orgs: orgs,             // 适用部门
        firstProjectId: firstProjectId        //   项目 this.value2
      })
        .then(res => {
          this[types.SETPAGINATION]({
            number: res.pageNumber,
            size: 5,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          })
          this.list = res.content
        })
    },
    // 导出功能
    download(id) {
      downLoadStrategy(id)
    },
    showBranch() {
      this.branchShow = !this.branchShow
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
    showItem() {
      const checkedList = this.$refs.tree.getCheckedNodes()
      this.branch = []
      for (let i = 0; i < checkedList.length; i++) {
        if (checkedList[i].item.length === 0) {
          this.branch.push(checkedList[i].id)
        }
      }
      for (let i = 0; i < checkedList.length; i++) {
        const len = checkedList[i].item.length
        if (len > 0) {
          checkedList.splice(i + 1, len)
        }
      }
      this.$set(this.showSelect, 'orgs', this.branch.toString())
      this.input2 = ''
      for (let i = 0; i < checkedList.length; i++) {
        if (checkedList[i].item.length > 0) {
          this.input2 += `${checkedList[i].name} , `
        } else {
          const thisId = checkedList[i].id
          const arr2 = this.findPath({
            item: this.treeData
          }, thisId).map(x => x.name).reverse()
          arr2.pop()
          if (arr2.length === 0) {
            this.input2 += checkedList[i].name + ','
          } else {
            this.input2 += `${arr2[0]} - ${checkedList[i].name},`
          }
        }
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
    handleCurrentChange(val) {
      // this.currentPage = val
      const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
      const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
      const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
      this.getStrategyList(this.radio, this.pagination.number, area, orgs, projectId)
    },
    areaChange(value) {   // 地域改变
      this.$set(this.showSelect, 'area', value)
    },
    projectChange(value) {  //  项目筛选
      this.$set(this.showSelect, 'projectId', value)
    },
    toCreateStrategy() {
      sessionStorage.setItem('url', location.pathname)
      this.$router.push({
        path: '/createStrategy1',
        query: {
          status: 0,
          id: 0
        }
      })
    },
    toEditStrategy(id) {
      sessionStorage.setItem('url', location.pathname)
      this.$router.push({
        path: '/createStrategy1',
        query: {
          status: 1,
          id: id
        }
      })
    },
    strategyPages(id) {
      sessionStorage.setItem('urlOfList', location.pathname)
      sessionStorage.setItem('ids', id)
      this.$router.push({
        path: '/strategyDetail'
      })
    },
    toDetails(id) {  // 优秀策略话术进详情
      sessionStorage.setItem('urlOfList', location.pathname)
      sessionStorage.setItem('ids', id)
      this.$router.push({
        path: '/strategyDetail'
      })
    },
    toRcordDetails(id) {
      sessionStorage.setItem('record', location.pathname)
      this.$router.push({
        path: '/audioPlay',
        query: {
          showDetail: id
        }
      })
    },
    allSure() {
      for (const value in this.showSelect) {
        if (!(this.showSelect[value] === null)) {
          (() => {
            this.$set(this.confirmSelect, value, this.showSelect[value])
          })()
        }
      }
      if (this.value === '' && this.value2 === '' && this.input2 === '') {
        this.$message({
          message: '请输入筛选条件~~~',
          type: 'warning',
          customClass: 'element-ui-message'
        })
        return
      } else {
        const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
        const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
        const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
        this.getStrategyList(this.radio, 1, area, orgs, projectId)
      }
    },
    resetButton() {
      this.value = ''
      this.value2 = ''
      this.$refs.tree.setCheckedKeys([])
      this.input2 = ''
      this.showSelect = {}
      this.confirmSelect = {}
      this.getStrategyList(this.radio, 1, '', '', '')    //  重置后获取所有
    },
    differentStatus(status) {   // 单选框的刷选~~~
      const area = this.confirmSelect.area || this.confirmSelect.area === 0 ? this.confirmSelect.area : ''
      const orgs = this.confirmSelect.orgs ? this.confirmSelect.orgs : ''
      const projectId = this.confirmSelect.projectId || this.confirmSelect.projectId === 0 ? this.confirmSelect.projectId : ''
      this.currentPage = 1
      this.getStrategyList(this.radio, 1, area, orgs, projectId)
    },
    eleclentStrategy(i) {
      findByConditions({ // 策略话术排行榜
        range: i,
        sort: 2,
        size: 5
      }).then(res => {
        if (res.content.length > 0) {
          this.strategyList = res.content
        } else {
          this.strategyList = ['暂无优秀策略话术']
        }
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
    },
    eleclentTalk(i) {
      queryGoodStrategy({ // 优秀策略话术推荐
        own: i,
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.goodStrategyList = res.content
      })
    }
  },
  mounted() {
    this.treeData = this.$store.getters.organization.item
    this.getStrategyList(this.radio, this.pagination.number, '', '', '')    //  获取列表~~~
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
    findByConditions({ // 策略话术排行榜
      range: 1,
      sort: 2,
      size: 5
    }).then(res => {
      this.strategyList = res.content
    })

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

    const width = (document.body.clientWidth - 180 - 20)
    this.wrapperWidth = width
    window.addEventListener('resize', () => {
      const width = (document.body.clientWidth - 180 - 20)
      this.wrapperWidth = width
    })
  }
}
</script>
<style lang="scss" src="./index.scss"></style>
