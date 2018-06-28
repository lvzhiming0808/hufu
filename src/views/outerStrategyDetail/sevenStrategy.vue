<template>
  <div class="firstStr_wrapper" ref="sevenStr">
    <el-button @click="showSevenStr =! showSevenStr" type="primary" plain><span class="firstStrategy_btn">一周内</span></el-button>
    <div class="firstStr_content" v-show="showSevenStr">
      <div class="firstStr_content_item">
        <p class="firstStr_content_title">唤醒回忆+深入探需: </p>
        <p class="firstStr_content_description">
          文燕测试上周军团培训流程梳理，本周军团整体执行率有所提高，但部分人员执行还是不到位。1
        </p>
      </div>
      <div class="firstStr_content_item">
        <p class="firstStr_content_title">解决首咨遗留问题: </p>
        <p class="firstStr_content_description">
          文燕测试上周军团培训流程梳理，本周军团整体执行率有所提高，但部分人员执行还是不到位。1
        </p>
      </div>
      <div class="firstStr_content_item">
        <p class="firstStr_content_title">主推班型: </p>
        <p class="firstStr_content_description">
          文燕测试上周军团培训流程梳理，本周军团整体执行率有所提高，但部分人员执行还是不到位。1
        </p>
      </div>
      <div class="firstStr_content_item">
        <p class="firstStr_content_title">截杀策略+促销活动: </p>
        <p class="firstStr_content_description">
          文燕测试上周军团培训流程梳理，本周军团整体执行率有所提高，但部分人员执行还是不到位。1
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showSevenStr: false
    }
  }
}
</script>
<style lang="scss" scoped>
.firstStr_wrapper {
  margin-top: 30px;
  position: relative;
  .el-button {
    height: 30px;
    width: 100px;
    position: relative;
    .firstStrategy_btn {
      position: absolute;
      top: 8px;
      left: 28px;
    }
  }
  .firstStr_content {
    width: 100%;
    .firstStr_content_item{
      display: flex;
      margin-top: 15px;
      .firstStr_content_title{
        margin-right: 20px;
        width: 16%;
        text-align: right;
      }
      .firstStr_content_description{
        width: 80%;
        word-break:break-all; 
      }
    }
    
  }
}
</style>
