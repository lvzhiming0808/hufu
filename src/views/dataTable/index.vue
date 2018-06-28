<template>
<div class="datatable-wrapper">
  <left></left>
  <router-view></router-view>
</div>
</template>
<script>
import left from './left.vue'
export default {
  data() {
    return {}
  },
  components: {
    left
  }
}
</script>
<style>
</style>
