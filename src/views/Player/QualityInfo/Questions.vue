<template>
<!-- 问题记录模块开始 (sop 人员对于每一个录音应该做三条问题) -->
	<div class="question-wrapper">
		<div class="classify">
			<div class="question">
				<span class="tit">问题 {{index+1}} 一级分类</span><!--
        --><el-select :disabled="operationLock" v-model="questionTypeOneId" @change="updatequestionTypeTwo" size="mini"  placeholder="请选择">
					<el-option
						v-for="item in questionTypeOneValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="question">
				<span class="tit">问题 {{index+1}} 二级分类</span>
				<el-select :disabled="operationLock" v-model="questionTypeTwoId" size="mini"  placeholder="请选择">
					<el-option
						v-for="item in questionTypeTwoValue"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<!-- 问题打分记录输入框开始 -->
		<div class="record">
			<div class="left">
				<span class="tit">问题 {{index+1}} 记录</span>
			</div>
      <div class="right">
        <el-input
          :disabled="operationLock"
          :maxlength="100"
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
          @blur="blur"
          v-model="description">
				</el-input>
      </div>
		</div>
	</div>
	<!-- 问题记录模块结束 -->
</template>
<script>
import { selectRecordQuestionGanged } from '@/api/player'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'

export default {
  data() {
    return {
      questionTypeOneValue: [],
      questionTypeTwoValue: []
    }
  },
  computed: {
    ...mapGetters('player', [
      'questions',
      'operationLock'
    ]),
    questionTypeOneId: {
      get() {
        return this.questions[this.index].questionTypeOneId
      },
      set(value) {
        this[types.SET_QUESTION]({
          index: this.index,
          keyName: 'questionTypeOneId',
          value
        })
        this[types.SET_QUESTION]({
          index: this.index,
          keyName: 'questionTypeOneName',
          value: this.questionTypeOneValue.filter(item => item.id === value)[0] &&
            this.questionTypeOneValue.filter(item => item.id === value)[0].name
        })
      }
    },
    questionTypeTwoId: {
      get() {
        return this.questions[this.index].questionTypeTwoId
      },
      set(value) {
        this[types.SET_QUESTION]({
          index: this.index,
          keyName: 'questionTypeTwoId',
          value
        })
        this[types.SET_QUESTION]({
          index: this.index,
          keyName: 'questionTypeTwoName',
          value: this.questionTypeTwoValue.filter(item => item.id === value)[0] &&
            this.questionTypeTwoValue.filter(item => item.id === value)[0].name
        })
      }
    },
    description: {
      get() {
        return this.questions[this.index].description && this.questions[this.index].description.trim()
      },
      set(value) {
        value = value.trim()
        this[types.SET_QUESTION]({
          index: this.index,
          keyName: 'description',
          value
        })
      }
    }
  },
  created() {
    this.id = this.question.id
    this.updatequestionTypeOne()
    if (this.questionTypeOneId) {
      this.updatequestionTypeTwo(this.questionTypeOneId, true)
    }
  },
  props: ['question', 'index'],
  methods: {
    ...mapMutations('player', [
      types.SET_QUESTION
    ]),
    updatequestionTypeOne() {
      selectRecordQuestionGanged({
        id: 0,
        type: this.index + 1
      }).then(res => {
        this.questionTypeOneValue = res
      })
    },
    updatequestionTypeTwo(id, init = false) {
      selectRecordQuestionGanged({
        type: this.index + 1,
        id
      }).then(res => {
        // 除了初始化以外, 将问题二 id 清空
        // 针对问题一级描述更新的情形
        if (!init) this.questionTypeTwoId = ''
        this.questionTypeTwoValue = res
      })
    },
    blur(e) {
      e.target.value = e.target.value.trim()
    }
  }
}
</script>
<style lang="scss" scoped>
.question-wrapper {
	.common , .classify{
		min-height: 30px;
    margin-bottom: 30px;
    width: 850px;
		display: flex;
		.tit {
      display: inline-block;
      width: 100px;
			font-size: 12px;
			color: #cacaca;
		}
		.question {
      flex: 1;
			margin-right: 37px;
			width: 900px;
		}
	}
	.classify .question {
		flex: 1;
	}
	.record {
		width: 850px;
		height: 50px;
		margin-bottom: 40px;
		display: flex;
		.left {
      width: 100px;
      font-size: 12px;
      color: #cacaca;
    }
    .right {
      flex: 1;
      margin: 0;
    }
	}
}

</style>
