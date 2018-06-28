<template>
<div class="wrapper">
<div class="record-wrapper">
  <div class="header">
    <div 
      class="switch-more"
      @click="showMore=!showMore">查找录音</div>
    <span
      class="total-count">已选中 {{currentSelectedCount}}
      <span 
        :class="{disable: cantGoNext}"
        class="go-audio-play"
        @click="goAudioPlay">进入录音详情页</span></span>
  </div>
  <div class="content">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        header-align="center"
        :selectable="selectable">
      </el-table-column>
      <el-table-column
        label="责任人"
        align="center"
        header-align="center"
        prop="sellName">
      </el-table-column>
      <!-- <el-table-column
        prop="recordType"
        label="录音类型"
        align="center"
        header-align="center">
      </el-table-column> -->
      <el-table-column
        prop="enterpriseName"
        label="事业部"      
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="军团"    
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="sellAndGroupName"
        label="销售部/组"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="isSystem"
        label="机器初筛违规"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="recType"
        label="录音性质"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="isApply"
        label="是否报名"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="examineName"
        label="质检员"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="selectStatus"
        label="状态"
        align="center"
        header-align="center">
      </el-table-column> 
      <el-table-column
        prop="workNum"
        label="工号"
        align="center"
        header-align="center">
      </el-table-column>   
      <el-table-column
        prop="phoneNum"
        label="手机号"
        align="center"
        width="120px"
        header-align="center">
      </el-table-column>  
      <el-table-column
        prop="date"
        label="日期"
        width="110px"
        align="center"
        header-align="center">
      </el-table-column>    
    </el-table>
    <transition name="slide-fade">
      <select-shadow
        @closeMore="showMore=false"
        v-show="showMore"></select-shadow>
    </transition>
  </div>
  <div class="footer">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pagination.size"
      :total="pagination.totalElements"
      :current-page="pagination.number"
      @current-change="TOGGLEPAGINATION">
    </el-pagination>
  </div>
  </div>
<div class="mask-wrapper" v-show="showMore" @click="showMore=!showMore"></div>
</div>
</template>
<script>
import {
  addRecordsToList } from '@/api/record'
import SelectShadow from './SelectShadow'
import { mapActions, mapGetters } from 'vuex'
import * as types from '@/store/modules/record/actionTypes'

export default {
  data() {
    return {
      multipleSelection: [],
      oldMultipleSelection: [],
      currentSelectedCount: 0,
      showMore: false,
      cantGoNext: false
    }
  },
  components: {
    SelectShadow
  },
  computed: {
    ...mapGetters('record', [
      'tableData',
      'oldSelectedCount',
      'pagination'
    ])
  },
  created() {
    this[types.SEARCH]().then(
      () => {
        this.updateCurrentSelectedCount(this.oldSelectedCount)
      }
    )
  },
  methods: {
    ...mapActions('record', [
      types.SEARCH,
      types.TOGGLEPAGINATION
    ]),
    handleSelectionChange(value) {
      this.multipleSelection = value
    },
    selectable(item) {
      return item.selectStatus !== '已占用'
    },
    goAudioPlay() {
      sessionStorage.setItem('record', location.pathname)
      if (this.cantGoNext) {
        this.$message({
          message: '你还没有选取录音, 选择一些把',
          type: 'info'
        })
      } else {
        addRecordsToList(
          this.multipleSelection.map(item => item.recordId)
          ).then(() => {
            this.$router.push('/audioPlay')
          }).catch(() => {
            this.$message({
              message: '添加录音到列表失败, 请稍后重试',
              type: 'error'
            })
          })
      }
    },
    /**
     * updateCurrentSelectedCount
     *
     * 更新右上角的勾选数量, 当勾选 0 个录音记录时, 不可入打分页面
     * @augments count 当前选中的录音的个数(以前选中的 + 本页选中的)
     */
    updateCurrentSelectedCount(count) {
      if (count === 0) {
        this.cantGoNext = true
      } else {
        this.cantGoNext = false
      }
      this.currentSelectedCount = count
    }
  },
  filters: {
    createBad(value) {
      return value === 1 ? '是' : '否'
    }
  },
  watch: {
    multipleSelection: {
      handler() {
        let count = 0
        count = this.oldSelectedCount + this.multipleSelection.length
        if (count > 10) {
          this.$message({
            message: '您最多可以占用10个录音',
            type: 'error',
            customClass: 'element-ui-message'
          })
          this.multipleSelection = this.oldMultipleSelection
          this.$refs.multipleTable.clearSelection()
          this.oldMultipleSelection.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item, true)
          })
        } else {
          this.oldMultipleSelection = [].concat(this.multipleSelection)
          this.updateCurrentSelectedCount(count)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.record-wrapper{
  width: 100%;
  height: 60px;
  position: relative;

.header {
    width: 100%;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    border-top: 1px solid #e9e9e9;
    border-bottom: 2px solid #d0d0d0;
    box-sizing: border-box;
    line-height: 60px;
    padding: 0 20px;
    .switch-more {
      float: left;
      color: #72ACE3;
      cursor: pointer;
      &:hover {
        text-decoration-line: underline;
      }
    }
    .total-count {
      float: right;
      .go-audio-play {
        margin-left: 5px;
        color: #72ACE3;
        cursor: pointer;
        &:hover {
          text-decoration-line: underline;
        }
      }
      .disable {
        color: #999;
        cursor:  not-allowed;
        &:hover {
          text-decoration-line: none;
        }
      }
    }
  }
  .content {
    padding:20px;
    min-width: 100%; 
    min-height: 280px;
  }
  .footer {
    float: right;
    margin-right: 15px;
  }

}
  .mask-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0; 
    background: #000;
    opacity: 0.1;
    z-index: 1000;
  }  
</style>
