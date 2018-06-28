<template>
  <div>
    <!--我的工作台界面-->
    <component :is="currentRole"></component>
  </div>
</template>
<script>
  import armyDashboard from './army/index.vue'
  import sofDashboard from './sop/index.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      armyDashboard,
      sofDashboard
    },
    data() {
      return {
        currentRole: 'armyDashboard'
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
      this.currentRole = 'sofDashboard'
    }
  }
</script>
<style>

</style>
