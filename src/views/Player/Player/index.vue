<template>
  <div class="player-box">
    <div 
      class="back"
      @click="goBack">
      <span class="svg-container">
        <icon-svg icon-class="back" />
      </span>
      返回
    </div>
    <div class="player">
      <audio 
        ref="audio"
        :src="musicData.url"
        @timeupdate="currentTime"
        @canplay="songLengths"
        controls
        autoplay
        loop></audio>
      <div class="tool-bar">
        <span 
          @click="speedDown"
          class="speed-down">
          <icon-svg 
            icon-class="icon-speed"/>
        </span>
        <span 
          @click="togglePlay"
          :title="isPlaying ? '暂停' : '播放'" 
          class="play-btn">
          <icon-svg 
            :icon-class="[isPlaying ? 'pause' : 'play-circle-fill']" />
        </span>
        <span 
          @click="speedUp"
          class="speed-up">
          <icon-svg 
            icon-class="icon-speed"/>
        </span>
      </div>
      <div class="slider-wrapper">
        <div class="current-speed">
          x {{speed}}
        </div>
        <div class="current-time">
          {{currentLength | timeFilter}}
        </div>
        <slider 
          @changeEvent="currentChange"
          :value="sliderValue"
          @toErrorMessage="toErrorMessage"
          ></slider>
        <div class="total-time">
          {{songLength | timeFilter}}
        </div>
      </div>
    </div>

    <!-- 只有打分模式下, 显示功能框 -->
    <div class="btn-group" v-if="playerMode === 'score'">
      <div 
        class="btn-submit"
        @click="submitAll">全部提交</div>
        <div 
        class="btn-submit"
        @click="cancel">一键清空录音</div>
    </div>
    <!-- 只在精品库下显示 分享按钮 -->
    <div class="btn-group" style="width:430px" v-if="showShare">
      <div class="btn-submit" @click="shareEvent">分享</div>
    </div>

    <div class="btn-group" style="width:430px" v-if="playerMode === 'detail' && showShare===false && showBtn !== false">
      <el-button class="btn-submit1" @click="TwoSure" :disabled="lookStrategyBtn" :class="{disablesa:lookStrategyBtn===true}">确认</el-button>
      <el-button class="btn-submit1" @click="TwoEdit" :disabled="lookStrategyBtn" :class="{disablesa:lookStrategyBtn===true}">修改</el-button>
    </div>

    <div class="paly-mark" v-if="isMarks">
      <div class="paly-mark-box">
        <p class="paly-mark-title">一键清空录音试听列表后，占有录音将全部释放，</p>
        <p>是否确定一键清空录音列表</p>
        <div class="play-btns">
          <button @click="markSure($event)" class="sure">确定</button>
          <button @click="markNo" class="no">取消</button>
        </div>
      </div>
    </div>
    <div class="marks" v-if="isMark">
    <div class="mark-box">
      <div class="box">
        <div class="lefts">
            <h3>将话术分享给</h3>
            <el-input @click.native="toShare($event)" class="approval-area-input" v-model="input2" readonly="readonly" placeholder="组织架构">
                <i slot="suffix" class="el-icon-arrow-right"></i>
            </el-input>
            <h3>备注</h3>
            <el-input type="textarea" v-model="desc" placeholder="请输入" class="approval-area-input"></el-input>
            <span slot="footer" class="dialog-footer">
              <button class="cancel" @click="cancels">取消</button>
              <button class="sure" @click="Sure">确定</button>          
            </span>
        </div>
        <div class="rights">
            <div class="tops">
              <span @click="toOne($event)"><i class="el-icon-arrow-left"></i></span>
              <button @click="resetButton($event)">重置</button>
            </div>
            <el-tree v-show="branchShow" show-checkbox node-key="id" ref="tree" @check-change="throttle(showItem)" :data="treeData" :props="defaultProps">
            </el-tree>
        </div>
      </div>
    </div>
  </div>
  <div class="editMask" v-if="isEditMask">
    <div class="paly-mark-box" style="padding-top:20px;height:250px">
      <h3>复检备注</h3>
      <textarea name="" id="" cols="30" rows="10" v-model="editTextarea" placeholder="最多输入250个字"></textarea>
      <div class="play-btns1">
          <button class="sure" @click="isEditMaskSure">确定</button>
          <button class="no" @click="isEditMaskNo">取消</button>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { deleteViolation, secondqc } from '@/api/player'
import Slider from './Slider'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Modal from '@/components/modal'
import confirm from '@/components/modal/confirm.vue'
import { userOrg } from '@/api/goodStategy'
import { selectRadios } from '@/api/record'
import fetch from '@/utils/fetch'
import {
  HANDLE_ERRORTIME,
  HANDLE_SUBMITSCOREINFO,
  SET_TIMELENGTH,
  HANDLE_CHOOSEITEM1,
  INIT_BOUTIQU,
  SET_ALLTIME,
  FINISHED_MUSIC,
  IS_REDPOINTEDIT,
  GET_REDPOINTINDEX,
  GET_ISSECQUALITY,
  GET_BASEINFO
   } from '@/store/modules/player/actionTypes'

Vue.use(Modal, {
  modals: {
    confirm
  }
})
export default {
  data() {
    return {
      songLength: 1,
      currentLength: 0,
      isPlaying: true,
      speed: 1,
      isMarks: false,
      input2: '',
      isMark: false,
      branchShow: true,
      branch: [],
      treeData: [],
      ids: '',
      defaultProps: {
        children: 'item',
        label: 'name'
      },
      desc: '',
      recordId: '',
      lookStrategyBtn: false,
      isEditMask: false,
      editTextarea: '',
      isAlertOne: false
     // indexs: 0
    }
  },
  watch: {
    currentId: {
      handler() {
        this.initPlayer()
      },
      deep: true
    }
  },
  computed: {
    sliderValue() {
      const a = this.songLength === 0 ? 0 : Math.round((this.currentLength / this.songLength) * 100)
      return a
    },
    ...mapGetters('player', [
      'musicData',
      'playerMode'
    ]),
    ok: {
      get() {
        return this.$store.state.player.ok
      },
      set(value) {
        this[IS_REDPOINTEDIT](value)
      }
    },
    indexs: {
      get() {
        return this.$store.state.player.indexs
      },
      set(value) {
        this[GET_REDPOINTINDEX](value)
      }
    },
    isSecQuality: {
      get() {
        return this.$store.state.player.isSecQuality
      },
      set(value) {
        this[GET_ISSECQUALITY](value)
      }
    },
    showBtn() {
      return this.$route.query.showBtn
    }
  },
  mounted() {
    setTimeout(() => {
      this[FINISHED_MUSIC]()
    }, 2000)
    setTimeout(() => {
      if (this.isSecQuality === true) {
        this.lookStrategyBtn = true
      } else {
        this.lookStrategyBtn = false
      }
    }, 1000)
    userOrg()
    .then(res => {
      this.treeData = res
    })
    this.recordId = this.$route.query.showDetail
  },
  beforeDestroy() {
    Modal.removeAll()
  },
  // prop传参数
  props: ['currentId', 'showShare'],
  methods: {
    ...mapMutations('player', [
      HANDLE_ERRORTIME,
      SET_TIMELENGTH,
      SET_ALLTIME,
      IS_REDPOINTEDIT,
      GET_ISSECQUALITY,
      GET_REDPOINTINDEX

    ]),
    ...mapActions('player', [
      HANDLE_SUBMITSCOREINFO,
      INIT_BOUTIQU,
      HANDLE_CHOOSEITEM1,
      FINISHED_MUSIC,
      GET_BASEINFO
    ]),
    currentChange(val) {
      this.$refs.audio.currentTime = this.$refs.audio.duration * val / 100
    },
    currentTime() {
      this.currentLength = this.$refs.audio && this.$refs.audio.currentTime
      this.musicData.errors.forEach((item, index) => {
        if (item.badTime === ~~this.currentLength && !item.showed) {
          item.showed = true
          this.indexs = index
          this.showErrorConfirm(this.musicData.errors[index])
        }
      })
    },
    toErrorMessage(vals, event) {
      this.indexs = vals
      this.showErrorConfirm(this.musicData.errors[this.indexs])
      return false
    },
    showErrorConfirm(item) {
      this.isPlaying = false
      this.$refs.audio.pause()
      if (this.playerMode === 'score') {
        this[HANDLE_ERRORTIME](this.currentLength)
        this.$modal.confirm({
          title: item ? '系统判定违规点' : '',
          content: item && item.detail,
          showModify: !!item
        }).then(res => {
          if (res.type === 'modify') {
            // 点击了修改, 进行人工校验
            this.$emit('breakRule', item ? item.id : '')
            this.ok = 3
          } else {
            // 点击了确定, 保存这个错误
            // 存在 item 说明是系统判定的违规
            // 否则为用户手动点击
            if (item) {
              this.$emit('confirm', item)
              this.$store.state.player.arrs.splice(this.indexs, 1)
              this.musicData.errors.splice(this.indexs, 1)
            } else {
              this.$emit('breakRule', item ? item.id : '')
            }
          }
        }).catch(rej => {
          if (item) {
            this.deleteViolation(item.id)
            this.musicData.errors.splice(this.indexs, 1)
            this.$store.state.player.arrs.splice(this.indexs, 1)
          }
        })
      }
    },
    deleteViolation(id) {
      deleteViolation(id).then(res => {
        if (!res) {
          this.$message({
            message: '违规点删除失败, 请刷新后重试',
            type: 'error',
            customClass: 'element-ui-message'
          })
        }
        this.togglePlay()
      })
    },
    songLengths() {
      if (this.songLength === this.$refs.audio.duration) return
      this.songLength = this.$refs.audio.duration
      this[SET_TIMELENGTH](this.songLength)
      this[FINISHED_MUSIC]()
    },
    togglePlay() {
      if (this.$refs.audio.paused) {
        this.play()
      } else {
        this.pause()
      }
    },
    play() {
      this.isPlaying = true
      this.$refs.audio.play()
    },
    pause() {
      this.showErrorConfirm()
    },
    speedDown() {
      if (this.$refs.audio.playbackRate > 1) {
        this.speed = (this.$refs.audio.playbackRate -= 0.1).toFixed(1)
      }
    },
    speedUp() {
      if (this.$refs.audio.playbackRate < 1.5) {
        this.speed = (this.$refs.audio.playbackRate += 0.1).toFixed(1)
      }
    },
    submitAll() {
      this[HANDLE_SUBMITSCOREINFO]().then(res => {
        if (res === true) {
          this.goNext()
        }
      }).catch(() => {
        this.$store.commit('player/SET_LOADING', false)
      })
    },
    cancel() { // 一键取消录音列表
      this.isMarks = true
    },
    markSure(event) {
      const lists = this.$store.state.player.recordList
      const arr = []
      const brr = []
      lists.map((item) => {
        if (item.status === 0) {
          arr.push(item.id)
          arr.map((val) => {
            if (val !== this.currentId) {
              brr.push(val)
            }
          })
        }
      })
      if (brr.length > 0) {
        this.isMarks = false
        fetch({
          url: `/qc/records/delete?records=${brr.toString()}`,
          method: 'post'
        })
          .then(res => {
            if (res === true) {
              selectRadios()
                .then(res => {
                  this.$store.state.player.recordList = res
                  if (this.$store.state.player.recordList.length > 0) {
                    this['HANDLE_CHOOSEITEM1'](res[0].id)
                    this.$message({
                      type: 'success',
                      message: '录音列表已清空!',
                      customClass: 'element-ui-message'
                    })
                  } else {
                    this.$router.push({ path: 'layout/myArmy' })
                    this.$message({
                      type: 'success',
                      message: '录音列表已清空!',
                      customClass: 'element-ui-message'
                    })
                  }
                })
            } else {
              this.$message({
                type: 'error',
                message: '清空失败',
                customClass: 'element-ui-message'
              })
            }
          })
      } else {
        this.isMarks = false
        this.$message({
          type: 'info',
          message: '您已经全部清空了哦',
          customClass: 'element-ui-message'
        })
        return false
      }
    },
    markNo() {
      this.isMarks = false
      this.$message({
        type: 'info',
        message: '已取消清空',
        customClass: 'element-ui-message'
      })
    },
    initPlayer() {
      this.$refs.audio.currentTime = 0
      this.isPlaying = true
      this.speed = 1
      // this[FINISHED_MUSIC]()
    },
    goBack() {
      this.$router.go(-1)
    },
    goNext() {
      this.$router.push('/complete')
    },
    dialogVisible(id) {
      this.isMark = true
      this.input2 = ''
      this.desc = ''
      this.ids = id
    },
    cancels() {
      this.isMark = false
      this.input2 = ''
      this.desc = ''
      this.$message({
        message: '取消分享',
        type: 'info',
        customClass: 'element-ui-message'
      })
    },
    Sure() {
      if (this.input2.trim().length > 0) {
        if (this.desc.length > 0) {
          this.isMark = false
          fetch({
            url: `/boutiques/records/share?organizationIds=${this.branch.toString()}&recordId=${this.recordId}&content=${this.desc}`,
            method: 'post'
          })
          .then(res => {
            if (res === true) {
              this.$message({
                message: '分享成功',
                type: 'success',
                customClass: 'element-ui-message'
              })
            } else {
              this.$message({
                message: '分享失败',
                type: 'error',
                customClass: 'element-ui-message'
              })
            }
          })
        } else {
          this.$message({
            message: '请输入备注内容哦！',
            type: 'warning',
            customClass: 'element-ui-message'
          })
        }
      } else {
        this.$message({
          message: '您还没有选择要分享的部门哦',
          type: 'warning',
          customClass: 'element-ui-message'
        })
      }
    },
    toShare(event) {
      var ss = document.querySelector('.box')
      ss.style.marginLeft = '-410px'
    },
    toOne(event) {
      event.stopPropagation()
      event.preventDefault()
      var ss = document.querySelector('.box')
      ss.style.marginLeft = '0px'
    },
    findPath(node, id, path) {
      if (!path) {
        path = []
      }
      if (node.id === id) {
        return path
      }
      path.push(node)
      if (node.item.some(child => this.findPath(child, id, path))) {
        return path
      }
      path.pop()
      return false
    },
    resetButton() {
      this.$refs.tree.setCheckedKeys([])
    },
    showItem() {
      const checkedList = this.$refs.tree.getCheckedNodes()
      this.branch = []
      this.branch = checkedList.map(res => res.id)
      for (let i = 0; i < checkedList.length; i++) {
        const len = checkedList[i].item.length
        if (len > 0) {
          checkedList.splice(i + 1, len)
        }
      }

      this.input2 = ''
      for (let i = 0; i < checkedList.length; i++) {
        if (checkedList[i].item.length > 0) {
          this.input2 += `${checkedList[i].name} , `
        } else {
          const thisId = checkedList[i].id

          const arr2 = this.findPath({
            item: this.treeData
          }, thisId).map(x => x.name).reverse()
          arr2.pop()
          if (arr2.length === 0) {
            this.input2 += checkedList[i].name + ','
          } else {
            this.input2 += `${arr2[0]} - ${checkedList[i].name},`
          }
        }
      }
    },
    throttle(method, context) {
      clearTimeout(method.tId)
      method.tId = setTimeout(() => {
        method.call(context)
      }, 300)
    },
    shareEvent() {
      this.isMark = true
      this.input2 = ''
      this.desc = ''
    },
    TwoSure() {
      secondqc(this.recordId, '')
      .then(res => {
        if (res === true) {
          this[GET_BASEINFO]()
          this.lookStrategyBtn = true
          this.$message({
            message: '已提交复检结果，提交后将不能更改',
            type: 'success',
            customClass: 'element-ui-message'
          })
        }
      })
    },
    TwoEdit() {
      this.isEditMask = true
      this.editTextarea = ''
    },
    isEditMaskSure() {
      if (this.editTextarea.trim().length > 0) {
        if (this.editTextarea.trim().length > 250) {
          this.$message({
            message: '备注内容要小于250个字',
            type: 'warning',
            customClass: 'element-ui-message'
          })
          return
        } else {
          secondqc(this.recordId, this.editTextarea)
        .then(res => {
          this.isEditMask = false
          // 调base接口
          if (res === true) {
            this[GET_BASEINFO]()
            this.lookStrategyBtn = true
            this.$message({
              message: '您成功修改了录音质检结果',
              type: 'success',
              customClass: 'element-ui-message'
            })
          } else {
            this.$message({
              message: '修改录音质检结果失败',
              type: 'error',
              customClass: 'element-ui-message'
            })
          }
        })
        }
      } else {
        this.$message({
          message: '请填写备注内容',
          type: 'warning',
          customClass: 'element-ui-message'
        })
      }
    },
    isEditMaskNo() {
      this.isEditMask = false
      this.$message({
        message: '您取消了备注',
        type: 'warning',
        customClass: 'element-ui-message'
      })
    }
  },
  components: {
    Slider
  },
  filters: {
    time(value) {
      var length = Math.floor(value)
      var minute = Math.floor(value / 60)
      minute = ('' + minute).padStart(2, '0')
      var second = length % 60
      second = ('' + second).padStart(2, '0')
      return minute + ':' + second
    }
  }
}
</script>
<style lang="scss" src="./mark.scss" scoped>
</style>

