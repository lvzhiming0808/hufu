<template>
  <div>
    <ul class="create_strategy_nav1">
      <li class="create_strategy_item1 item11">基础信息</li>
      <span class="icon_pen"><icon-svg icon-class="pen" /></span>
      <li class="create_strategy_item1 item12">首咨</li>
      <li class="create_strategy_item1 item13">7天内</li>
      <li class="create_strategy_item1 item14">库存</li>
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
  .create_strategy_nav1{
    display: flex;
    width: 100%;
    padding: 25px 80px 0;
    position: relative;
    text-align: center;
    .icon_pen{
      color: white;
      display: inline-block;
      position: absolute;
      left: 10%;
      top: 40%;
      font-size: 25px;
    }
    .create_strategy_item1{
      font-size: 16px;
      float: left;
      text-align: center;
      line-height: 62px;
      width: 24%;
      height: 62px;
      margin-right: 20px;
    }
    .item11{
      background-color: rgb(247,147,0);
      position: relative;
      color: white;
    }
    .item12, .item13, .item14{
      background-color: rgb(249,246,243);
      position: relative;
      color: #909090;
    }
    .item11::after, .item12:after, .item13:after {
      border: 31px solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      left: 100%;
      position: absolute;
      border-left: 20px solid  rgb(249,246,243);
      top: 0;
    }
    .item11::after {
      border-left: 20px solid  rgb(247,147,0);
    }
    .item12:before , .item13:before ,.item14:before {
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
