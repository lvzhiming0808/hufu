<template>
  <div>
    <header-bar></header-bar>
    <div class="create_wrapper">
      <div class="create_wrapper_inner">
        <div class="strategyFirstHeader">
          <div class="detail_header_list"><span @click="goList" style="cursor: pointer"><&nbsp;&nbsp;列表页</span> </div>
          <div class="editStatus" v-show="status==0">您正在创建策略...</div>
          <div class="editStatus" v-show="status==1">您正在编辑策略...</div>
          <div @click="goBack" class="close">X</div>
        </div>
        <strategy-header></strategy-header>
        <whitn-seven ref="withinSevenDays"></whitn-seven>
        <el-button type="primary" class="next_button" @click="previousStep">上一步</el-button>
        <el-button type="primary" @click="nextStep" class="next_button">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import HeaderBar from '../layout/HeadBar.vue'
  import whitnSeven from './whitnSeven.vue'
  import strategyHeader from './strategyHeader3.vue'
  import Modal from '@/components/modal'
  import confirm from '@/components/modal/confirm'
  import { addSecStrategyPhase } from '../../api/createStrategy'
  Vue.use(Modal, {
    modals: {
      confirm
    }
  })
  export default {
    components: {
      HeaderBar,
      strategyHeader,
      whitnSeven
    },
    data() {
      return {

      }
    },
    computed: {
      status: {    //  status: 0 -- 创建  1 -- 编辑
        get: function() {
          return this.$route.query.status
        },
        set: function(newValue) {
        }
      }
    },
    methods: {
      goList() {
        sessionStorage.removeItem('strategyId')
        sessionStorage.removeItem('oldId')
        this.$router.push({ path: '/layout/myStrategy' })
      },
      goBack() {
        this.$router.push({ path: 'createStrategy2', query: { status: this.status }})
      },
      previousStep() {
        if (this.$refs.withinSevenDays.hasChange) {
          this.$modal.confirm({
            content: '如果上一步，这步操作的数据将消失哈~~~'
          }).then(() => {
            this.$refs.withinSevenDays.hasChange = false
            this.$router.push({ path: '/createStrategy2', query: { status: this.status }})
          }).catch(() => {
            this.$refs.withinSevenDays.hasChange = true
          })
        } else {
          this.$router.push({ path: '/createStrategy2', query: { status: this.status }})
        }
      },
      nextStep() {
        this.$refs.withinSevenDays.hasChange = false   // 将input框是否改变的状态变为false
        const fileName = this.$refs.withinSevenDays.filename
        const url = this.$refs.withinSevenDays.fileUrl
        let ok = 0 // 定义一个变量控制提示内容的的不同   0 --- 表单无错误   1 --- 有内容没填全    2 --- 字数超过范围
        // const strategyId = this.$refs.withinSevenDays.strategyId
        const strategyId = sessionStorage.getItem('strategyId')
        const oldId = sessionStorage.getItem('oldId')
        // const newId = this.$refs.withinSevenDays.newId
        const sevenStrategyFormData = this.$refs.withinSevenDays.form
        const needs = sevenStrategyFormData.needs
        needs.forEach((item, index) => { item.number = index })
        const mainClassSizes = sevenStrategyFormData.mainClassSizes
        mainClassSizes.forEach((item, index) => { item.number = index })
        const solveFirstProblems = sevenStrategyFormData.solveFirstProblems
        solveFirstProblems.forEach((item, index) => { item.number = index })
        const killStrategies = sevenStrategyFormData.killStrategies
        killStrategies.forEach((item, index) => { item.number = index })
        const secStrategyPhase = {
          strategyId,
          fileName,
          url,
          needs,
          mainClassSizes,
          solveFirstProblems,
          killStrategies
        }
        needs.forEach((item, index) => {
          if (item.needName.trim().length === 0) {
            ok = 1
          }
          if (item.needName.length > 250) {
            ok = 2
          }
        })
        mainClassSizes.forEach((item, index) => {
          if (item.description.trim().length === 0) {
            ok = 1
          } else if (item.description.length > 250) {
            ok = 2
          }
        })
        solveFirstProblems.forEach((item, index) => {
          if (item.solve.trim().length === 0) {
            ok = 1
          } else if (item.solve.length > 250) {
            ok = 2
          }
        })
        killStrategies.forEach((item, index) => {
          if (item.description.trim().length === 0) {
            ok = 1
          } else if (item.description.length > 250) {
            ok = 2
          }
        })
        if (ok === 1) {
          // alert('你还有内容没有填写完~~~')
          this.$message({
            message: '你还有内容没有填写完~~~',
            type: 'error',
            customClass: 'element-ui-message'
          })
        }
        if (ok === 2) {
          this.$message({
            message: '请输入250字符以内的数据',
            type: 'error',
            customClass: 'element-ui-message'
          })
        }
        // const isFile = this.$refs.withinSevenDays.$refs.formUploadData.file
        const isUpload = this.$refs.withinSevenDays.$refs.formUploadData.isUpload
        if (!isUpload) {
          this.$message({
            message: '请选择上传话术~~~',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
        ok === 0 && addSecStrategyPhase(secStrategyPhase, oldId)
            .then(res => {
              this.$router.push({ path: '/createStrategy4', query: { status: this.status }})
            })
      }
    }
  }
</script>
<style lang="scss">
  .create_wrapper {
    width: 100%;
    height: 100%;
    margin-top: 80px;
    padding: 33px 30px 0 30px;
    .create_wrapper_inner{
      background-color: white;
      text-align: center;
      .strategyFirstHeader {
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        background-color: rgb(247, 147, 0);
        .detail_header_list{
          width: 20%;
          margin-left: 50px;
          font-size: 16px;
          text-align: left;
        }
        .editStatus{
          width: 60%;
          text-align: center;
          font-size: 16px;
        }
        .close{
          width: 20%;
          font-size: 16px;
          margin-right: 50px;
          text-align: right;
          cursor: pointer;
        }
      }
      .next_button{
        margin: 110px ;
        width: 220px;
        height: 50px;
      }
    }
  }
</style>
