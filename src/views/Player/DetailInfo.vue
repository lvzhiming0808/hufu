<template>
	<div class="info">
		<div class="student-info">
			<h3>学生报名信息</h3>
			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th width="80">学员姓名</th>
							<th width="100">报名手机号</th>
							<th width="80">一级项目</th>
							<th width="110">二级项目</th>
							<th width="90">报名时间</th>
							<th width="90">缴费金额</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{{studentAndOrder.stuName}}</td>
							<td>{{studentAndOrder.phoneNum}}</td>
							<td>{{studentAndOrder.majorTypeOneName}}</td>
							<td>{{studentAndOrder.majorTypeTwoName}}</td>
							<td>{{studentAndOrder.signDate}}</td>
							<td>{{studentAndOrder.fee}}</td>
						</tr>
					</tbody>
				</table>	
			</div>
		</div>
		<div class="order-info">
			<h3>订单信息</h3>
				<table>
					<thead>
						<tr height="30">
							<th width="90">质检时间</th>
							<th width="90">质检员</th>
							<th width="80">录音时长</th>
							<th width="80">是否报名</th>
							<th width="140">订单编号</th>
						</tr>
					</thead>
					<tbody>
						<tr height="30">
							<td>{{studentAndOrder.testDate}}</td>
							<td>{{studentAndOrder.username}}</td>
							<td>{{studentAndOrder.timeLength}}</td>
							<td>{{studentAndOrder.isApply}}</td>
							<td>{{studentAndOrder.orderSonId}}</td>
						</tr>
					</tbody>
				</table>
		</div>
	</div>
</template>

<script>
import './style.scss'
export default {
  props: {
    studentAndOrder: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
table {
	text-align: center;	
	tr {
		height: 30px;
	}	
	th, td {
		text-align: center;
		vertical-align: middle;
	}		
	th {
		background-color: #f8f8f8;
		border: 1px solid #fff;
	}
	td {
		background-color: #fefcfa;
		border: 1px solid #fff; 
	}
}
.info {
	display: flex;
	margin-bottom: 40px;
	h3 {
		font-size: 24px;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		margin-bottom: 30px;
	}
	.student-info {
		flex: 1;
		.table-container {
		}
	}
	.order-info {
		flex: 1;
		.table-container {
		}
	}
}
</style>


