<template>
<div class="leftbox">
  <div class="leftb">
    <router-link :to="{ name: '虎符质检综合报表列表' }">
      <el-button type="text" class="text">虎符质检综合报表 <i class="el-icon-arrow-right"></i></el-button>
    </router-link>
  </div>
  <div class="leftb" v-if="$checkRole('dashboard') === 'sop'">
    <router-link :to="{ name: '虎符质检抽查打分表列表' }">
      <el-button type="text" class="text">虎符质检抽查打分表 <i class="el-icon-arrow-right"></i></el-button>
    </router-link>
  </div>
  <div class="leftb">
    <router-link :to="{ name: '军团策略与分析报告列表' }">
      <el-button type="text" class="text">军团策略与分析报告 <i class="el-icon-arrow-right"></i></el-button>
    </router-link>
  </div>
  <div class="leftb" v-if="$checkRole('dashboard') === 'sop'">
    <router-link :to="{ name: '工作量报表列表' }">
      <el-button type="text" class="text">工作量报表 <i class="el-icon-arrow-right"></i></el-button>
    </router-link>
  </div>
  <div class="leftb">
    <router-link :to="{ name: '军团策略话术列表' }">
      <el-button type="text" class="text">军团策略话术 <i class="el-icon-arrow-right"></i></el-button>
    </router-link>
  </div>
  <span class="falgs" @click="showOrhide"><i :class='clasName'></i></span>
</div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
      clasName: 'el-icon-arrow-left'
    }
  },
  methods: {
    showOrhide() {
      var leftBox = document.querySelector('.leftbox')
      if (this.flag) {
        this.flag = false
        this.clasName = 'el-icon-arrow-right'
        leftBox.style.marginLeft = '-157px'
      } else {
        this.flag = true
        this.clasName = 'el-icon-arrow-left'
        leftBox.style.marginLeft = '0px'
      }
    }
  }
}
</script>
<style lang="scss" src="./index.scss"></style>
