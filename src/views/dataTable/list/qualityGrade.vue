<template>
<div class="wrapper" style="padding:0">
  <div class="quality-wrapper">
    <div class="quality-wrapper_ownOrAll" v-if="$checkRole('showOwnOrAll')">
      <div class="own" @click="getOwnorAll(1)" :class="{'quality-wrapper_own': nowIndex === 1}">我的</div>
      <div class="all" @click="getOwnorAll('')" :class="{'quality-wrapper_all': nowIndex === ''}">全部</div>
    </div>
    <div class="header">
      <div class="switch-more" @click="showMore=!showMore">查找方式</div>
      <span @click="downLoadRecordData" class="downLoadRecord" :class="{disabled: cantGoNext}">导出</span>
    </div>
    <div class="content">
      <el-table
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="tableData"
        @row-click="goDetail"
        :cell-style="{
          cursor: 'pointer'
        }"
        tooltip-effect="dark">
        <el-table-column
          type="selection"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          label="责任人"
          align="center"
          header-align="center"
          prop="sellName">
        </el-table-column>
        <el-table-column
          prop="recordType"
          label="录音类型"
          align="center"
          header-align="center">
        </el-table-column>
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
          prop="timeLength"
          label="录音时长"
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
          prop="isViolation"
          label="是否违规"
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
          align="center"
          width="110px"
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
    <div class="mask-wrapper" v-show="showMore" @click="showMore=!showMore"></div>
  </div>
</div>
</template>
<script>
  import SelectShadow from './SelectShadow'
  import { mapActions, mapGetters } from 'vuex'
  import * as types from '@/store/modules/qualityGrade/actionTypes'
  import { download } from '@/utils/fetch'
  export default {
    data() {
      return {
        currentSelectedCount: 0,
        showMore: false,
        selectedArr: [],
        multipleSelection: [],
        cantGoNext: true
      }
    },
    components: {
      SelectShadow
    },
    computed: {
      ...mapGetters('qualityGrade', [
        'tableData',
        // 'oldSelectedCount',
        'pagination',
        'nowIndex'
      ])
    },
    created() {
      this[types.SEARCH]()
    },
    methods: {
      downLoadRecordData() {
        const url = `/reports/record/download?ids=${this.selectedArr.toString()}`
        if (this.currentSelectedCount === 0) {
          // this.$message({
          //   message: '您还没有选择对应录音，请先选择',
          //   type: 'info',
          //   customClass: 'element-ui-message'
          // })
          return
        }
        // const url = `http://172.16.52.254/reports/record/download?ids=${this.selectedArr.toString()}`
        download(url)
        window.close()
      },
      getOwnorAll(index) {
        this[types.SETNOWINDEX](index)
        this[types.SEARCH]()
        this[types.INITSELECT]()
      },
      handleSelectionChange(val) {
        this.selectedArr = val.map(item => item.recordId)
        this.currentSelectedCount = this.selectedArr.length
        val.length > 0 ? this.cantGoNext = false : this.cantGoNext = true
      },
      // showShare控制分享按钮不显示
      goDetail(row, event) {
        if (event.target.tagName.toLowerCase() === 'div') {
          sessionStorage.setItem('record', location.pathname)
          this.$router.push(`/audioPlay?showDetail=${row.recordId}&showShare=false`)
        }
      },
      goAudioPlay() {
        if (this.currentSelectedCount > 1) {
          this.$message({
            message: '只能选择一个录音进入详情~',
            type: 'info',
            customClass: 'element-ui-message'
          })
          return
        }
        if (this.currentSelectedCount === 0) {
          this.$message({
            message: '您还没有勾选对应录音，请先选择',
            type: 'info',
            customClass: 'element-ui-message'
          })
          return
        }
        const showDetail = this.selectedArr[0]
        this.$router.push({
          path: '/audioPlay',
          query: {
            showDetail: showDetail
          }
        })
      },
      ...mapActions('qualityGrade', [
        types.SEARCH,
        types.TOGGLEPAGINATION,
        types.SETNOWINDEX,
        types.INITSELECT
      ])
    }
  }
</script>
<style lang="scss">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  .wrapper{
    width: 100%;
    height: auto;
    padding: 20px 30px;
    overflow: auto;
    .quality-wrapper{
    width: 100%;
    height: 60px;
    position: relative;
    .quality-wrapper_ownOrAll {
      display: flex;
      width: 100%;
      .own, .all {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        width: 48%;
        margin-left: 1%;
        margin-right: 1%;
        text-align: center;
        cursor: pointer;
      }
      .quality-wrapper_own, .quality-wrapper_all {
        color: #f79300;
        border-bottom: 2px solid #f79300;
      }
    }
    .header {
      width: 100%;
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      // border-top: 1px solid #e9e9e9;
      border-bottom: 2px solid #d0d0d0;
      box-sizing: border-box;
      padding: 0 20px;
      .switch-more {
        float: left;
        color: #72ACE3;
        cursor: pointer;
        &:hover {
          text-decoration-line: underline;
        }
      }
      .downLoadRecord {
        float: right;
        color: #72ACE3;
        cursor: pointer;
        margin-right: 50px;
        &:hover {
          text-decoration-line: underline;
        }
      }
      .disabled{
        color: #999;
          cursor:  not-allowed;
          &:hover {
            text-decoration-line: none;
          }
      }
      .total-count{
        margin-left: 30px;
        .go-audio-play{
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
      width: 100%;
      min-width: 100%;
      .el-table {
        width: 99%;
        overflow-x: hidden;
      }
    }
    .footer {
      float: right;
      margin-right: 25px;
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
  }
   
</style>
