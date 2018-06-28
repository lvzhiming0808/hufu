<template>
      <side-bar-item :routes="$checkRole('LEFT_SIDEBAR')"></side-bar-item>
</template>
<script>
import SideBarItem from './SideBarItem.vue'
export default {
  components: { SideBarItem }
}
</script>
