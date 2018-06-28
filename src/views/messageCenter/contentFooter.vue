<template>
	<div class="footer-wrapper">
		<el-pagination
			layout="prev, pager, next"
			:total="pagenation.totalElements"
			:page-size="pagenation.size"
			:current-page="pagenation.number"
			@current-change="handlePageChange">
		</el-pagination>
	</div>
</template>
<script>
export default {
  props: ['pagenation'],
  methods: {
    handlePageChange(value) {
      this.$emit('handlePageChange', value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('../../styles/scrollbar.scss');
.footer-wrapper {
	display: flex;
	justify-content: flex-end;
}
</style>

