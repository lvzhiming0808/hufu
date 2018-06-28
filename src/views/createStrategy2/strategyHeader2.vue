<template>
  <div>
    <ul class="create_strategy_nav2">
      <li class="create_strategy_item2 item21">基础信息</li>
      <span class="icon_yes"><icon-svg icon-class="yes" /></span>
      <li class="create_strategy_item2 item22">首咨</li>
      <span class="icon_pen"><icon-svg icon-class="pen" /></span>
      <li class="create_strategy_item2 item23">7天内</li>
      <li class="create_strategy_item2 item24">库存</li>
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
  .create_strategy_nav2{
    display: flex;
    position: relative;
    width: 100%;
    padding: 25px 80px 0;
    text-align: center;
    .icon_pen, .icon_yes{
      color: white;
      display: inline-block;
      position: absolute;
      left: 10%;
      top: 40%;
      font-size: 25px;
    }
    .icon_pen{
      left: 34%;
    }
    .create_strategy_item2{
      float: left;
      text-align: center;
      line-height: 62px;
      width: 24%;
      height: 62px;
      margin-right: 20px;
      font-size: 16px;
    }
    .item21{
      background-color: rgba(247,147,0,0.2);
      position: relative;
      color: white;
    }
    .item22{
      background-color: rgb(247,147,0);
      position: relative;
      color: white;
    }
    .item23, .item24{
      background-color: rgb(249,246,243);
      position: relative;
      color: #909090;
    }
    .item21::after, .item22:after, .item23:after {
      border: 31px solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      left: 100%;
      position: absolute;
      border-left: 20px solid  rgb(249,246,243);
      top: 0;
    }
    .item22:after{
      border-left: 20px solid  rgb(247,147,0);
    }
    .item21::after {
      border-left: 20px solid  rgba(247,147,0,0.2);
    }
    .item22:before , .item23:before ,.item24:before {
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
