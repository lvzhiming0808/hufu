<template>
  <div>
    <!--我的策略界面和审批管理界面-->
    <keep-alive>
      <component :is="currentRole"></component>
    </keep-alive>
  </div>
</template>
<script>
  import approval from './approval/index.vue'
  import strategy from './myStrategy/index.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      approval,
      strategy
    },
    data() {
      return {
        currentRole: 'strategy'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      if (this.$checkRole('dashboard') === 'army') {
        return
      }
      this.currentRole = 'approval'
    }
  }
</script>
<style>

</style>

