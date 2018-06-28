<template>
  <div class="left">
    <h3 class="title">录音试听列表</h3>
    <ul class="list">
      <li 
        class="item"
        v-for="(item, index) in recordList" 
        :key="index"
        :class="{'active': item.id === currentId}"
        @click="chooseItem(item.id)">
          <span class="svg-container item-icon">
            <icon-svg icon-class="play" />
          </span>
          <span class="item-id" :title="item.id">{{item.id}}</span>
          <span class="item-status">{{item.id === currentId ? "正试听" : item.status | status}}</span>
          <span class="el-icon-circle-close-outline cha" @click="closeRadio(item.id,$event)" :class="{disabled:item.status===1}"></span>
      </li>
    </ul>
    <div class="radio-marks" v-if="isShow">
      <div class="radio-box">
        <h3>该录音性质是否变更为：</h3>
         <ul class="radio-list">
           <li :class="{isActived:ind==='1' || ind===1}" @click="changeType('1')">首资</li>
           <li :class="{isActived:ind==='2' || ind===2}" @click="changeType('2')">回访</li>
           <li :class="{isActived:ind==='3' || ind===3}" @click="changeType('3')">跨期</li>
         </ul>
        <div class="radio-btns">
          <button @click="sure">确定</button>
         <button @click="cancel">取消</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { selectRadios } from '@/api/record'
import fetch from '@/utils/fetch'
// import * as types from '@/store/modules/record/actionTypes'

export default {
  data() {
    return {
      isShow: false,
      radio3: '1',
      ind: ''
    }
  },
  filters: {
    status(status) {
      switch (status) {
        case 0:
          return '未打分'
        case 1:
          return '已保存'
        case 2:
          return '已提交'
        default:
          return '正试听'
      }
    }
  },
  computed: {
    ...mapGetters([
      'recordList',
      'currentId'
    ])
  },
  methods: {
    ...mapActions('player', [
      'HANDLE_CHOOSEITEM',
      'GET_BASEINFO',
      'HANDLE_CHOOSEITEM1'
    ]),
    // ...mapActions('record', [
    //   types.SEARCH
    // ]),
    changeType(val) {
      // console.log(this.$store.state.player.recType)
      this.ind = val
    },
    chooseItem(id, value) {
      // 只有点击非当前播放列表项时切换
      this.isPlaying = true
      if (id !== this.currentId) {
        this['HANDLE_CHOOSEITEM'](id)
      }
    },
    cancel() {
      this.isShow = false
      this.$message({
        message: '您已取消移除',
        type: 'warning',
        customClass: 'element-ui-message'
      })
    },
    sure() {
      fetch({
        url: `/qc/records/delete?records=${this.currentId}&recType=${this.ind}`,
        method: 'post'
      })
        .then(res => {
          if (res === true) {
            this.isShow = false
            this.$message({
              message: '您已成功移除该条录音',
              type: 'success',
              customClass: 'element-ui-message'
            })
            selectRadios()
              .then(res => {
                if (res.length === 0) {
                  this.$store.state.player.recordList = res
                  this.$router.push(sessionStorage.getItem('record'))
                } else {
                  this['HANDLE_CHOOSEITEM1'](res[0].id)
                  this.$store.state.player.recordList = res
                }
              })
          } else {
            this.$message({
              message: '移除录音失败',
              type: 'error',
              customClass: 'element-ui-message'
            })
          }
        })
    },
    closeRadio(id, event) {
      this.ind = this.$store.state.player.recType
      event.stopPropagation()
      event.preventDefault()
      this.isShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('../../../styles/scrollbar.scss');

.left {
  width: 180px;
  height: 510px;
  background: #fff;
  text-align: center;
  padding: 40px 20px 0;
  .title {
    font-size: 20px;
    font-weight: 700;
    text-align: justify;
    width: 140px;
    height: 30px;
    margin-bottom: 20px;
    &>span {
      display: inline-block /* Opera */; 
      padding-left: 100%;
    }
  }
  .list {
    width: 150px;
    height: 400px;
    overflow-y: auto;
    color: #b8b8b9;
    .active {
      color: gold;
    }
    .item {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      margin-bottom: 10px;
      position: relative;
      span{
        float: left;
      }
      .cha{
        position: absolute;
        right: 3px;
        top: 10px;
        color: #b8b8b9;
      }
      .disabled{
        display: none;
      }
      .item-icon {
        width: 18px;
        height: 20px;
        margin: 0 5px;
      }
      .item-id {
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-status {
        font-size: 12px;
        display: inline-block;
        width: 40px;
        line-height: 20px;
        height: 20px;
        text-align: center;
        border-radius: 5px;
        margin-top: 5px;
      }
    }
    &>:nth-child(odd) {
      background: #f8f8f8
    }
    &>:nth-child(even) {
      background: #fefcfa
    }
  }
  .radio-marks{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    .radio-box{
      width: 410px;
      height: 300px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -200px;
      margin-top: -150px;
      border-radius: 10px;
      padding:30px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      h3{
        text-align: left;
        font-size: 14px;
      }
      .radio-list{
        width: 290px;
        margin:30px auto;
        li{
          width: 100%;
          height: 30px;
          line-height: 30px;
          background: #fff6ef;
          margin-bottom: 10px;
          color: #f8a42a;
          cursor: pointer;
        }
        .isActived{
          background: #f79301;
          color: #000;
        }
      }
      .radio-btns{
        button{
          width: 112px;
          height: 30px;
          line-height: 30px;
          border: none;
          margin-left: 20px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer
        }
        :nth-child(1){
          background: #f79301;
          color: #fff;
        }
        :nth-child(2){
          background: #fff6ef;
          color: #f79301;
          border: 1px solid #d0984d;
        }
      }
      :focus{
        outline: none;
      }
    }
  }
  
}
</style>

