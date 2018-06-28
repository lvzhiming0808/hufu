<template>
  <div>
    <ul class="create_strategy_nav3">
      <li class="create_strategy_item3 item31">基础信息</li>
      <span class="icon_yes1"><icon-svg icon-class="yes" /></span>
      <li class="create_strategy_item3 item32">首咨</li>
      <span class="icon_yes2"><icon-svg icon-class="yes" /></span>
      <li class="create_strategy_item3 item33">7天内</li>
      <span class="icon_pen"><icon-svg icon-class="pen" /></span>
      <li class="create_strategy_item3 item34">库存</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
<style lang="scss">
  .create_strategy_nav3{
    display: flex;
    width: 100%;
    position: relative;
    padding: 25px 80px 0;
    text-align: center;
    .icon_yes1, .icon_yes2, .icon_pen{
      color: white;
      display: inline-block;
      position: absolute;
      left: 10%;
      top: 40%;
      font-size: 25px;
    }
    .icon_yes2{
      left: 34%;
    }
    .icon_pen{
      left: 57%;
    }
    .create_strategy_item3{
      float: left;
      text-align: center;
      line-height: 62px;
      width: 24%;
      height: 62px;
      margin-right: 20px;
      font-size: 16px;
    }
    .item31,.item32{
      background-color: rgba(247,147,0,0.2);
      position: relative;
      color: white;
    }
    .item33{
      background-color: rgb(247,147,0);
      position: relative;
      color: white;
    }
    .item34{
      background-color: rgb(249,246,243);
      position: relative;
      color: #909090;
    }
    .item31::after, .item32:after, .item33:after {
      border: 31px solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      left: 100%;
      position: absolute;
      border-left: 20px solid  rgb(249,246,243);
      top: 0;
    }
    .item31::after,.item32:after {
      border-left: 20px solid  rgba(247,147,0,0.2);
    }
    .item33:after{
      border-left: 20px solid  rgb(247,147,0);
    }
    .item32:before , .item33:before ,.item34:before {
      border: 31px solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      left: 0;
      position: absolute;
      border-left: 20px solid  white;
      top: 0;
    }
  }
</style>
