<template>
	<div>
		<el-header><head-bar></head-bar></el-header>
		<el-main>
			<div class="complete-wrapper">
				<div class="title">
					已成功提交录音打分表，提交的打分报表请在【数据报表】中查看
				</div>
				<div class="btn-content">
					<router-link to="/">
						<el-button type="info" size="mini">返回主页</el-button>
					</router-link>
					<router-link to="/layout/dataTable/qualityGrade">
						<el-button type="info" size="mini">查看打分表</el-button>
					</router-link>
					<router-link to="/layout/myArmy">
						<el-button type="info" size="mini">继续添加录音</el-button>
					</router-link>
				</div>
			</div>
		</el-main>
	</div>
</template>
<script>
import HeadBar from '../layout/HeadBar'
export default {
  components: {
    HeadBar
  }
}
</script>
<style lang="scss" scoped>
.complete-wrapper {
	width: 600px;
	height: 150px;
	margin: 100px auto;
	.title {
		font-size: 20px;
		font-weight: bold;
	}
	.btn-content {
		padding-top: 90px;
		display: flex;
		justify-content: space-around;
	}
}
</style>


