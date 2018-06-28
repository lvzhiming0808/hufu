<template>
  <div class="outerStrategy_wrapper" >
    <div class="outerStrategy_header">
      <div class="outerStrategy_header_title">10.27虎符策略/话术推送</div>
      <div class="outerStrategy_header_split"></div>
      <div class="outerStrategy_header_basic">
        <div class="outerStrategy_header_branch">适用部门 : 销售二部 销售三组</div>
        <div class="outerStrategy_header_news">
          <div class="outerStrategy_header_area">地域 : 一线城市</div>
          <div class="outerStrategy_header_project">项目 : 自考</div>
        </div>
      </div>
    </div>
    <div class="outerStrategy_tab">
      <div @click="toggleNowIndex(0)" class="outerStrategy_tab_first" :class="{'tabIndex': nowIndex === 0}">
        <router-link to="/toOuterStrategyDetail/firstStrategy">首咨</router-link>  
      </div>
      <div @click="toggleNowIndex(1)" class="outerStrategy_tab_seven" :class="{'tabIndex': nowIndex === 1}">
        <router-link to="/toOuterStrategyDetail/sevenStrategy"> 一周内</router-link>  
      </div>
      <div @click="toggleNowIndex(2)" class="outerStrategy_tab_repor" :class="{'tabIndex': nowIndex === 2}">
        <router-link to="/toOuterStrategyDetail/reporStrategy"> 库存跨期</router-link>  
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="outerStrategy_footer">
      <img src="../../assets/logo.png" alt="logo">
    </div>
    <div class="mask" v-show="showMask"></div>
    <div class="info_box" v-show="showMask">
      <p class="info_box_title">温馨提示</p>
      <p class="info_box_content"> 已知悉请仔细学习策略话术，严格执行，及时点击学习按钮反馈学习状态，不点击等同于未学习，会直接影响到绩效考核，请重视;</p>
      <p class="info_box_warnning">如页面关闭，可在天网系统消息列表找到本条消息~</p>
      <el-button @click="showMask=false">已知悉</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowIndex: 0,
      showMask: true
    }
  },
  methods: {
    toggleNowIndex(index) {
      this.nowIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
  .outerStrategy_wrapper {
    width: 90%;
    margin: 35px 95px 0px 95px;
    background-color: #fff;
    padding: 55px 65px 10px 65px;
    position: relative;
    .outerStrategy_header {
      width: 100%;
      .outerStrategy_header_title{
        font-size: 16px;
        width: 100%;
        margin-bottom: 20px;
      }
      .outerStrategy_header_split{
        border-bottom: 2px solid #d0d0d0;
      }
      .outerStrategy_header_basic{
        width: 100%;
        margin-top: 20px;
        .outerStrategy_header_branch{
          margin-bottom: 30px;
        }
      }
      .outerStrategy_header_news{
        width: 100%;
        display: flex;
        margin-bottom: 80px;
        .outerStrategy_header_project{
          margin-left: 100px;
        }
      }
    }
    .outerStrategy_tab{
      width: 100%;
      display: flex;
      border-bottom: 2px solid #d0d0d0;
      .outerStrategy_tab_first, .outerStrategy_tab_seven, .outerStrategy_tab_repor {
        margin-right: 30px;
        cursor: pointer;
        a {
          display: block;
          text-decoration: none;
          color: black;
        }   
        .active {
            color : rgb(247,147,0)
          }
      }
      .tabIndex {
        border-bottom: 2px solid rgb(247,147,0);
      }
    }
    .outerStrategy_footer{
      width: 100%;
      text-align: center;
      margin: 10px auto;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0; 
      background: #000;
      opacity: 0.1;
      z-index: 2000;
    }
    .info_box {
      background-color:#F2F2F2;
      border-radius: 4px;
      width: 530px;
      height: 240px;
      margin: 10px auto;
      position: fixed;
      top: 300px;
      left: 600px;
      z-index: 2100;
      padding: 10px 55px;
      .info_box_title {
        font-size: 20px;
        text-align: center;
      }
      .info_box_content {
        margin-top: 25px;
      }
      .info_box_warnning {
        margin-top: 40px;
        color: #FF9900;
      }
      .el-button {
        width: 145px;
        height: 40px;
        margin-top: 20px;
        background-color: #169BD5;
        color: white;
        margin-left: 140px
      }
    }
  }
</style>


