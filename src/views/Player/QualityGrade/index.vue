<template>
<div class="grade">
	<h3>虎符质检打分表</h3>
	<div class="title">
		<div class="text">
			基础信息
		</div>
	</div>
	<div class="content">
		<div class="line-item one-line">
			<span class="tit">
				适用军团 
			</span>
			<span>
				{{strategyPhaseInfo.groupName}}
			</span>
		</div>
		<div class="line-item one-line">
			<span class="tit">
				适用部门 
			</span>
			<span>
				{{strategyPhaseInfo.applydeparts}}
			</span>
		</div>
		<div class="line-item two-line">
			<span>
				<span class="tit">
					地域
				</span>
				<span>
					{{strategyPhaseInfo.area}}
				</span>
			</span>
			<span>
				<span class="tit" style="margin-left: 100px;"> 
					项目
				</span>
				<span>
					{{strategyPhaseInfo.firstProject}}
				</span>
			</span>
		</div>
	</div>
	<div class="title">
		<div class="text">
			{{strategyPhaseInfo.name}}
		</div>
	</div>
	<ScoreCard 
		v-for="(score, index) in recordStrategy"
		:key="index"
		:index="index"></ScoreCard>
	<div 
		class="see-detail"
		@click="goSeeDetail">
		查看相关话术{{strategyPhaseInfo.fileName}}
	</div>
	<Comprehensive></Comprehensive>
	<IllegalList></IllegalList>
	<Evaluate></Evaluate>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import ScoreCard from './ScoreCard'
import Comprehensive from './Comprehensive'
import Evaluate from './Evaluate'
import IllegalList from './IllegalList'
import { verbalTrickDownload } from '@/api/player'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('player', [
      'recordStrategy',
      'strategyPhaseInfo',
      'strategyPhaseId',
      'strategyPhaseName'
    ])
  },
  methods: {
    goSeeDetail() {
      if (this.strategyPhaseInfo.strategyPhaseId) verbalTrickDownload([this.strategyPhaseInfo.strategyPhaseId])
    }
  },
  components: {
    ScoreCard,
    Comprehensive,
    Evaluate,
    IllegalList
  }
}
</script>
<style lang="scss" scoped>
.tit {
	font-size: 14px;
	color: #cacaca;
	margin: 5px;
}

span {
	font-size: 14px !important;
	overflow: hidden;
}
table {
	text-align: center;				
	th {
		background-color: #f8f8f8;
		border: 1px solid #fff;
		padding: 5px 0;
	}
	td {
		background-color: #fefcfa;
		border: 1px solid #fff;
		padding: 5px 0; 
	}
}
.grade {
	h3 {
		font-size: 24px;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		margin-bottom: 30px;
	}
	.title {
		width: 100%;
		position: relative;
		border-top: 2px solid #efefef;
		height:30px;
		margin-bottom: 30px;
		.text {
			height: 100%;
			padding: 0 4px;
			font-size: 14px;
			font-weight: 700;
			line-height: 28px;
			color: #f79300;
			position: absolute;
			top: -2px;
			border-top: 2px solid #f79300;
		}
	}
	.content {
		height: 170px;
		padding-top: 0px;
		.line-item {
			height: 50px;
		}
	}
	.see-detail{
		color: #f79300;
		font-size: 16px;
		cursor: pointer;
		text-decoration: underline;
	}
	.mark {
		.info {
			display: flex;
			height: 50px;
			margin-top: 30px;
			.item {
				flex: 0.25;
			}
		}
	}
}
</style>


