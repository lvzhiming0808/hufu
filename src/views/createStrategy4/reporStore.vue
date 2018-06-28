<template>
  <div>
    <el-form ref="form" :model="form">
      <div class="repor_store">
        <div class="repor_store_title">
          <span>触发式开场:</span>
          <span class="point"></span>
        </div>
        <div class="repor_store_content">
          <div class="inputContainer" :key="index" v-for="(open,index) in form.TriggerOpen">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="''+index"
                      v-model="open.triggerOpen"></el-input>
            <span class="icon_delete" v-show="open.deleteFlag" @click="deleteOpen(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has(''+index)" >{{ errors.first(''+index) }}</span>
          </div>
          <div class="icon_add" @click="addOpen"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="repor_store">
        <div class="repor_store_title">
          <span>辅助咨询工具:</span>
          <span class="point"></span>
        </div>
        <div class="repor_store_content">
          <div class="inputContainer" :key="index" v-for="(tool,index) in form.AssistTool" >
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="'1'+index"
                      v-model="tool.tool"></el-input>
            <span class="icon_delete" v-show="tool.deleteFlag" @click="deleteTool(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('1'+index)" >{{ errors.first('1'+index) }}</span>
          </div>
          <div class="icon_add" @click="addTool"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="repor_store">
        <div class="repor_store_title">
          <span>主推班型:</span>
          <span class="point"></span>
        </div>
        <div class="repor_store_content">
          <div class="inputContainer" :key="index" v-for="(mainClass,index) in form.mainClassSizes">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="'2'+index"
                      v-model="mainClass.description"></el-input>
            <span class="icon_delete" v-show="mainClass.deleteFlag" @click="deleteMainClass(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('2'+index)" >{{ errors.first('2'+index) }}</span>
          </div>
          <div class="icon_add" @click="addMainClass"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="repor_store">
        <div class="repor_store_title">
          <span>终极截杀+优惠折扣:</span>
          <span class="point"></span>
        </div>
        <div class="repor_store_content">
          <div class="inputContainer" :key="index" v-for="(killStrategy,index) in form.killStrategies">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="'3'+index"
                      v-model="killStrategy.description"></el-input>
            <span class="icon_delete" v-show="killStrategy.deleteFlag" @click="deletekillStrategy(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('3'+index)" >{{ errors.first('3'+index) }}</span>
          </div>
          <div class="icon_add" @click="addkillStrategy"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
    </el-form>
    <formUpload :strategyPhaseId="strategyPhaseId" :filename="filename" ref="formUploadData"></formUpload>
  </div>
</template>
<script>
  import Vue from 'vue'
  import formUpload from '../formUpload/index.vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import zh from 'vee-validate/dist/locale/zh_CN'
  import { getStrategyMessages } from '../../api/createStrategy'
  Validator.addLocale(zh)
  const config = {
    locale: 'zh_CN'
  }
  const dictionary = {
    zh_CN: {
      messages: {
        max: () => '您输入的内容超过了字符的限制~~'
      },
      attributes: {
        0: '该内容', 1: '该内容', 2: '该内容', 3: '该内容', 4: '该内容', 5: '该内容', 6: '该内容', 7: '该内容', 8: '该内容', 9: '该内容',
        10: '该内容', 11: '该内容', 12: '该内容', 13: '该内容', 14: '该内容', 15: '该内容', 16: '该内容', 17: '该内容', 18: '该内容', 19: '该内容',
        20: '该内容', 21: '该内容', 22: '该内容', 23: '该内容', 24: '该内容', 25: '该内容', 26: '该内容', 27: '该内容', 28: '该内容', 29: '该内容',
        30: '该内容', 31: '该内容', 32: '该内容', 33: '该内容', 34: '该内容', 35: '该内容', 36: '该内容', 37: '该内容', 38: '该内容', 39: '该内容'
      }
    }
  }
  Validator.updateDictionary(dictionary)
  Vue.use(VeeValidate, config)
  export default {
    data() {
      return {
        hasChange: false,
        finalStrategyPhase: { },
        strategyPhaseId: '',
        filename: '',
        fileUrl: '',
        form: {
          TriggerOpen: [
            { triggerOpen: '', number: '', deleteFlag: false },
            { triggerOpen: '', number: '', deleteFlag: false },
            { triggerOpen: '', number: '', deleteFlag: false },
            { triggerOpen: '', number: '', deleteFlag: false },
            { triggerOpen: '', number: '', deleteFlag: false }
          ],
          AssistTool: [{ tool: '', number: '', deleteFlag: false }],
          killStrategies: [
            { description: '', number: '', deleteFlag: false },
            { description: '', number: '', deleteFlag: false }
          ],
          mainClassSizes: [{ description: '', number: '', deleteFlag: false }]
        },
        strategyId: null
      }
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.showRepor()
    },
    components: {
      formUpload
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'showRepor'
    },
    methods: {
      showRepor() {
        const strategyId = sessionStorage.getItem('strategyId')
        const oldId = sessionStorage.getItem('oldId')
        getStrategyMessages(oldId, {
          newStrategyId: strategyId,
          type: 3
        })
          .then(res => {
            const finalStrategyPhase = res.finalStrategyPhase
            this.finalStrategyPhase = finalStrategyPhase
            // window.eventBus.$emit('idMessage', finalStrategyPhase.id)
            this.strategyPhaseId = finalStrategyPhase.id
            finalStrategyPhase.fileName ? this.filename = finalStrategyPhase.fileName : this.filename = ''
            finalStrategyPhase.url ? this.fileUrl = finalStrategyPhase.url : this.fileUrl = ''
            const TriggerOpen = finalStrategyPhase.triggerOpens
            const killStrategies = finalStrategyPhase.killStrategies
            const AssistTool = finalStrategyPhase.assistTools
            const mainClassSizes = finalStrategyPhase.mainClassSizes
            TriggerOpen.forEach((open, index) => {
              if (index < 5) {
                this.form.TriggerOpen.splice(index, 1, { triggerOpen: open.triggerOpen, number: open.number, deleteFlag: false }
                )
              } else {
                this.form.TriggerOpen.splice(index, 1, { triggerOpen: open.triggerOpen, number: open.number, deleteFlag: true })
              }
            })
            killStrategies.forEach((killStrategy, index) => {
              if (index < 2) {
                this.form.killStrategies.splice(index, 1, { description: killStrategy.description, number: killStrategy.number, deleteFlag: false })
              } else {
                this.form.killStrategies.splice(index, 1, { description: killStrategy.description, number: killStrategy.number, deleteFlag: true })
              }
            })
            AssistTool.forEach((tool, index) => {
              if (index < 1) {
                this.form.AssistTool.splice(index, 1, { tool: tool.tool, number: tool.number, deleteFlag: false })
              } else {
                this.form.AssistTool.splice(index, 1, { tool: tool.tool, number: tool.number, deleteFlag: true })
              }
            })
            mainClassSizes.forEach((mainClass, index) => {
              if (index < 1) {
                this.form.mainClassSizes.splice(index, 1, { description: mainClass.description, number: mainClass.number, deleteFlag: false })
              } else {
                this.form.mainClassSizes.splice(index, 1, { description: mainClass.description, number: mainClass.number, deleteFlag: true })
              }
            })
          })
      },
      inputChange() {
        this.hasChange = true
      },
      addOpen() {
        // if (this.form.TriggerOpen.length < 10) {
        //   const open = { triggerOpen: '', number: '', deleteFlag: true }
        //   this.form.TriggerOpen.push(open)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        let ok = 0
        this.form.TriggerOpen.forEach((item, index) => {
          if (item.triggerOpen.trim().length === 0) {
            ok = 1
            this.$message({
              message: '请输入内容之后再添加哦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        })
        if (ok === 0) {
          if (this.form.TriggerOpen.length < 10) {
            const open = { triggerOpen: '', number: '', deleteFlag: true }
            this.form.TriggerOpen.push(open)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deleteOpen(index) {
        this.form.TriggerOpen.splice(index, 1)
      },
      addTool() {
        // if (this.form.AssistTool.length < 10) {
        //   const tool = { tool: '', number: '', deleteFlag: true }
        //   this.form.AssistTool.push(tool)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        let ok = 0
        this.form.AssistTool.forEach((item, index) => {
          if (item.tool.trim().length === 0) {
            ok = 1
            this.$message({
              message: '请输入内容之后再添加哦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        })
        if (ok === 0) {
          if (this.form.AssistTool.length < 10) {
            const tool = { tool: '', number: '', deleteFlag: true }
            this.form.AssistTool.push(tool)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deleteTool(index) {
        this.form.AssistTool.splice(index, 1)
      },
      addMainClass() {
        // if (this.form.mainClassSizes.length < 10) {
        //   const mainClass = { description: '', number: '', deleteFlag: true }
        //   this.form.mainClassSizes.push(mainClass)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        let ok = 0
        this.form.mainClassSizes.forEach((item, index) => {
          if (item.description.trim().length === 0) {
            ok = 1
            this.$message({
              message: '请输入内容之后再添加哦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        })
        if (ok === 0) {
          if (this.form.mainClassSizes.length < 10) {
            const mainClass = { description: '', number: '', deleteFlag: true }
            this.form.mainClassSizes.push(mainClass)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deleteMainClass(index) {
        this.form.mainClassSizes.splice(index, 1)
      },
      addkillStrategy() {
        // if (this.form.killStrategies.length < 10) {
        //   const killStrategie = { description: '', number: '', deleteFlag: true }
        //   this.form.killStrategies.push(killStrategie)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        let ok = 0
        this.form.killStrategies.forEach((item, index) => {
          if (item.description.trim().length === 0) {
            ok = 1
            this.$message({
              message: '请输入内容之后再添加哦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        })
        if (ok === 0) {
          if (this.form.killStrategies.length < 10) {
            const killStrategie = { description: '', number: '', deleteFlag: true }
            this.form.killStrategies.push(killStrategie)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deletekillStrategy(index) {
        this.form.killStrategies.splice(index, 1)
      }
    }
  }
</script>
<style lang="scss">
  .repor_store{
    display: flex;
    margin: 50px auto;
    width: 70%;
    .repor_store_title{
      font-size: 14px;
      width: 20%;
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
    .repor_store_content{
      width: 65%;
      margin-left: 20px;
      position: relative;
      .inputContainer{
        position: relative;
      }
      .icon_delete{
        position: absolute;
        top: 10px;
        right: -30px;
        cursor: pointer;
      }
      .error{
        color: red;
        display: block;
        margin-left: 10px;
        text-align: left;
        margin-top: -15px;
        margin-bottom: 5px;
      }
      .icon_add{
        text-align: left;
        cursor: pointer;
      }
    }
  }
</style>
