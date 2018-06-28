<template>
	<div class="header">
		<div 
			class="select-tag"
			:class="{active: status === 1}"
			@click="toggleStatus(1)">
			全部
		</div>
		<div 
			class="select-tag"
			:class="{active: status === 0}"
			@click="toggleStatus(0)">
			未读 <span v-show="unReadCount">( {{unReadCount}} )</span>
		</div>
		<div 
			class="all-looked"
			v-show="showMark2Read"
			@click="markRead">
			全部设为已读
		</div>
	</div>
</template>
<script>
export default {
  props: ['count', 'status', 'unReadCount'],
  computed: {
    showMark2Read() {
      return !!this.unReadCount
    }
  },
  methods: {
    toggleStatus(status) {
      this.$emit('toggleStatus', status)
    },
    markRead() {
      this.$emit('markRead')
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
	position: relative;
	height: 50px;
	border-bottom: 2px solid #e6e6e6;
	display: flex;
	.select-tag {
		width: auto;
		padding: 0 5px;
		margin: 0 20px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #cccccc;
		cursor: pointer;
		&.active {
			color: #f79300;
			border-bottom: 2px solid #f79300;
		}
	}
	.all-looked {
		width: 120px;
		height: 35px;
		border-radius: 5px;
		border: 1px solid #f79300;
		line-height: 35px;
		text-align: center;
		background-color: #fff7ef;
		color: #f89300;
		position: absolute;
		top: 5px;
		right: 20px;
		cursor: pointer;
	}
}
</style>

