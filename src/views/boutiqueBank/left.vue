<template>
  <div class="leftbox">
    <div class="leftb">
        <router-link to="speechcraft">
          <el-button type="text" class="text">军团策略话术 <i class="el-icon-arrow-right"></i></el-button>
        </router-link>
      </div>
      <div class="leftb">
        <router-link to="record">
          <el-button type="text" class="text">销售录音 <i class="el-icon-arrow-right"></i></el-button>
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
<style lang="scss" scoped>
 .falgs{
    width: 15px;
    height: 55px;
    padding-left: 1px;
    background: #181924;
    border-radius: 50px 0px 0 50px;
    position: absolute;
    top: 45%;
    right: 0;
    //color: #61637f;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: -23px;
    cursor: pointer;
  }
</style>

