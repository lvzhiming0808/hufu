<template>
	<div 
		class="item-wrapper"
		@click="seeDetail">
		<div class="left"> 
			<div class="spot">
				<span v-if="!status"></span>
			</div>
			<div class="icon">
				<icon-svg :icon-class="subjectType | createIcon"></icon-svg>
			</div>
			<div class="subject">
				{{subject}}
			</div>
		</div>
		<div class="right">
			<div class="time">
				{{sendDate}}
			</div>
			<span class="svg-container arrow">
				<icon-svg icon-class="arrow-right"></icon-svg>
			</span>
		</div>
	</div>
</template>
<script>
export default {
  props: [
    'status',
    'sendDate',
    'subject',
    'url',
    'id',
    'subjectType'
  ],
  methods: {
    seeDetail() {
      this.$emit('seeDetail', this.id)
      sessionStorage.setItem('urlOfList', location.pathname)
      this.$router.push(this.url)
    }
  },
  filters: {
    createIcon(type) {
      switch (type) {
        case 0: case 1: case 3: case 4:
          return 'mark'
        case 2:
          return 'reject'
        case 5:
          return 'add-message'
        case 6: case 7:
          return 'good'
        case 8:
          return 'create-report'
        default:
          return 'system'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item-wrapper {
	width: 100%;
	height: 92px;
	min-width: 800px;
	cursor: pointer;
	.left {
		float: left;
		width: 600px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.spot {
			width: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			&>span {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: red;
			}
		}
		.icon {
			font-size: 38px;
			text-align: left;
			padding:0 22px;
		}
		.subject {
			width: 100%;
		}
	}
	.right {
		float: right;
		width: 200px;
		height: 100%;
		padding: 0 10px;
		color: #e6e6e6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.time {
			width: 150px;
		}
		.arrow {

		}
	}
}
</style>
