<template>
  <div>
    <header-bar></header-bar>
    <div class="create_wrapper">
      <div class="create_wrapper_inner">
        <div class="basciNewsHeader">
          <div class="detail_header_list"><span @click="goList" style="cursor: pointer"><&nbsp;&nbsp;列表页</span> </div>
          <div class="editStatus" v-show="status==0">您正在创建策略...</div>
          <div class="editStatus" v-show="status==1">您正在编辑策略...</div>
          <div class="close" @click="goBack">X</div>
        </div>
        <strategy-nav></strategy-nav>
        <basic-news-form :editId="editId" :status="status" ref="basicNews"></basic-news-form>
        <el-button type="primary" @click="nextStep" class="next_button">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBar from '../layout/HeadBar.vue'
import strategyNav from './strategyHeader1.vue'
import basicNewsForm from './basicNews.vue'
import { addStrategyBase } from '../../api/createStrategy'
export default {
  components: {
    HeaderBar,
    strategyNav,
    basicNewsForm
  },
  data() {
    return {
      counter: 1
    }
  },
  watch: {
    '$route'(to, from) {
        // from 对象中要 router 来源信息.
        // do your want
    }
  },
  computed: {
    status: {    //  status: 0 -- 创建  1 -- 编辑
      get: function() {
        return this.$route.query.status
      },
      set: function(newValue) {
      }
    },
    editId: {    //  status: 0 -- 创建  1 -- 编辑
      get: function() {
        return this.$route.query.id
      },
      set: function(newValue) {
      }
    }
  },
  methods: {
    goList() {
      sessionStorage.removeItem('oldId')
      sessionStorage.removeItem('strategyId')
      this.$router.push({ path: '/layout/myStrategy' })
    },
    goBack() {
      this.$router.push(sessionStorage.getItem('url'))
    },
    nextStep() {
      const form = this.$refs.basicNews.form
      const input2 = this.$refs.basicNews.input2
      form.activeName ? form.activeName : ''
      input2 ? this.$refs.basicNews.input2 : ''
      if (form.activeName) {
        if (form.activeName.trim().length === 0) {
          this.$message({
            message: '您还有内容没有填全',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
        if (!/[<>:：\、\?\/\\\"\*\|]+/g.test(form.activeName) === false) {
          this.$message({
            message: '您的策略名称含有(\\  / 、 : ： < >  *  |  ?)等特殊字符哦',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
        if (form.activeName.length > 50) {
          this.$message({
            message: '请输入50字符以内的数据',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
      } else {
        this.$message({
          message: '您还有内容没有填全',
          type: 'error',
          customClass: 'element-ui-message'
        })
        return
      }
      if (input2.trim().length === 0) {
        this.$message({
          message: '您还有内容没有填全',
          type: 'error',
          customClass: 'element-ui-message'
        })
        return
      }
      // 地域的东西放在这里 应该是没有问题了
      if (!(form.regionId || form.regionId === 0)) {
        this.$message({
          message: '请选择地域',
          type: 'error',
          customClass: 'element-ui-message'
        })
        return
      }
      //  项目校验
      if (!(form.projectId || form.projectId === 0)) {
        this.$message({
          message: '请选择适用部门',
          type: 'error',
          customClass: 'element-ui-message'
        })
        return
      }
      const strategyId = this.$refs.basicNews.strategyId  // 0
      const { activeName, projectId, regionId, branch } = form
      const applyDeparts = []
      for (let i = 0; i < branch.length; i++) {
        const obj = { id: branch[i] }
        applyDeparts.push(obj)
      }
      addStrategyBase({
        id: strategyId,
        name: activeName,
        firstProjectId: projectId,
        area: regionId,
        applydeparts: applyDeparts
      }, strategyId)
        .then(res => {
          if (res.msg) {
            this.$message({
              message: res.msg + '',
              type: 'error',
              customClass: 'element-ui-message'
            })
            return
          }
          const strategyId = res.strategyId  // 外层的当前策略id
          const oldId = res.firstStrategyPhase.strategyId // 里边的id 对应路径里的id
          sessionStorage.setItem('strategyId', strategyId)
          sessionStorage.setItem('oldId', oldId)
          this.$router.push({ path: '/createStrategy2', query: { status: this.status }})
        })
      this.counter ++
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
      .basciNewsHeader {
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
      background-color: white;
      text-align: center;
      .next_button{
        margin: 110px ;
        width: 220px;
        height: 50px;
      }
    }
  }
</style>
