<template>
	<div>
		<div class="mask"></div>
		<div class="wrapper">
			<div class="box">
				<div class="header">
					备注
				</div>
				<div class="content">
					<el-input
						type="textarea"
						:rows="4"
						placeholder="请输入内容"
						v-model="comment">
					</el-input>
				</div>
				<div class="footer">
					<el-button 
						type="warning" 
						size="medium"
						@click="cancle" 
						plain>取消</el-button>
					<el-button 
						type="warning" 
						size="medium"
						:loading="loading"
						@click="handleSubmit">保存</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import { addRecordCommit } from '@/api/player'
// import { Message } from 'element-ui'

export default {
  data() {
    return {
      comment: '',
      loading: false
    }
  },
  methods: {
    cancle() {
      this.$emit('closeRemark')
    },
    handleSubmit() {
      this.loading = true
      addRecordCommit(this.comment).then(() => {
        this.loading = false
        this.$emit('addRecordCommit', this.comment)
      }).catch(() => {
        this.$message({
          message: '备注提交失败, 请重试',
          type: 'error',
          customClass: 'element-ui-message'
        })
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.8;
	}
	.wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0; 
		left: 0;
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
		.box {
			width: 345px;
			height: 255px;
			border-radius: 10px;
			overflow: hidden;
			background-color: #fff;
			.header {
				width: 100%;
				height: 45px;
				background: #f79300;
				padding: 14px 0 0 28px;
				font-size: 16px;
				font-weight: 700;
				color: #fff;
				letter-spacing: 2px;
			}
			.content {
				width: 100%;
				height: 140px;
				padding: 22px 20px 0;
			}
			.footer {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>