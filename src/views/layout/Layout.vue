<template>
<el-container>
  <head-bar></head-bar>
  <el-container>
    <el-aside width="180px"><side-bar></side-bar></el-aside>
    <el-main style="padding:0;"><app-main></app-main></el-main>
  </el-container>
</el-container>
</template>


<script>
import { SideBar, HeadBar, AppMain } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    SideBar,
    HeadBar,
    AppMain
  }
}
</script>

<style lang="stylus">

</style>
