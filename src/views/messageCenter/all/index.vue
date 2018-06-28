<template>
	<div class="system-wrapper">
		<contentHeader 
      headerInfo="headerInfo"
      :status="status"
      @markRead="markRead"
      @toggleStatus="toggleStatus"
      :unReadCount="totle"
      ></contentHeader>
		<contentBody 
      :messageList="messageList"
      @seeDetail="seeDetail"></contentBody>
		<contentFooter 
      :pagenation="pagenation"
      @handlePageChange="handlePageChange"
    ></contentFooter>
	</div>
</template>
<script>
import contentHeader from '../contentHeader'
import contentBody from '../contentBody'
import contentFooter from '../contentFooter'
import { mapGetters, mapActions } from 'vuex'
import * as types from '@/store/modules/messageCenter/actionTypes'
export default {
  computed: {
    ...mapGetters('messageCenter/all', [
      'isLoading',
      'messageList',
      'pagenation',
      'status'
    ]),
    ...mapGetters('messageCenter', [
      'totle'
    ])
  },
  methods: {
    ...mapActions('messageCenter/all', [
      types.GET_MESSAGELIST,
      types.TOGGLE_PAGINATION,
      types.TOGGLE_STATUS,
      types.MARK2READ
    ]),
    toggleStatus(status) {
      this[types.TOGGLE_STATUS](status)
    },
    handlePageChange(page) {
      this[types.TOGGLE_PAGINATION](page)
    },
    markRead() {
      this[types.MARK2READ]()
    },
    seeDetail(id) {
      this[types.MARK2READ](id)
    }
  },
  created() {
    this[types.GET_MESSAGELIST]()
  },
  components: {
    contentHeader,
    contentBody,
    contentFooter
  }
}
</script>
<style lang="scss" scoped>

</style>


