<template>
	<div class="brekrule-wrapper">
		<div class="mask"></div>
		<div class="wrapper" @click.self="cancle">
			<div class="box" v-loading="dataLoading">
				<div class="header">
					违规信息
				</div>
				<div class="content">
					<div class="item">
						<span class="left">是否追责</span>
						<div class="right">
							<el-radio v-model="isDuty" label="1">是</el-radio>
							<el-radio v-model="isDuty" label="0">否</el-radio>
						</div>
					</div>
					<div class="item">
						<span class="left">违规时间</span>
						<div class="right">
							<span>{{badTime | timeFilter}}</span>
						</div>
					</div>
					<!-- <div class="item">
						<span class="left">是否扣流水</span>
						<div class="ritht">
							<el-radio v-model="isWater" label="1">是</el-radio>
							<el-radio v-model="isWater" label="0">否</el-radio>
						</div>
					</div>
					<div class="item">
						<span class="left">罚款金额</span>
						<div class="right" style="width: 450px;">
							 <el-input placeholder="请输入内容" max="200" v-model="forfeit" size="mini">
								<template slot="append">元</template>
							</el-input> 
							<el-slider
								v-model="forfeit"
								show-input
								:step="50"
								:max="200">
							</el-slider>
						</div>
					</div> -->
					<div class="item">
						<span class="left">
							责任人
						</span>
						<div class="right">
							{{userName}}
						</div>
					</div>
					<div class="item">
						<span class="left">
							事业部
						</span>
						<div class="right">
							{{enterpriseName}}
						</div>
					</div>
					<div class="item">
						<span class="left">
							责任方/军团
						</span>
						<div class="right">
							{{groupName}}
						</div>
					</div>
					<div class="item">
						<span class="left">
							销售部/组(id)
						</span>
						<div class="right">
							{{sellAndGroupName}}
						</div>
					</div>
					<div class="item">
						<span class="left">
							责任人归属
						</span>
						<div class="right">
							{{userBelong}}
						</div>
					</div>
					<div class="item">
						<span class="left">
							一级分类
						</span>
						<div class="right">
							<el-select 
								v-model="violationTypeOne" 
								placeholder="请选择" 
								size="mini"
								popper-class="element-ui-message"
								@change="refreshSelectOther(violationTypeOne, 2)">
								<el-option
									v-for="item in violationTypeOneValue"
									:key="item.id"
									:label="item.name"
									:value="item.id"
									:class="{disableds:item.name==='无'}">
								</el-option>
							</el-select>
						</div>	
					</div>
					<div class="item">
						<span class="left">
							二级分类
						</span>
						<div class="right">
							<el-select 
								v-model="violationTypeTwo" 
								placeholder="请选择" 
								size="mini"
								popper-class="element-ui-message"
								@change="refreshSelectOther(violationTypeTwo, 1)">
								<el-option
									v-for="item in violationTypeTwoValue"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="item">
						<span class="left">
							三级分类
						</span>
						<div class="right">
							<el-select popper-class="element-ui-message" v-model="violationTypeThree" placeholder="请选择" size="mini">
								<el-option
									v-for="item in violationTypeThreeValue"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
					<!-- <div class="item">
						<span class="left">
							是否回访申诉
						</span>
						<div class="right">
							<el-radio v-model="isAppeal" label="1">是</el-radio>
							<el-radio v-model="isAppeal" label="0">否</el-radio>
						</div>
					</div> -->
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
						:loading="submitLoading"
						@click="handleSubmit">保存</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import {
	selectRecordViolation,
	addRecordViolation,
	selectRecordViolationGanged
} from '@/api/player'
import {
	HANDLE_COMFIRMILLEGAL,
	HANDLE_ADDERRORS
} from '@/store/modules/player/actionTypes'

export default {
  data() {
    return {
      id: 0,
      isDuty: '1',
      badTime: 0,
      // isWater: '1',
      // forfeit: 0,
      userName: '',
      enterpriseName: '',
      groupName: '',
      sellAndGroupName: '',
      userBelong: '',
      isAppeal: '0',
      violationTypeOne: '',
      violationTypeOneValue: [],
      violationTypeTwo: '',
      violationTypeTwoValue: [],
      violationTypeThree: '',
      violationTypeThreeValue: [],
      submitLoading: false,
      dataLoading: false,
      forfeitDisabled: false
    }
  },
  computed: {
    ...mapGetters(['basicError', 'errorTime'])
  },
  props: ['errorId'],
  beforeDestroy() {
    document.body.style.overflow = 'auto'
  },
  mounted() {
    document.body.style.overflow = 'hidden'
    if (this.errorId) {
      this.selectRecordViolation()
    } else {
			// 创建型错误用户信息来自默认信息
			// 直接刷新下拉框
      this.userName = this.basicError.userName
      this.enterpriseName = this.basicError.enterpriseName
      this.groupName = this.basicError.groupName
      this.sellAndGroupName = this.basicError.sellAndGroupName
      this.userName = this.basicError.userName
      this.userBelong = this.basicError.userBelong
      this.badTime = this.errorTime
      this.refreshSelectOne()
    }
  },
  methods: {
    ...mapMutations('player', [
      HANDLE_ADDERRORS,
      HANDLE_COMFIRMILLEGAL
    ]),
    cancle() {
      this.$emit('closeBreakRule')
      this.$store.state.player.ok = 1
    },
    refreshSelectOne() {
      selectRecordViolationGanged().then(res => {
        this['violationTypeOneValue'] = res.splice(0, res.length - 1)
      })
    },
    refreshSelectOther(id, type) {
      const questions = ['violationTypeThree', 'violationTypeTwo']
      for (let i = 0; i < type; i++) {
        this[questions[i]] = ''
      }
      selectRecordViolationGanged({ id }).then(res => {
        switch (type) {
          case 2:
            this.violationTypeTwoValue = res
            break
          case 1:
            this.violationTypeThreeValue = res
            break
        }
      })
    },
    handleSubmit() {
      const data = {
				// 录音id
        id: this.id,
				// 是否追责
        isDuty: +this.isDuty,
				// 违规时间
        badTime: +this.badTime,
				// 是否可以回访申诉
        isAppeal: +this.isAppeal,
				// 责任人
        userName: this.userName,
				// 事业部
        enterpriseName: this.enterpriseName,
				// 责任方/军团
        groupName: this.groupName,
				// 销售部/组
        sellAndGroupName: this.sellAndGroupName,
				// 责任人归属
        userBelong: this.userBelong,
				// 违规类型一ID
        violationTypeOneId: this.violationTypeOne,
				// 违规类型一Name
        violationTypeOneName:
					this.violationTypeOneValue
						.filter(i => i.id === this.violationTypeOne)[0] &&
					this.violationTypeOneValue
						.filter(i => i.id === this.violationTypeOne)[0].name,
				// 违规类型二ID
        violationTypeTwoId: this.violationTypeTwo,
				// 违规类型二Name
        violationTypeTwoName:
					this.violationTypeTwoValue &&
					this.violationTypeTwoValue
						.filter(i => i.id === this.violationTypeTwo)[0] &&
					this.violationTypeTwoValue
						.filter(i => i.id === this.violationTypeTwo)[0].name,
				// 违规类型三ID
        violationTypeThreeId: this.violationTypeThree,
				// 违规类型三Name
        violationTypeThreeName:
					this.violationTypeThreeValue &&
					this.violationTypeThreeValue
						.filter(i => i.id === this.violationTypeThree)[0] &&
					this.violationTypeThreeValue
						.filter(i => i.id === this.violationTypeThree)[0].name
      }

      const errData = {
        badTime: this.badTime,
        detail: `一级问题: ${data['violationTypeOneName']}; 二级问题: ${data['violationTypeTwoName']}; 三级问题: ${data['violationTypeThreeName']}`
      }

			// 违规提交参数判断只需要判断三级问题即可因为其他参数不可能缺失
      const index = ['violationTypeOneId', 'violationTypeTwoId', 'violationTypeThreeId']
      for (const i of index) {
        if (!data[i]) {
          this.$message({
            message: '参数不足',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
      }
      this.submitLoading = true

      addRecordViolation(data).then(() => {
        if (this.$store.state.player.ok === 3) {
          this.$store.state.player.arrs.splice(this.$store.state.player.indexs, 1)
          this.$store.state.player.musicData.errors.splice(this.$store.state.player.indexs, 1)
          this.$store.state.player.ok = 0
        }
        this.submitLoading = false
        this[HANDLE_COMFIRMILLEGAL]()
        this[HANDLE_ADDERRORS](errData)
        this.$emit('closeBreakRule')
      }).catch(() => {
        this.submitLoading = false
        this.$message({
          message: '提交失败请稍后重试',
          type: 'error',
          customClass: 'element-ui-message'
        })
      })
    },
    selectRecordViolation() {
      this.dataLoading = true
      selectRecordViolation(this.errorId).then(data => {
        this.generateData(data)
        this.initSelect(data)
        this.dataLoading = false
      })
    },
    generateData(data) {
      this.isDuty = `${data.isDuty}`
    //  this.isWater = `${data.isWater}`
      this.isAppeal = this.isAppeal
      const k = [
        'id',
        'badTime',
        'userName',
        'enterpriseName',
        'groupName',
        'sellAndGroupName',
        'userBelong'
        // 'forfeit'
      ]
      k.forEach(key => {
        this[key] = data[key]
      })
    },
    initSelect(data) {
			// init 完成后刷新下拉框
      this.refreshSelectOne()
    }
  }
  // watch: {
  //   isWater(next, prev) {
  //     if (next === '0') {
  //       this.forfeitDisabled = true
  //       this.forfeit = 0
  //     } else {
  //       this.forfeitDisabled = false
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.brekrule-wrapper{
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20000;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.8; 
	}
	.wrapper {
		position: fixed;
		overflow-y: auto;
		width: 100%;
		height: 100%;
		top: 0; 
		left: 0;
		z-index: 30000;
		.box {
			width: 650px;
			height: auto;
			padding-bottom: 20px;
			margin: 20px auto;
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
				border: none;
			}
			.content {
				// display: flex;
				padding: 40px 28px 0;
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
			}
			.footer {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>

