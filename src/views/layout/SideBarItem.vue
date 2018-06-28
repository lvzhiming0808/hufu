<template>
<el-menu class="sidebar-wrapper" mode="vertica" :default-active="$route.path">
  <router-link v-for="(item,index) in routes" :key="index" :to="'/layout/' + index" class="sidebar-item" tag="li" >
    <span class="svg-container">
      <icon-svg :icon-class="index | filter" />
    </span>
    <div class="name">
      {{item}}
    </div>
  </router-link>
</el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'avatar',
      'showName',
      'branch',
      'job'
    ])
  },
  props: {
    routes: {
      type: Object
    }
  },
  filters: {
    filter(item) {
      if (item.indexOf('/') > 0) {
        return item.slice(0, item.indexOf('/'))
      }
      return item
    }
  }
}
</script>

<style lang="stylus" scoped>
.sidebar-wrapper
  width 180px
  overflow-y auto    
  position fixed
  background #181924
  top 80px
  left 0
  bottom 0
  z-index 100
  &::-webkit-scrollbar {display:none}
  .user-info
    width 100%
    height 200px
    color #ffffff
    text-align center
    font-weight buld
    .logo
      width 60px
      height 60px
      border-radius 50%
      margin-top 20px
      margin-bottom 16px
    .show-name
      font-size 16px
    .branch
      color #61637f
      font-size 12px
      margin 16px 0 8px 0
      padding 0 10px
      line-height 16px
      max-height 32px
      overflow hidden
    .job
      color #61637f    
      font-size 12px
      max-height 14px
      overflow hidden
  .sidebar-item
    width 100%
    height 90px
    padding 12px 0
    box-sizing border-box
    text-align center
    cursor pointer
    color #61637f   
    padding-bottom 100px
    box-sizing border-box
    border-left 4px solid #181924
    .svg-container
      font-size 34px
    .name
      font-size 14px
      margin-top 12px
  .active
    background #222334
    border-color #f79300
    color #f79300
    .svg-container
      color #f79300          
</style>
