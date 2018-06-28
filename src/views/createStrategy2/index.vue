<template>
  <div>
    <header-bar></header-bar>
    <div class="create_wrapper">
      <div class="create_wrapper_inner">
        <div class="strategyFirstHeader">
          <div class="detail_header_list"><span @click="goList" style="cursor: pointer"><&nbsp;&nbsp;列表页</span> </div>
          <div class="editStatus" v-show="status==0">您正在创建策略...</div>
          <div class="editStatus" v-show="status==1">您正在编辑策略...</div>
          <div class="close" @click="goBack">X</div>
        </div>
        <strategy-header></strategy-header>
        <strategy-first ref="firstStrategy"></strategy-first>
        <el-button type="primary" class="next_button" @click="previousStep">上一步</el-button>
        <el-button type="primary" @click="nextStep" class="next_button">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import HeaderBar from '../layout/HeadBar.vue'
import strategyFirst from './strategyFirst.vue'
import strategyHeader from './strategyHeader2.vue'
import { addFirstStrategyPhase } from '../../api/createStrategy'
import Modal from '@/components/modal'
import confirm from '@/components/modal/confirm'
Vue.use(Modal, {
  modals: {
    confirm
  }
})
export default {
  components: {
    HeaderBar,
    strategyHeader,
    strategyFirst
  },
  data() {
    return {
      counter: 1,
      strategyPhaseId: ''
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
    goBack() {
      this.$router.push({ path: '/createStrategy1', query: { status: this.status }})
    },
    goList() {
      sessionStorage.removeItem('strategyId')
      sessionStorage.removeItem('oldId')
      this.$router.push({ path: '/layout/myStrategy' })
    },
    previousStep() {
      setTimeout(() => {
        if (this.$refs.firstStrategy.hasChange) {
          this.$modal.confirm({
            content: '如果上一步，这步操作的数据将消失哈~~~'
          }).then(() => {
            this.$refs.firstStrategy.hasChange = false
            this.$router.push({ path: '/createStrategy1', query: { status: this.status }})
          }).catch(() => {
            this.$refs.firstStrategy.hasChange = true
          })
        } else {
          this.$router.push({ path: '/createStrategy1', query: { status: this.status }})
        }
      }, 200)
    },
    nextStep() {  // 点击下一步，获取数据，提交数据
      this.$refs.firstStrategy.hasChange = false   // 将input框是否改变的状态变为false
      const fileName = this.$refs.firstStrategy.filename
      const url = this.$refs.firstStrategy.fileUrl
      let ok = 0 // 定义一个变量控制提示内容的的不同   0 --- 表单无错误   1 --- 有内容没填全    2 --- 字数超过范围
      const strategyId = sessionStorage.getItem('strategyId')
      const oldId = sessionStorage.getItem('oldId')
      // const newId = this.$refs.firstStrategy.newId
      const firstStrategyFormData = this.$refs.firstStrategy.form
      const needs = firstStrategyFormData.needs
      needs.forEach((item, index) => { item.number = index })
      const mainClassSizes = firstStrategyFormData.mainClassSizes
      mainClassSizes.forEach((item, index) => { item.number = index })
      const secondProjects = firstStrategyFormData.secondProjects
      secondProjects.forEach((item, index) => { item.number = index })
      const killStrategies = firstStrategyFormData.killStrategies
      killStrategies.forEach((item, index) => { item.number = index })
      const firstStrategyPhase = {
        strategyId,
        fileName,
        url,
        needs,
        mainClassSizes,
        secondProjects,
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
      secondProjects.forEach((item, index) => {
        if (item.description.trim().length === 0) {
          ok = 1
        } else if (item.description.length > 250) {
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
     // const isFile = this.$refs.firstStrategy.$refs.formUploadData.file
      const isUpload = this.$refs.firstStrategy.$refs.formUploadData.isUpload
      if (!isUpload) {
        this.$message({
          message: '请选择上传话术~~~',
          type: 'error',
          customClass: 'element-ui-message'
        })
        return
      }
      if (ok === 1) {
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
      ok === 0 && addFirstStrategyPhase(firstStrategyPhase, oldId)
          .then(res => {
            this.$router.push({ path: '/createStrategy3', query: { status: this.status }})
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
      width: 100%;
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
