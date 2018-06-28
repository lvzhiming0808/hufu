<template>
	<div class="more-info" @mousewheel.prevent>
		<div class="item">
			<div class="left">
				事业部
			</div>
			<div class="right">
				<el-select 
					v-model="enterpriseId" 
					placeholder="请选择" 
					size="mini"
					@change="SETGROUPIDVALUE">
					<el-option
						v-for="item in enterpriseIdValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="item">
			<div class="left">
				军团
			</div>
			<div class="right">
				<el-select 
					v-model="groupId" 
					placeholder="请选择" 
					size="mini"
					@change="SETSELLIDVALUE">
					<el-option
						v-for="item in groupIdValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="item">
			<div class="left">
				销售部
			</div>
			<div class="right">
				<el-select 
					v-model="sellId" 
					placeholder="请选择" 
					size="mini"
					@change="SETSELLGROUPIDVALUE">
					<el-option
						v-for="item in sellIdValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="item">
			<div class="left">
				销售组
			</div>
			<div class="right">
				<el-select v-model="sellGroupId" placeholder="请选择" size="mini">
					<el-option
						v-for="item in sellGroupIdValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
    <div class="item">
			<div class="left">
				工号
			</div>
			<div class="right">
				<el-input v-model="workNum" placeholder="请输入内容" size="small"></el-input>
			</div>
		</div>
		<!-- <div class="item">
			<div class="left">
				录音类型
			</div>
			<div class="right">
				<el-select v-model="recordType" placeholder="请选择" size="mini">
					<el-option
						v-for="item in recordTypeValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div> -->
		<div class="item">
			<div class="left">
				录音性质
			</div>
			<div class="right">
				<el-select v-model="recType" placeholder="请选择" size="mini">
					<el-option
						v-for="item in recTypeValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<!-- <div class="item">
			<div class="left">
				学员现状
			</div>
			<div class="right">
        <el-select v-model="state" size="mini" placeholder="请选择">
          <el-option
            v-for="item in stateValue"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
			</div>
		</div> -->
		<div class="item">
			<div class="left">
				是否已占用
			</div>
			<div class="right">
				<el-select v-model="status" placeholder="请选择" size="mini">
					<el-option
						v-for="item in statusValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
    <div class="item">
			<div class="left">
				是否报名
			</div>
			<div class="right">
				<el-select v-model="isAssigned" placeholder="请选择" size="mini">
					<el-option
						v-for="item in isAssignedValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
    <div class="item">
			<div class="left">
				机器初筛
			</div>
			<div class="right">
				<el-select v-model="jiqi" placeholder="请选择" size="mini">
					<el-option
						v-for="item in jiqiValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
    <div class="item">
			<div class="left">
				开始时间
			</div>
			<div class="right righttime" style="width:175px">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="请选择"
          size="small"
          width="175px"
          >
        </el-date-picker>
			</div>
		</div>
    <div class="item">
			<div class="left">
				结束时间
			</div>
			<div class="right righttime" style="width:175px">
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="请选择"
          size="small"
          width="175px"
          >
        </el-date-picker>
			</div>
		</div>
    <div class="item">
			<div class="left">
				手机号
			</div>
			<div class="right">
				<el-input v-model="phoneNum" placeholder="请输入手机号前九位" size="small"></el-input>
			</div>
		</div>
		<div class="item" v-show="showTime">
			<div class="left">
				录音时长
			</div>
			<div class="right">
				<div class="block">
					<el-slider
						v-model="timeIntercept"
						range
						show-stops
            :format-tooltip="format"
						label="12"
						:step="5"
						:max="35">
					</el-slider>
				</div>
			</div>
		</div>
		<div class="footer">
			<el-button 
				size="small"
				@click="handleReset" plain>重置</el-button>
			<el-button 
				type="primary" 
				size="small"
				@click="handleSearch">查询</el-button>
		</div>    
	</div>
</template>
<script>
import * as types from '@/store/modules/record/actionTypes'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    showTime() {
      return this.$store.state.record.isAssigned === '0'
    },
		// 事业部
    enterpriseId: {
      get() {
        return this.$store.state.record.enterpriseId
      },
      set(value) {
        this[types.SETENTERPRISEID](value)
      }
    },
    groupId: {
      get() {
        return this.$store.state.record.groupId
      },
      set(value) {
        this[types.SETGROUPID](value)
      }
    },
    sellId: {
      get() {
        return this.$store.state.record.sellId
      },
      set(value) {
        this[types.SETSELLID](value)
      }
    },
    sellGroupId: {
      get() {
        return this.$store.state.record.sellGroupId
      },
      set(value) {
        this[types.SETSELLGROUPID](value)
      }
    },
    recordType: {
      get() {
        return this.$store.state.record.recordType
      },
      set(value) {
        this[types.SETRECORDTYPE](value)
      }
    },
    recType: {
      get() {
        return this.$store.state.record.recType
      },
      set(value) {
        this[types.SETRECTYPE](value)
      }
    },
    workNum: {
      get() {
        return this.$store.state.record.workNum
      },
      set(value) {
        this[types.SETWORKNUM](value)
      }
    },
    state: {
      get() {
        return this.$store.state.record.state
      },
      set(value) {
        this[types.SETSTATE](value)
      }
    },
    status: {
      get() {
        return this.$store.state.record.status
      },
      set(value) {
        this[types.SETSELECTSTATUS](value)
      }
    },
    timeIntercept: {
      get() {
        return this.$store.state.record.timeIntercept
      },
      set(value) {
        this[types.SETTIMELENGTH](value)
      }
    },
    isAssigned: {
      get() {
        return this.$store.state.record.isAssigned
      },
      set(value) {
        this[types.SETISASSIGNED](value)
      }
    },
    jiqi: {
      get() {
        return this.$store.state.record.jiqi
      },
      set(value) {
        this[types.SETJIQI](value)
      }
    },
    phoneNum: {
      get() {
        return this.$store.state.record.phoneNum
      },
      set(value) {
        this[types.SETPHONENUM](value)
      }
    },
    startTime: {
      get() {
        return this.$store.state.record.startTime
      },
      set(value) {
        this[types.SETSTARTTIME](value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.record.endTime
      },
      set(value) {
        this[types.SETENDTIME](value)
      }
    },
    ...mapGetters('record', [
      'enterpriseIdValue',
      'groupIdValue',
      'sellIdValue',
      'sellGroupIdValue',
      'recordTypeValue',
      'isAssignedValue',
      'recTypeValue',
      'statusValue',
      'stateValue',
      'jiqiValue',
      'phoneNumValue',
      'startTimeValue',
      'endTimeValue'
    ])
  },
  created() {
    this[types.INITSELECT]()
  },
  methods: {
    ...mapMutations('record', [
      types.SETENTERPRISEID,
      types.SETGROUPID,
      types.SETSELLID,
      types.SETSELLGROUPID,
      types.SETRECORDTYPE,
      types.SETRECTYPE,
      types.SETWORKNUM,
      types.SETSTATE,
      types.SETSELECTSTATUS,
      types.SETTIMELENGTH,
      types.SETJIQI,
      types.SETISASSIGNED,
      types.SETSELLIDVALUE,
      types.SETENTERPRISEIDVALUE,
      types.SETGROUPIDVALUE,
      types.SETSELLGROUPIDVALUE,
      types.SETPHONENUM,
      types.SETSTARTTIME,
      types.SETENDTIME
    ]),
    ...mapActions('record', [
      types.INITSELECT,
      types.SETGROUPIDVALUE,
      types.SETSELLIDVALUE,
      types.SETSELLGROUPIDVALUE,
      types.SEARCH
    ]),
    handleReset() {
      this.$store.state.record.groupIdValue = []
      this.$store.state.record.sellIdValue = []
      this.$store.state.record.sellGroupIdValue = []
      const toNull = [
        types.SETENTERPRISEID,
        types.SETGROUPID,
        types.SETSELLID,
        types.SETSELLGROUPID,
        types.SETRECORDTYPE,
        types.SETRECTYPE,
        types.SETWORKNUM,
        types.SETSTATE,
        types.SETSELECTSTATUS,
        types.SETJIQI,
        types.SETISASSIGNED,
        types.SETPHONENUM,
        types.SETSTARTTIME,
        types.SETENDTIME
      ]
      toNull.forEach(item => {
        this[item]('')
      })
      this[types.SETTIMELENGTH]([0, 0])
      // this[types.SETSELLIDVALUE]('')
      // this[types.SETGROUPIDVALUE]('')
      // this[types.SETSELLGROUPIDVALUE]('')

      this.handleSearch(false)
    },
    handleSearch(closeMask = true) {
      closeMask && this.$emit('closeMore')
      this[types.SEARCH]()
    },
    format(value) {
      if (+value > 30) return '30+'
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
.more-info {
      width: 90%;
      padding: 20px;
      padding-bottom: 40px;
      height: 280px;
      min-height: 280px;
      margin: 0 auto;
      border: 1px solid gold;
      border-radius: 5px;
      background: white;
      box-shadow: 0 0 10px #999;
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      display: flex;
      flex-wrap: wrap;
      z-index: 1001;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33.33%;
        height: 40px;
        .left {
          width: 100px;
        }
        .righttime{
          .el-date-editor.el-input{
            width: 175px;
          }
        }
      }
      .block {
        width: 200px;
        background: #ffffff;
      }
      .footer {
        position: absolute;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: flex-end;
        height: 30px;
        bottom: 10px;
        left: 50%;
        margin-left: -20px;
      }
    }
</style>


