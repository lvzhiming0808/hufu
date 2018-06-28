<template>
  <div>
    <!--我的军团和录音管理界面-->
    <component :is="currentRole"></component>
  </div>
</template>
<script>
  import myArmy from './myArmy/index.vue'
  import record from './record/index.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      myArmy,
      record
    },
    data() {
      return {
        currentRole: 'myArmy'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      if (this.$checkRole('myArmy_record') === 'army') {
        return
      }
      this.currentRole = 'record'
    }
  }
</script>
<style>

</style>
