<template>
	<div class="audioplay-wrapper" style="position: static;" v-loading="isLoading">
    <div class="header-wrapper">
      <head-bar></head-bar>
      <player 
        :showShare="showShare"
        @breakRule="breakRule"
        @confirm="confirm"
        @remark="remark"
        :currentId="currentId"
        ref="player"></player>
    </div>
		<div class="content-wrapper">
      <left-bar v-if="playerMode !== 'detail'"></left-bar> 
			<div class="right" v-if="!isLoading">
        <div class="right-content">
          <DetailInfo
            v-if="studentAndOrder"
            :studentAndOrder="studentAndOrder"></DetailInfo> 
          <quality-info :studentAndOrder="studentAndOrder"></quality-info>
          <quality-grade></quality-grade> 
          <save-footer v-if="playerMode !== 'detail'"></save-footer>
          <Illegal
            v-if="showRuleBreak"
            :errorId="errorId"
            @closeBreakRule="showRuleBreak=false"></Illegal>
          <remark 
            v-if="showRemark"
            @addRecordCommit="addRecordCommit"
            @closeRemark="showRemark = false"></remark>
        </div>
			</div>
		</div>	
	</div>
</template>
<script>
import * as types from '@/store/modules/player/actionTypes'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { confirmBadByjiqi } from '@/api/player'
import HeadBar from '../layout/HeadBar'
import LeftBar from './LeftBar'
import DetailInfo from './DetailInfo'
import QualityInfo from './QualityInfo'
import QualityGrade from './QualityGrade'
import SaveFooter from './SaveFooter'
import Illegal from './Masks/Illegal'
import Player from './Player'
import Remark from './Masks/Remark'
export default {
  components: {
    HeadBar,
    LeftBar,
    DetailInfo,
    QualityInfo,
    QualityGrade,
    SaveFooter,
    Illegal,
    Player,
    Remark
  },
  data() {
    return {
      showShare: false, // 分享按钮不显示
      showRuleBreak: false,
      showRemark: false,
      loading: true,
      errorId: ''
    }
  },
  computed: {
    ...mapGetters('player', [
      'isLoading',
      'studentAndOrder',
      'playerMode',
      'currentId'
    ])
  },
  methods: {
    ...mapActions('player', [
      types.INIT_PLAYER,
      types.GET_SELECTERS,
      types.INIT_DETAIL,
      types.INIT_PLAYERDETAIL
    ]),
    ...mapMutations('player', [
      types.HANDLE_OPERATIONLOCK,
      types.HANDLE_ADDERRORS,
      types.HANDLE_COMFIRMILLEGAL
    ]),
    breakRule(errorId) {
      this.errorId = errorId
      this.showRuleBreak = true
    },
    confirm(item) {
      confirmBadByjiqi(this.currentId, item.id).then(() => {
        this[types.HANDLE_COMFIRMILLEGAL]()
        this[types.HANDLE_ADDERRORS]({
          badTime: item.badTime,
          detail: item.detail
        })
      }).catch(err => {
        alert(err)
      })
    },
    remark() {
      this.showRemark = true
    }
  },
  async created() {
    // showShare分享按钮不显示
    const recordId = this.$route.query.showDetail
    const showShare = this.$route.query.showShare
    await this[types.GET_SELECTERS]()

    if (recordId) {
      this[types.INIT_DETAIL](recordId)
    } else if (this.$checkRole('canscore')) {
      this[types.INIT_PLAYER]()
    } else {
      this[types.INIT_PLAYERDETAIL]()
    }
    if (showShare === 'true') {
      this.showShare = true
    } else {
      this.showShare = false
    }
  },
  destroyed() {
    this[types.HANDLE_OPERATIONLOCK](false)
  }
}
</script>

<style lang="scss" scoped>
.audioplay-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header-wrapper {
    height: 130px;
    z-index: 10001;
    .el-header {
      position: relative;
    }
  }
  .content-wrapper {
		display: flex;
    padding: 30px 0 0 30px;
    .left {
      width: 180px;
    }
		.right {
      margin-left: 10px;
      padding: 40px 0 0 30px;
      width: 100%;
      background-color: white;
      height: calc(100vh - 160px);
      overflow: auto;
      .right-content {
        width: 100%;
        height: auto;
        // min-width: 1205px;
        padding-bottom: 50px;
        padding-right: 30px;
      }
		}
		h3 {
			font-size: 24px;
			height: 30px;
			line-height: 30px;
			font-weight: 700;
			margin-bottom: 30px;
		}
	}
}
</style>


