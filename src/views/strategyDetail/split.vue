<template>
  <div class="lines">
    <div class="page-line">
      <div class="line1"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .lines{
    width :100%;
    .page-line{
      background-color: #f9f6f3;
      height: 1px;
      position: relative;
      .line1{
        background-color: rgb(247, 147, 0);
        height: 2px;
        width: 66px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>
