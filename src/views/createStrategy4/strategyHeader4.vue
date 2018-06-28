<template>
  <div>
    <ul class="create_strategy_nav4">
      <li class="create_strategy_item4 item41">基础信息</li>
      <span class="icon_yes1"><icon-svg icon-class="yes" /></span>
      <li class="create_strategy_item4 item42">首咨</li>
      <span class="icon_yes2"><icon-svg icon-class="yes" /></span>
      <li class="create_strategy_item4 item43">7天内</li>
      <span class="icon_yes3"><icon-svg icon-class="yes" /></span>
      <li class="create_strategy_item4 item44">库存</li>
      <span class="icon_pen"><icon-svg icon-class="pen" /></span>
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
<style scoped lang="scss">
  .create_strategy_nav4{
    display: flex;
    width: 100%;
    position: relative;
    padding: 25px 80px 0;
    text-align: center;
    .icon_yes1, .icon_yes2, .icon_yes3, .icon_pen{
      color: white;
      display: inline-block;
      position: absolute;
      left: 11%;
      top: 40%;
      font-size: 25px;
    }
    .icon_yes2{
      left: 34%;
    }
    .icon_yes3{
      left: 56%;
    }
    .icon_pen{
      left: 78%;
    }
    .create_strategy_item4{
      float: left;
      text-align: center;
      line-height: 62px;
      width: 24%;
      height: 62px;
      margin-right: 20px;
      color: white;
    }
    .item41,.item42,.item43{
      background-color: rgba(247,147,0,0.2);
      position: relative;
    }
    .item44{
      background-color: rgb(247,147,0);
      position: relative;
    }
    .item41::after, .item42:after, .item43:after {
      border: 31px solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      left: 100%;
      position: absolute;
      border-left: 20px solid  rgb(249,246,243);
      top: 0;
    }
    .item41::after,.item42:after, .item43:after  {
      border-left: 20px solid  rgba(247,147,0,0.2);
    }
    .item42:before , .item43:before ,.item44:before {
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
