<template>
	<div>
		<div class="isMoney">
			<div class="item">
			<span class="left">是否扣流水</span>
			<div class="ritht">
				<el-radio v-model="isWater" label='1' :disabled="operationLock">是</el-radio>
				<el-radio v-model="isWater" label='0' :disabled="operationLock">否</el-radio>
			</div>
		</div>
		<div class="item item2">
			<span class="left">罚款金额</span>
			<div class="right" style="width: 450px;">
				<!-- <el-input placeholder="请输入内容" max="200" v-model="forfeit" size="mini">
					<template slot="append">元</template>
				</el-input> -->
				<el-slider
					v-model="forfeit"
					show-input
					:step="50"
					:max="200"
					:disabled="operationLock"
					>
				</el-slider>
			</div>
		</div>
		</div>
		<div class="pingjia_score">
		 <div class="title">
			<div class="text">
				评价
			</div>
		</div>
		<div class="area-wrapper">
		<el-input
			type="textarea"
			:rows="4"
			placeholder="请输入内容"
			:disabled="operationLock"
			v-model="comment">
		</el-input>
		</div>
		<!-- <div class="line"></div> -->
		</div>
		<div class="pingjia_score" v-if="playerMode === 'detail' && showShare==='false' && showBtn !== false"> 
		 <div class="title">
			<div class="text">
				备注
			</div>
		</div>
		<div class="area-wrapper">
		<el-input
			type="textarea"
			:rows="4"
			placeholder="复检备注内容"
			:disabled="operationLock"
			v-model="secRemark">
		</el-input>
		</div>
		<div class="line"></div>
		</div>
	</div>
	
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'

export default {
  data() {
    return {
      data: ''
    }
  },
  mounted() {
    if (this.$store.state.player.isWater === '') {
      this.$store.state.player.isWater = '0'
    }
  },
  computed: {
    comment: {
      get() {
        return this.$store.state.player.comment
      },
      set(value) {
        this[types.HANDLE_EVALUATE](value)
      }
    },
    isWater: {
      get() {
        return this.$store.state.player.isWater
      },
      set(value) {
        this[types.HANDLE_ISWATER](value)
      }
    },
    forfeit: {
      get() {
        return this.$store.state.player.forfeit
      },
      set(value) {
        this[types.HANDLE_FORFEIT](value)
      }
    },
    secRemark: {
      get() {
        return this.$store.state.player.secRemark
      },
      set(value) {
        this[types.GET_SECREMARK](value)
      }
    },
    ...mapGetters('player', [
      'operationLock',
      'playerMode'
    ]),
    showBtn() {
      return this.$route.query.showBtn
    },
    showShare() {
      return this.$route.query.showShare
    }
  },
  methods: {
    ...mapMutations('player', [
      types.HANDLE_EVALUATE,
      types.HANDLE_ISWATER,
      types.HANDLE_FORFEIT,
      types.GET_SECREMARK
    ])
  }
}
</script>
<style lang="scss" scoped>
.title {
		width: 100%;
		position: relative;
		border-top: 2px solid #efefef;
		height:30px;
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
	.area-wrapper {
		margin-top: 10px;
		width: 90%;
		margin-bottom: 104px;
	}
	.line {
		height: 2px;
		background-color: #f8f8f8;
		margin-bottom: 63px;
	}
	.isMoney{
		height: auto;
		margin-bottom: 20px;
	}
	.item {
		height: 50px;
		overflow: hidden;
		.left {
			width: 116px;
			float: left;
			font-size: 14px;
		}
		.right {
			margin-left: 0;
			padding: 0;
			font-size: 14px;
			color: #333;
			float: left;		
			.disableds{
				display: none !important;
			}				
		}
	}
	:focus{
		outline: none;
	}
</style>
