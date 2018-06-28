<template>
<div class="quality-info">
	<h3>
		虎符质检信息表
	</h3>
	<div class="content">
		<!-- 顶部的四个下拉选择开始 -->
		<div class="common">
			<div class="question">
				<span class="tit">录音类型</span>
				<div class="selecter">
					<el-select :disabled="operationLock" v-model="recordType" size="mini" placeholder="请选择">
						<el-option
							v-for="item in recordTypeValue"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question">
				<span class="tit">录音性质</span>
				<div class="selecter">
					<el-select :disabled="operationLock" v-model="recType" size="mini" placeholder="请选择" @change="selectType">
						<el-option
							v-for="item in recTypeValue"
							:key="item.id"
							:label="item.name"
							:disabled="item.disabled"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question" style="width: 300px">
				<span class="tit">学员现状分类</span>
				<div class="selecter">
					<el-select :disabled="operationLock" v-model="state" size="mini" placeholder="请选择">
						<el-option
							v-for="item in stateValue"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question">
				<span class="tit">取证目的</span>
				<div class="selecter">
					<el-select :disabled="operationLock" v-model="aim" size="mini"  placeholder="请选择">
						<el-option
							v-for="item in aimValue"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>
		<div class="common">
			<div class="question" style="width: 300px">
				<span class="tit">学员性别</span>
				<div class="selecter">
					<el-select v-model="sex" :disabled="operationLock" size="mini" @change="sexlist"  placeholder="请选择">
						<el-option
							v-for="item in sexlistValue"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question" style="width: 300px">
				<span class="tit">学员年龄段</span>
				<div class="selecter">
					<el-select v-model="ageStage" :disabled="operationLock" size="mini"  placeholder="请选择">
						<el-option
							v-for="item in agegroup"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question" style="width: 300px">
				<span class="tit">目前最高学历</span>
				<div class="selecter">
					<el-select v-model="degree" :disabled="operationLock" size="mini"  placeholder="请选择">
						<el-option
							v-for="item in heightEducation"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question" style="width: 300px">
				<span class="tit">咨询学历层次</span>
				<div class="selecter">
					<el-select v-model="consultDegreeStage" :disabled="operationLock" size="mini"  placeholder="请选择">
						<el-option
							v-for="item in seekdeage"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>
		<div class="projects" :class="{isDisabled:studentAndOrder.isApply!=='否'}">
			<div class="question_one">
				<span class="tit">一级项目</span>
				<div class="selecter">
					<el-select :disabled="operationLock" v-model="majorTypeOneName" size="mini"  placeholder="请选择"	@change="selectTwo">
						<el-option
							v-for="item in oneList"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question_one">
				<span class="tit">二级项目</span>
				<div class="selecter">
					<el-select v-model="majorTypeTwoName" size="mini"  placeholder="请选择" :disabled='twoList.length===0 || operationLock'>
						<el-option
							v-for="item in twoList"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question_one"></div>
			<div class="question_one"></div>
		</div>
		<!-- 顶部四个下拉选择结束 -->
		<questions 
			v-for="(question, index) in questions"
			:question="question"
			:ref="'' + index"
			:index="index"
			:key="index"></questions>
	</div>
</div>
</template>

<script>
import Questions from './Questions'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'
import fetch from '@/utils/fetch'
import { ageGroup, heightEducation, seekdeage } from '../../../api/player'
export default {
  data() {
    return {
      oneList: [],
      twoList: ['1']
    }
  },
  components: {
    Questions
  },
  mounted() {
    if (this.studentAndOrder.isApply === '否') {
      this.studentAndOrder.majorTypeOneName = ''
      this.studentAndOrder.majorTypeTwoName = ''
    }
    fetch({
      url: '/calls/commons/projects',
      method: 'get'
    })
		.then(res => {
  this.oneList = res
})
    ageGroup()
        .then(res => { // 年龄段
          this.agelist = res.result
        })
    heightEducation()
        .then(res => { // 最高学历
          this.heightelist = res.result
        })
    seekdeage()
        .then(res => { // 咨询学历层次
          this.seeklist = res.result
        })
  },
  computed: {
    index: {
      get() {
        return this.$store.state.player.index
      },
      set(value) {
        this[types.SET_INDEX](value)
      }
    },
    recType: {
      get() {
        return this.$store.state.player.recType.toString()
      },
      set(value) {
        this[types.SET_RECTYPE](value)
      }
    },
    recordType: {
      get() {
        return this.$store.state.player.recordType.toString()
      },
      set(value) {
        this[types.SET_RECORDTYPE](value)
      }
    },
    aim: {
      get() {
        return this.$store.state.player.aim.toString()
      },
      set(value) {
        this[types.SET_AIM](value)
      }
    },
    majorTypeOneName: {
      get() {
        return this.$store.state.player.majorTypeOneName.toString()
      },
      set(value) {
        this[types.SET_MAJORTYPEONENAME](value)
      }
    },
    majorTypeTwoName: {
      get() {
        return this.$store.state.player.majorTypeTwoName.toString()
      },
      set(value) {
        this[types.SET_MAJORTYPETWONAME](value)
      }
    },
    ageStage: {
      get() {
        return this.$store.state.player.ageStage.toString()
      },
      set(value) {
        this[types.SET_AGESTAGE](value)
      }
    },
    consultDegreeStage: {
      get() {
        return this.$store.state.player.consultDegreeStage.toString()
      },
      set(value) {
        this[types.SET_CONSULTDEGREESTAGE](value)
      }
    },
    degree: {
      get() {
        return this.$store.state.player.degree.toString()
      },
      set(value) {
        this[types.SET_DEGREE](value)
      }
    },
    state: {
      get() {
        return this.$store.state.player.state.toString()
      },
      set(value) {
        this[types.SET_STATE](value)
      }
    },
    sex: {
      get() {
        return '' + this.$store.state.player.sex
      },
      set(value) {
        this[types.SET_SEX](value)
      }
    },
    ...mapGetters('player', [
      'operationLock',
      'recordTypeValue',
      'recTypeValue',
      'stateValue',
      'aimValue',
      'questions',
      'studentAndOrder',
      'agegroup',
      'heightEducation',
      'seekdeage',
      'sexlistValue'
    ])
  },
  methods: {
    ...mapMutations('player', [
      types.SET_RECORDTYPE,
      types.SET_STATE,
      types.SET_AIM,
      types.SET_MAJORTYPEONENAME,
      types.SET_MAJORTYPETWONAME,
      types.SET_AGESTAGE,
      types.SET_DEGREE,
      types.SET_CONSULTDEGREESTAGE,
      types.SET_SEX,
      types.SET_INDEX
    ]),
    ...mapActions('player', [
      types.SET_RECTYPE
    ]),
    selectType(vals) {
      this.index = vals
    },
    selectTwo(val) {
      this.majorTypeTwoName = ''
      this.oneList.map((key, val) => {
        if (this.majorTypeOneName === key.name) {
          this.twoList = key.items
        }
      })
    },
    sexlist(val) {
      if (this.val === '0') {
        this.val === '男'
      } else {
        this.val === '女'
      }
    }
  }
}
</script>
<style lang="scss" scoped> 
.quality-info {
	h3 {
	font-size: 24px;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		margin-bottom: 30px;
	}
	.content {
		width: 100%;
		.common , .classify,.projects{
			min-height: 30px;
			margin-bottom: 30px;
			display: flex;
			.question,.question_one {
				// margin-right: 37px;
				// width: 245px;
				flex: 1;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.tit {
					// font-size: 12px;
					// color: #cacaca;
					// margin-right: 5px;
					// flex: 1;
					}
					.selecter {
						// flex: 1;
						margin-left: 5px;
					}
			}
		}
		.isDisabled{
				display: none;
			}
	
		.classify .question {
			flex: 0.25;
		}
		.record {
			width: 100%;
			height: 100px;
			margin-bottom: 40px;
			display: flex;
			.left {
				height: 100%;
				flex: 0.5;
				display: flex;
				align-items: center;
				span {
					width: 80px;
					font-size: 12px;
					color: #cacaca;	
				}
				div {
					flex: 1;
				}
			}
			.right {
				padding: 0;
				padding-left: 27px;
				height: 100%;
				flex: 0.5;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				span {
					width: 130px;
					font-size: 12px;
					color: #cacaca;	
				}
			}
		}
	}
}
</style>
