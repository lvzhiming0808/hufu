<template>
  <div>
    <header-bar></header-bar>
    <div class="create_wrapper">
      <div class="create_wrapper_inner">
        <div class="strategyFirstHeader">
          <div class="detail_header_list"><span @click="goList" style="cursor: pointer"><&nbsp;&nbsp;列表页</span> </div>
          <div class="editStatus" v-show="status==0">您正在创建策略...</div>
          <div class="editStatus" v-show="status==1">您正在编辑策略...</div>
          <div class="close" @click="goBack">X</div>
        </div>
        <strategy-header></strategy-header>
        <repor-store ref="repertory1"></repor-store>
        <split></split>
        <div class="competitorForm">
          <el-form ref="form" :model="form" label-width="200px">
            <div class="repor_store2">
              <div class="repor_store_title2">
                <span>主要竞争对手:</span>
                <span class="point"></span>
              </div>
              <div class="repor_store_content2">
                <!-- <el-input type="textarea"
                          @keydown.native="textChange"
                          v-validate="'required|max:250'" name="competitorMust"
                          v-model="form.competitor" style="margin-bottom: 15px"></el-input>
                <span class="error" v-show="errors.has('competitorMust')" >{{ errors.first('competitorMust') }}</span> -->
                <el-input type="textarea"
                          @keydown.native="textChange"
                          @keyup.native="isCompetitorName"
                          v-model="form.competitor" style="margin-bottom: 15px"></el-input>
                <span class="error" v-show="isCompetitor" >{{texts1}}</span>
              </div>
            </div>
            <div class="repor_store2">
              <div class="repor_store_title2">
                <span>竞争对手主推学历形式或专业:</span>
                <span class="point"></span>
              </div>
              <div class="repor_store_content2">
                <el-input type="textarea"
                          @keydown.native="textChange"
                          v-validate="'max:250'" name="mainProfessional"
                          v-model="form.mainProfessional" style="margin-bottom: 20px"></el-input>
                <span class="error" v-show="errors.has('mainProfessional')" >{{ errors.first('mainProfessional') }}</span>
              </div>
            </div>
            <div class="repor_store2">
              <div class="repor_store_title2">
                <span>竞争对手价格:</span>
                <span class="point"></span>
              </div>
              <div class="repor_store_content2">
                <el-input type="textarea"
                          @keydown.native="textChange"
                          v-validate="'max:250'" name="price"
                          v-model="form.price" style="margin-bottom: 20px"></el-input>
                <span class="error" v-show="errors.has('price')" >{{ errors.first('price') }}</span>
              </div>
            </div>
            <div class="repor_store2">
              <div class="repor_store_title2">
                <span>竞争对手截杀:</span>
                <span class="point"></span>
              </div>
              <div class="repor_store_content2">
                <el-input type="textarea"
                          @keydown.native="textChange"
                          v-validate="'max:250'" name="putawayStrategy"
                          v-model="form.putawayStrategy" style="margin-bottom: 20px"></el-input>
                <span class="error" v-show="errors.has('putawayStrategy')" >{{ errors.first('putawayStrategy') }}</span>
              </div>
            </div>
            <div class="repor_store2">
              <div class="repor_store_title2">
                <span>与竞争对手相比尚德优势:</span>
                <span class="point"></span>
              </div>
              <div class="repor_store_content2">
                <el-input type="textarea"
                          @keydown.native="textChange"
                          v-validate="'max:250'" name="advantages"
                          v-model="form.advantages" style="margin-bottom: 20px"></el-input>
                <span class="error" v-show="errors.has('advantages')" >{{ errors.first('advantages') }}</span>
              </div>
            </div>
          </el-form>
        </div>
        <el-button type="primary" class="next_button" @click="previousStep">上一步</el-button>
        <el-button type="primary" @click="submit" class="next_button">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderBar from '../layout/HeadBar.vue'
  import reporStore from './reporStore.vue'
  import split from './split.vue'
  import strategyHeader from './strategyHeader4.vue'
  import { addFinalStrategyPhase, getStrategyMessages } from '../../api/createStrategy'
  import Vue from 'vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import zh from 'vee-validate/dist/locale/zh_CN'
  import Modal from '@/components/modal'
  import confirm from '@/components/modal/confirm'
  Vue.use(Modal, {
    modals: {
      confirm
    }
  })
  Validator.addLocale(zh)
  const config = {
    locale: 'zh_CN'
  }
  const dictionary = {
    zh_CN: {
      messages: {
        max: () => '您输入的字符超过了限制~~'
      },
      attributes: {
        // competitorMust: '竞争对手',
        mainProfessional: '竞争对手主推专业或学历',
        price: '竞争对手价格',
        putawayStrategy: '竞争对手截杀',
        advantages: '尚德优势'
      }
    }
  }
  Validator.updateDictionary(dictionary)
  Vue.use(VeeValidate, config)

  export default {
    components: {
      HeaderBar,
      strategyHeader,
      reporStore,
      split
    },
    data() {
      return {
        isChange: false,
        isCompetitor: false,
        texts1: '',
        form: {
          competitor: '',
          mainProfessional: '',
          price: '',
          putawayStrategy: '',
          advantages: ''
        }
      }
    },
    computed: {
      status: {    //  status: 0 -- 创建  1 -- 编辑
        get: function() {
          return this.$route.query.status
        },
        set: function(newValue) {
        }
      }
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.showCompetor()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'showCompetor'
    },
    methods: {
      isCompetitorName() {
        if (this.form.competitor) {
          if (this.form.competitor.trim().length > 0) {
            this.isCompetitor = false
            if (this.form.competitor.length > 250) {
              this.texts1 = '请输入少于250的内容'
              this.isCompetitor = true
            }
          } else {
            this.texts1 = '该内容是必填项'
            this.isCompetitor = true
          }
        }
      },
      goList() {
        sessionStorage.removeItem('strategyId')
        sessionStorage.removeItem('oldId')
        this.$router.push({ path: '/layout/myStrategy' })
      },
      goBack() {
        this.$router.push({ path: 'createStrategy3', query: { status: this.status }})
      },
      showCompetor() {
        // const finalStrategyPhase = this.$refs.repertory1.finalStrategyPhase
        // console.log(oldStrategy, '用于接受七天传来的库存的基本信息')
        const strategyId = sessionStorage.getItem('strategyId')
        const oldId = sessionStorage.getItem('oldId')
        getStrategyMessages(oldId, {
          newStrategyId: strategyId,
          type: 3
        })
          .then(res => {
            const strategy = res.strategy
            this.form.competitor = strategy.competitor
            this.form.mainProfessional = strategy.compareContent
            this.form.price = strategy.comparePrice
            this.form.putawayStrategy = strategy.compareKill
            this.form.advantages = strategy.analyzeAdvantage
          })
      },
      textChange() {
        this.isChange = true
      },
      previousStep() {
        if (this.$refs.repertory1.hasChange || this.isChange) {
          this.$modal.confirm({
            content: '如果上一步，这步操作的数据将消失哈~~~'
          }).then(() => {
            this.$refs.repertory1.hasChange = false
            this.isChange = false
            this.$router.push({ path: '/createStrategy3', query: { status: this.status }})
          }).catch(() => {
            this.$refs.repertory1.hasChange = true
            this.isChange = true
          })
        } else {
          this.$router.push({ path: '/createStrategy3', query: { status: this.status }})
        }
      },
      submit() {
        this.$refs.repertory1.hasChange = false
        const fileName = this.$refs.repertory1.filename
        const url = this.$refs.repertory1.fileUrl
        this.isChange = false
        let ok = 0     // 定义一个变量控制提示内容的的不同   0 --- 表单无错误   1 --- 有内容没填全    2 --- 字数超过50范围   3 --- 字数超过250
        const strategyId = sessionStorage.getItem('strategyId')
        // const oldId = sessionStorage.getItem('oldId')
        // const strategyId = this.$refs.repertory1.strategyId
        const finalFormData1 = this.$refs.repertory1.form
        const triggerOpens = finalFormData1.TriggerOpen
        triggerOpens.forEach((item, index) => { item.number = index })
        const mainClassSizes = finalFormData1.mainClassSizes
        mainClassSizes.forEach((item, index) => { item.number = index })
        const assistTools = finalFormData1.AssistTool
        assistTools.forEach((item, index) => { item.number = index })
        const killStrategies = finalFormData1.killStrategies
        killStrategies.forEach((item, index) => { item.number = index })
        const finalStrategy = {
          finalStrategyPhase: {
            strategyId,
            fileName,
            url,
            triggerOpens,
            mainClassSizes,
            killStrategies,
            assistTools
          },
          competitor: this.form.competitor,
          compareContent: this.form.mainProfessional,
          compareKill: this.form.putawayStrategy,
          comparePrice: this.form.price,
          analyzeAdvantage: this.form.advantages
        }
        triggerOpens.forEach((item, index) => {
          if (item.triggerOpen.trim().length === 0) {
            ok = 1
          }
          if (item.triggerOpen.length > 250) {
            ok = 2
          }
        })
        mainClassSizes.forEach((item, index) => {
          if (item.description.trim().length === 0) {
            ok = 1
          }
          if (item.description.length > 250) {
            ok = 2
          }
        })
        assistTools.forEach((item, index) => {
          if (item.tool.trim().length === 0) {
            ok = 1
          }
          if (item.tool.length > 250) {
            ok = 2
          }
        })
        killStrategies.forEach((item, index) => {
          if (item.description.trim().length === 0) {
            ok = 1
          }
          if (item.description.length > 250) {
            ok = 2
          }
        })
        if (this.form.competitor) {
          if (this.form.competitor.trim().length === 0) {
            ok = 1
          } else if (this.form.competitor.length > 250) {
            ok = 2
          }
        } else {
          ok = 1
        }
        if (this.form.mainProfessional) {
          if (this.form.mainProfessional.length > 250) {
            ok = 2
          }
        }
        if (this.form.putawayStrategy) {
          if (this.form.putawayStrategy.length > 250) {
            ok = 2
          }
        }
        if (this.form.price) {
          if (this.form.price.length > 250) {
            ok = 2
          }
        }
        if (this.form.advantages) {
          if (this.form.advantages.length > 250) {
            ok = 2
          }
        }
        if (ok === 1) {
          this.$message({
            message: '你还有内容没有填写完~~~',
            type: 'error',
            customClass: 'element-ui-message'
          })
        } else if (ok === 2) {
          this.$message({
            message: '请输入250字符以内的数据',
            type: 'error',
            customClass: 'element-ui-message'
          })
        }
        // const isFile = this.$refs.repertory1.$refs.formUploadData.file
        const isUpload = this.$refs.repertory1.$refs.formUploadData.isUpload
        if (!isUpload) {
          this.$message({
            message: '请选择上传话术~~~',
            type: 'error',
            customClass: 'element-ui-message'
          })
          return
        }
        ok === 0 && this.$modal.confirm({
          content: '您是否确定提交策略'
        }).then(() => {
          addFinalStrategyPhase(finalStrategy, strategyId)
            .then(res => {
              sessionStorage.removeItem('oldId')
              sessionStorage.removeItem('strategyId')
              this.$router.push({ path: '/layout/myStrategy' })
            })
        })
      }
    }
  }
</script>
<style lang="scss">
  .create_wrapper {
    width: 100%;
    height: 100%;
    margin-top: 80px;
    padding: 33px 30px 0 30px;
    .create_wrapper_inner{
      background-color: white;
      text-align: center;
      .strategyFirstHeader {
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        background-color: rgb(247, 147, 0);
        .detail_header_list{
          width: 20%;
          margin-left: 50px;
          font-size: 16px;
          text-align: left;
        }
        .editStatus{
          width: 60%;
          text-align: center;
          font-size: 16px;
        }
        .close{
          width: 20%;
          font-size: 16px;
          margin-right: 50px;
          text-align: right;
          cursor: pointer;
        }
      }
      .competitorForm{
        .repor_store2{
          display: flex;
          margin: 50px auto;
          width: 80%;
          padding-right: 30px;
          .repor_store_title2{
            font-size: 14px;
            width: 24%;
            text-align: right;
            .point{
              margin-top: 12px;
              width: 10px;
              height: 10px;
              display: inline-block;
              background-color: rgb(247,147,0);
              border-radius: 100%;
              margin-left: 10px;
            }
          }
          .repor_store_content2{
            width: 58%;
            margin-left: 20px;
            position: relative;
            .error{
              color: red;
              display: block;
              margin-left: 10px;
              margin-bottom: 10px;
              text-align: left;
            }
            .icon_add{
              text-align: left;
              cursor: pointer;
            }
            .addinput{
              margin-bottom: 20px;
              position: relative;
              .icon_delete{
                position: absolute;
                top: 10px;
                right: -30px;
              }
            }
          }
        }
      }
      .next_button{
        margin: 110px ;
        width: 220px;
        height: 50px;
      }
    }
  }
</style>
