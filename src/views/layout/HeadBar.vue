<template>
<el-header height="80px">
  <div class="headbar-wrapper">
    <router-link to="/">
      <img class="logo" :src="logo" />
    </router-link>
    <div class="tool-bar">
      <div class="info">
        <div class="avatar-wrapper">
          <div class="avatar">{{showName | createAvatar}}</div>
        </div>
        <div class="detail">
          <div class="show-name">{{showName}}</div>
          <!-- <div class="branch">
            <span :title="branch">{{branch}}</span>
          </div> -->
        </div>
      </div>
      <span
        class="svg-container ling"
        @click="handleLing()"
        @mouseover="showMask = true"
        @mouseout="showMask = false"
      >
        <div class="count" v-show="totleNum">
          {{totleNum | createPop}}
        </div>
        <icon-svg icon-class="ling" />
      </span>
      <span class="svg-container setting"
            @mouseover="showLogout = true"
            @mouseout="showLogout = false"
            @click="handleSetting()"
      >
        <icon-svg icon-class="setting" />
      </span>
    </div>
    <div class="mask" 
      v-show="showMask"
      @mouseover="showMask = true"
      @mouseout="showMask = false">
      <div class="title">我的消息</div>
      <div class="item" v-for="(item, index) in contents" :key="index">
        <div class="left">
          <span class="item-count">{{item.number}} 个</span>
          <router-link class="item-name" tag="span" :to="'' + item.url">{{item.name}}</router-link> 
        </div>
        <div class="right">
          <icon-svg icon-class="arrow-right"></icon-svg>
        </div>
      </div>
    </div>
    <div 
      class="logout"
      v-show="showLogout"
      @mouseover="showLogout = true"
      @mouseout="showLogout = false"
      @click="handleLogout"
      >
      退出      
    </div>
  </div>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
import { logout } from '@/utils/logOut'
export default {
  data() {
    return {
      logo: require('../../assets/logo.png'),
      banch: '',
      showMask: false,
      showLogout: false
    }
  },
  methods: {
    handleSetting() {
    },
    handleLing() {
      this.$router.push('/messageCenter')
    },
    handleLogout() {
      this.$store.state.dataCompare.myarmy.idObj = null
      logout()
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'showName',
      'branch'
    ]),
    ...mapGetters('bell', [
      'totleNum',
      'contents'
    ])
  },
  filters: {
    createAvatar(showName) {
      return showName.slice(0, 1)
    },
    createPop(num) {
      return num < 99 ? num : '99+'
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-header
    position fixed
    z-index 10001
    top 0
    left 0
    width 100%
    background #fff
  .headbar-wrapper
    display flex
    justify-content space-between
    .logo
      margin-top 10px
    .tool-bar
      height 80px
      overflow hidden
      display flex
      position absolute
      right 20px
      .info
        display flex
        padding-top 18px
        width 200px
        height 100%
        box-sizing border-box
        .avatar-wrapper
          width 40px
          box-sizing border-box
          .avatar
            width 40px
            height 40px
            text-align center
            border-radius 50%
            background #f79300
            font-weight 700
            line-height 40px
            color white
        .detail
          margin-left 16px
          width 100px
          display inline-block
          height 100%
          line-height 20px
          font-size 12px
          .show-name
            width: 100px;
            padding: 8px 0 0 1px;
            font-size 14px
            font-family '微软雅黑'
            overflow hidden
            text-overflow ellipsis
            white-space: nowrap;
          .branch
            color #949494
            width: 100px;
            font-size 14px
            font-family '微软雅黑'
            overflow hidden
            text-overflow ellipsis
            white-space: nowrap;
      .svg-container
        font-size 30px
      .setting
        width 70px
        line-height 80px
        text-align center
        cursor pointer
        &:hover
          background-color #f5f5f5
      .ling
        width 70px
        position relative
        line-height 80px
        text-align center
        cursor pointer
        &:hover
          background-color #f5f5f5
      .count
        position absolute
        font-size 12px
        background #f79300
        width 25px
        height 25px
        top 10px
        left 30px
        line-height 25px
        text-align center
        border-radius 50%
        color #ffffff
    .mask 
      width 140px
      height auto
      background-color white
      position absolute
      top 80px
      right 90px
      display flex
      flex-direction column
      border 1px solid #e5e5e5
      .title
        height 32px
        border-bottom 1px solid #e5e5e5
        line-height 32px
        text-indent 10px
      .item 
        color #cecece
        display flex
        justify-content space-between
        padding: 0 5px 0 12px
        box-sizing border-box
        height 28px
        line-height 28px
        cursor pointer
        &:hover
          color white
          background-color  #f79300
          .item-name
            color white
        .item-name 
          color #f79300
    .logout
      width 100px
      height 40px
      position absolute
      cursor pointer
      top 80px
      right 10px
      background-color white
      text-align center
      line-height 40px
      border: 1px solid #cccccc
      border-radius 3px
</style>
