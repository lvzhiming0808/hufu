<template>
  <div class="withIn_form">
    <el-form ref="form" :model="form">
      <div class="withIn_question">
        <div class="withIn_question_title">
          <span>唤醒回忆+深入探需:</span>
          <span class="point"></span>
        </div>
        <div class="withIn_question_content">
          <div class="inputContainer" :key="index" v-for="(need,index) in form.needs">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="''+index"
                       v-model="need.needName"></el-input>
            <span class="icon_delete" v-show="need.deleteFlag" @click="deleteNeed(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has(''+index)" >{{ errors.first(''+index) }}</span>
          </div>
          <div class="icon_add" @click="addNeed"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="withIn_question">
        <div class="withIn_question_title">
          <span>解决首咨遗留问题:</span>
          <span class="point"></span>
        </div>
        <div class="withIn_question_content">
          <div class="inputContainer" :key="index" v-for="(solveProblem,index) in form.solveFirstProblems">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="'1'+index"
                      v-model="solveProblem.solve"></el-input>
            <span class="icon_delete" v-show="solveProblem.deleteFlag"  @click="deletesolveProblem(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('1'+index)" >{{ errors.first('1'+index) }}</span>
          </div>
          <div class="icon_add" @click="addsolveProblem(index)"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="withIn_question">
        <div class="withIn_question_title">
          <span>主推班型:</span>
          <span class="point"></span>
        </div>
        <div class="withIn_question_content">
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
      <div class="withIn_question">
        <div class="withIn_question_title">
          <span>截杀策略+促销活动:</span>
          <span class="point"></span>
        </div>
        <div class="withIn_question_content">
          <div class="inputContainer" :key="index" v-for="(killStrategy,index) in form.killStrategies">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="'3'+index"
                      v-model="killStrategy.description"></el-input>
            <span v-show="killStrategy.deleteFlag" class="icon_delete" @click="deletekillStrategy(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('3'+index)" >{{ errors.first('3'+index) }}</span>
          </div>
          <div class="icon_add" @click="addkillStrategy" ><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
    </el-form>
    <formUpload :strategyPhaseId="strategyPhaseId" :filename="filename" ref="formUploadData"></formUpload>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { getStrategyMessages } from '../../api/createStrategy'
  import formUpload from '../formUpload/index.vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import zh from 'vee-validate/dist/locale/zh_CN'
  Validator.addLocale(zh)
  const config = {
    locale: 'zh_CN'
  }
  const dictionary = {
    zh_CN: {
      messages: {
        max: () => '您输入的内容超过了字符限制~~'
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
        name: '',
        strategyPhaseId: '',   // 策略阶段id
        filename: '',
        fileUrl: '',
        hasChange: false,
        form: {
          needs: [
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false }
          ],
          solveFirstProblems: [{ solve: '', number: '', deleteFlag: false }],
          killStrategies: [
            { description: '', number: '', deleteFlag: false },
            { description: '', number: '', deleteFlag: false }
          ],
          mainClassSizes: [{ description: '', number: '', deleteFlag: false }]
        },
        newId: null,
        strategyId: null
      }
    },
    components: {
      formUpload
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.showSeven()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route'(next, prev) {
        this.showSeven()
        /* if (prev.path !== '/createStrategy4' && next.path !== '/createStrategy4') {
          this.showSeven()
        }*/
      }
    },
    methods: {
      showSeven() {
        const strategyId = sessionStorage.getItem('strategyId')
        const oldId = sessionStorage.getItem('oldId')
        getStrategyMessages(oldId, {
          newStrategyId: strategyId,
          type: 2
        })
          .then(res => {
            const secStrategyPhase = res.secStrategyPhase
            // window.eventBus.$emit('idMessage', secStrategyPhase.id)
            this.strategyPhaseId = secStrategyPhase.id
            secStrategyPhase.fileName ? this.filename = secStrategyPhase.fileName : this.filename = ''
            secStrategyPhase.url ? this.fileUrl = secStrategyPhase.url : this.fileUrl = ''
            const needs = secStrategyPhase.needs
            const solveFirstProblems = secStrategyPhase.solveFirstProblems
            const mainClassSizes = secStrategyPhase.mainClassSizes
            const killStrategies = secStrategyPhase.killStrategies
            needs.forEach((need, index) => {
              if (index < 5) {
                this.form.needs.splice(index, 1, { needName: need.needName, number: need.number, deleteFlag: false }
                )
              } else {
                this.form.needs.splice(index, 1, { needName: need.needName, number: need.number, deleteFlag: true })
              }
            })
            killStrategies.forEach((killStrategy, index) => {
              if (index < 2) {
                this.form.killStrategies.splice(index, 1, { description: killStrategy.description, number: killStrategy.number, deleteFlag: false })
              } else {
                this.form.killStrategies.splice(index, 1, { description: killStrategy.description, number: killStrategy.number, deleteFlag: true })
              }
            })
            solveFirstProblems.forEach((solveProblem, index) => {
              if (index < 1) {
                this.form.solveFirstProblems.splice(index, 1, { solve: solveProblem.solve, number: solveProblem.number, deleteFlag: false })
              } else {
                this.form.solveFirstProblems.splice(index, 1, { solve: solveProblem.solve, number: solveProblem.number, deleteFlag: true })
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
      addNeed() {
        let ok = 0
        this.form.needs.forEach((item, index) => {
          if (item.needName.trim().length === 0) {
            ok = 1
            this.$message({
              message: '请输入内容之后再添加哦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        })
        if (ok === 0) {
          if (this.form.needs.length < 10) {
            const need = { needName: '', number: '', deleteFlag: true }
            this.form.needs.push(need)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deleteNeed(index) {
        this.form.needs.splice(index, 1)
      },
      addsolveProblem() {
        let ok = 0
        this.form.solveFirstProblems.forEach((item, index) => {
          if (item.solve.trim().length === 0) {
            ok = 1
            this.$message({
              message: '请输入内容之后再添加哦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        })
        if (ok === 0) {
          if (this.form.solveFirstProblems.length < 10) {
            const solveProblem = { solve: '', number: '', deleteFlag: true }
            this.form.solveFirstProblems.push(solveProblem)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deletesolveProblem(index) {
        this.form.solveFirstProblems.splice(index, 1)
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
  .withIn_question{
    display: flex;
    margin: 50px auto;
    width: 70%;
    .withIn_question_title{
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
    .withIn_question_content{
      margin-left: 20px;
      width: 60%;
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
        margin-top: -15px;
        margin-bottom: 5px;
        text-align: left;
      }
      .icon_add{
        text-align: left;
        cursor: pointer;
      }
    }
  }
</style>
