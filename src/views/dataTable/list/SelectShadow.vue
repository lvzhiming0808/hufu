<template>
  <div class="more-info">
    <div class="item">
      <div class="left">
        事业部
      </div>
      <div class="right">
        <el-select
          v-model="enterpriseId"
          placeholder="请选择"
          @change="SETGROUPIDVALUE"
          size="mini">
          <el-option
            v-for="(item, index) in enterpriseIdValue"
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
          @change="SETSELLIDVALUE"
          v-model="groupId"
          placeholder="请选择"
          size="mini">
          <el-option
            v-for="(item, index) in groupIdValue"
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
        	@change="SETSELLGROUPIDVALUE"
          v-model="sellId"
          placeholder="请选择"
          size="mini">
          <el-option
            v-for="(item, index) in sellIdValue"
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
            v-for="(item, index) in sellGroupIdValue"
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
        <el-input v-model="workNum" placeholder="请输入内容" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="left">
        录音类型
      </div>
      <div class="right">
        <el-select v-model="recordType" placeholder="请选择" size="mini">
          <el-option
            v-for="(item, index) in recordTypeValue"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="left">
        录音性质
      </div>
      <div class="right">
        <el-select v-model="recType" placeholder="请选择" size="mini">
          <el-option
            v-for="(item, index) in recTypeValue"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="left">
        学员现状
      </div>
      <div class="right">
        <el-select v-model="state" size="mini" placeholder="请选择">
          <el-option
            v-for="(item, index) in stateValue"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="item item_date">
      <div class="left">
        操作日期
      </div>
      <div class="right">
        <el-date-picker
          @change="dateChange"
          v-model="dateline"
          value-format="yyyy-MM-dd"
          type="date"
          size="mini"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div class="item">
      <div class="left">
        分值
      </div>
      <div class="right">
        <el-select v-model="recordScore" placeholder="请选择" size="mini">
          <el-option
            v-for="(item, index) in recordScoreValue"
            :key="item.id"
            :label="item.value"
            :value="item.value">
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
				是否违规
			</div>
			<div class="right">
				<el-select v-model="isViolation" placeholder="请选择" size="mini">
					<el-option
						v-for="item in isViolationValue"
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
          size="mini"
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
          size="mini"
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
				<el-input v-model="phoneNum" placeholder="请输入手机号前九位" size="mini"></el-input>
			</div>
		</div>
    <div class="item record" style="width: 100%;">
      <div class="left">
        录音时长
      </div>
      <div class="right" style="width: 1005px;">
        <div class="block">
          <el-slider
            v-model="timeIntercept"
            range
            show-stops
            :format-tooltip="format"
            label="12"
            :step="5"
            :max="30"
            size="mini"
            >
          </el-slider>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button
        type="warning"
        size="mini"
        plain
        @click="handleReset">重置</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="handleSearch">查询</el-button>
    </div>
  </div>
</template>
<script>
  import * as types from '@/store/modules/qualityGrade/actionTypes'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
        recordScoreValue: [
          { id: 0, value: 0 },
          { id: 1, value: 1 },
          { id: 2, value: 2 },
          { id: 3, value: 3 },
          { id: 4, value: 4 }
        ]
      }
    },
    computed: {
      // 事业部
      enterpriseId: {
        get() {
          return this.$store.state.qualityGrade.enterpriseId
        },
        set(value) {
          this[types.SETENTERPRISEID](value)
        }
      },
      groupId: {
        get() {
          return this.$store.state.qualityGrade.groupId
        },
        set(value) {
          this[types.SETGROUPID](value)
        }
      },
      sellId: {
        get() {
          return this.$store.state.qualityGrade.sellId
        },
        set(value) {
          this[types.SETSELLID](value)
        }
      },
      sellGroupId: {
        get() {
          return this.$store.state.qualityGrade.sellGroupId
        },
        set(value) {
          this[types.SETSELLGROUPID](value)
        }
      },
      recordType: {
        get() {
          return this.$store.state.qualityGrade.recordType
        },
        set(value) {
          this[types.SETRECORDTYPE](value)
        }
      },
      recType: {
        get() {
          return this.$store.state.qualityGrade.recType
        },
        set(value) {
          this[types.SETRECTYPE](value)
        }
      },
      workNum: {
        get() {
          return this.$store.state.qualityGrade.workNum
        },
        set(value) {
          this[types.SETWORKNUM](value)
        }
      },
      phoneNum: {
        get() {
          return this.$store.state.qualityGrade.phoneNum
        },
        set(value) {
          this[types.SETPHONENUM](value)
        }
      },
      startTime: {
        get() {
          return this.$store.state.qualityGrade.startTime
        },
        set(value) {
          this[types.SETSTARTTIME](value)
        }
      },
      endTime: {
        get() {
          return this.$store.state.qualityGrade.endTime
        },
        set(value) {
          this[types.SETENDTIME](value)
        }
      },
      state: {   // 学员现状
        get() {
          return this.$store.state.qualityGrade.state
        },
        set(value) {
          this[types.SETSTATE](value)
        }
      },
      status: {
        get() {
          return this.$store.state.qualityGrade.status
        },
        set(value) {
          this[types.SETSELECTSTATUS](value)
        }
      },
      timeIntercept: {
        get() {
          return this.$store.state.qualityGrade.timeIntercept
        },
        set(value) {
          this[types.SETTIMELENGTH](value)
        }
      },
      isAssigned: {
        get() {
          return this.$store.state.qualityGrade.isAssigned
        },
        set(value) {
          this[types.SETISASSIGNED](value)
        }
      },
      isViolation: {
        get() {
          return this.$store.state.qualityGrade.isViolation
        },
        set(value) {
          this[types.SETISVIOLATION](value)
        }
      },
      dateline: {
        get() {
          return this.$store.state.qualityGrade.dateline
        },
        set(value) {
          this[types.SETDATELINE](value)
        }
      },
      recordScore: {
        get() {
          return this.$store.state.qualityGrade.recordScore
        },
        set(value) {
          this[types.SETRECORDSCORE](value)
        }
      },
      ...mapGetters('qualityGrade', [
        'enterpriseIdValue',
        'groupIdValue',
        'sellIdValue',
        'sellGroupIdValue',
        'recordTypeValue',
        'recTypeValue',
        'statusValue',
        'stateValue',
        'isAssignedValue',
        'isViolationValue',
        'phoneNumValue',
        'startTimeValue',
        'endTimeValue'
      ])
    },
    created() {
      this[types.INITSELECT]()
    },
    methods: {
      ...mapMutations('qualityGrade', [
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
        types.SETDATELINE,
        types.SETRECORDSCORE,
        types.SETISASSIGNED,
        types.SETISVIOLATION,
        types.SETPHONENUM,
        types.SETSTARTTIME,
        types.SETENDTIME
      ]),
      ...mapActions('qualityGrade', [
        types.INITSELECT,
        types.SETGROUPIDVALUE,
        types.SETSELLIDVALUE,
        types.SETSELLGROUPIDVALUE,
        types.SEARCH,
        types.SETRECORDSCORE,
        types.SETDATELINE
      ]),
      handleReset() {
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
          types.SETDATELINE,
          types.SETRECORDSCORE,
          types.SETISASSIGNED,
          types.SETISVIOLATION,
          types.SETPHONENUM,
          types.SETSTARTTIME,
          types.SETENDTIME
        ]
        toNull.forEach(item => {
          this[item]('')
        })
        this[types.SETTIMELENGTH]([0, 0])
      },
      handleSearch() {
        this.$emit('closeMore')
        this[types.SEARCH]()
      },
      format(value) {
        if (+value >= 30) return '30+'
        return value
      },
      dateChange(val) {
      }
      // scoreChange(value) {
      //   this[types.SETRECORDSCORE](value)
      // }
    }
  }
</script>
<style lang="scss" scoped>
  .more-info {
    width: 90%;
    padding: 20px;
    height: 280px;
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
      //justify-content: center;
      width: 33.33%;
      height: 40px;
      .left {
        width: 100px;
        margin-left: 30px;
      }
      .righttime{
          .el-date-editor.el-input{
            width: 175px;
          }
        }
    }
    .record{
      width: 94% !important;
    }
    .item_date {
      .right{
        .el-input{
          width: 178px;
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


