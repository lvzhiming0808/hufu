<template>
  <div class="appmain-wrapper">
    <router-view :key="key"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .appmain-wrapper
    width 100%
    height 100%
    div
      width 100%
      padding-top 80px
      height 100%
</style>
