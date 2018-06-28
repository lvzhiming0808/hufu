<template>
  <div>
    <el-form ref="form" :model="form">
      <div class="first_consult_firstQuestion">
        <div class="firstQuestion_title">
          <span>探需必问点:</span>
          <span class="point"></span>
        </div>
        <div class="firstQuestion_content">
          <div class="inputContainer" v-for="(need,index) in form.needs" :key="index">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="''+index"
                      v-model="need.needName"></el-input>
            <span class="icon_delete" v-if="need.deleteFlag" @click="deleteNeed(index,$event)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has(''+index)" >{{ errors.first(''+index) }}</span>
          </div>
          <div class="icon_add" @click="addNeed($event)"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="first_consult_firstQuestion">
        <div class="firstQuestion_title">
          <span>{{mainType}}:</span>
          <span class="point"></span>
        </div>
        <div class="firstQuestion_content">
          <div class="inputContainer" v-for="(project,index) in form.secondProjects" :key="index">
            <el-input style="margin-bottom: 20px"
                      v-validate="'required|max:250'" :name="'1'+index"
                      @keydown.native="inputChange"
                      v-model="project.description"></el-input>
            <span v-if="project.deleteFlag" class="icon_delete" @click="deleteproject(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('1'+index)" >{{ errors.first('1'+index) }}</span>
          </div>
          <div class="icon_add" @click="addproject"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="first_consult_firstQuestion">
        <div class="firstQuestion_title">
          <span>主推班型:</span>
          <span class="point"></span>
        </div>
        <div class="firstQuestion_content">
          <div class="inputContainer" :key="index" v-for="(mainClass,index) in form.mainClassSizes">
            <el-input style="margin-bottom: 20px"
                      @keydown.native="inputChange"
                      v-validate="'required|max:250'" :name="'2'+index"
                      v-model="mainClass.description"></el-input>
            <span v-show="mainClass.deleteFlag" class="icon_delete" @click="deleteMainClass(index)"><icon-svg icon-class="Delete" /></span>
            <span class="error" v-show="errors.has('2'+index)" >{{ errors.first('2'+index) }}</span>
          </div>
          <div class="icon_add" @click="addMainClass"><icon-svg icon-class="add" />加一条</div>
        </div>
      </div>
      <div class="first_consult_firstQuestion">
        <div class="firstQuestion_title">
          <span>截杀策略:</span>
          <span class="point"></span>
        </div>
        <div class="firstQuestion_content">
          <div class="inputContainer" :key="index" v-for="(killStrategy,index) in form.killStrategies">
            <el-input
              style="margin-bottom: 20px"
              @keydown.native="inputChange"
              v-validate="'required|max:250'" :name="'3'+index"
              v-model="killStrategy.description"></el-input>
            <span class="icon_delete" v-if="killStrategy.deleteFlag" @click="deletekillStrategy(index)"><icon-svg icon-class="Delete" /></span>
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
  import VeeValidate, { Validator } from 'vee-validate'
  import { getStrategyMessages } from '../../api/createStrategy'
  import zh from 'vee-validate/dist/locale/zh_CN'
  Validator.addLocale(zh)
  import Modal from '@/components/modal'
  import confirm from '@/components/modal/confirm'
  import formUpload from '../formUpload/index.vue'
  Vue.use(Modal, {
    modals: {
      confirm
    }
  })
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
        mainType: '',
        hasChange: false,
        fileUrl: '',
        strategyPhaseId: '',   // 策略阶段id
        form: {
          needs: [
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false },
            { needName: '', number: '', deleteFlag: false }
          ],
          secondProjects: [{ description: '', number: '', deleteFlag: false }],
          killStrategies: [
            { description: '', number: '', deleteFlag: false },
            { description: '', number: '', deleteFlag: false }
          ],
          mainClassSizes: [{ description: '', number: '', deleteFlag: false }]
        },
        name: '',
        filename: ''
      }
    },
    components: {
      formUpload
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.showFirst()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route'(next, prev) {
        this.showFirst()
        /* if (prev.path !== '/createStrategy3' && next.path !== '/createStrategy3') {
          this.showFirst()
        }*/
      }
    },
    methods: {
      showFirst() {
        const strategyId = sessionStorage.getItem('strategyId')
        const oldId = sessionStorage.getItem('oldId')
        getStrategyMessages(oldId, {
          newStrategyId: strategyId,
          type: 1
        })
          .then(res => {
            const firstStrategyPhase = res.firstStrategyPhase
            // window.eventBus.$emit('idMessage', firstStrategyPhase.id)
            this.strategyPhaseId = firstStrategyPhase.id
            firstStrategyPhase.fileName ? this.filename = firstStrategyPhase.fileName : this.filename = ''
            firstStrategyPhase.url ? this.fileUrl = firstStrategyPhase.url : this.fileUrl = ''
            this.mainType = res.type
            const needs = firstStrategyPhase.needs
            const killStrategies = firstStrategyPhase.killStrategies
            const secondProjects = firstStrategyPhase.secondProjects
            const mainClassSizes = firstStrategyPhase.mainClassSizes
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
            secondProjects.forEach((project, index) => {
              if (index < 1) {
                this.form.secondProjects.splice(index, 1, { description: project.description, number: project.number, deleteFlag: false })
              } else {
                this.form.secondProjects.splice(index, 1, { description: project.description, number: project.number, deleteFlag: true })
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
      addNeed(event) {
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
      deleteNeed(index, event) {
        this.form.needs.splice(index, 1)
      },
      addproject() { // 主推项目
        let ok = 0
        this.form.secondProjects.forEach((item, index) => {
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
          if (this.form.secondProjects.length < 10) {
            const project = { description: '', number: '', deleteFlag: true }
            this.form.secondProjects.push(project)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }

        // if (this.form.secondProjects.length < 10) {
        //   const project = { description: '', number: '', deleteFlag: true }
        //   this.form.secondProjects.push(project)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
      },
      deleteproject(index) {
        this.form.secondProjects.splice(index, 1)
      },
      inputChange() {
        this.hasChange = true
      },
      addMainClass() { // 主推班型
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
      },
      deleteMainClass(index) {
        this.form.mainClassSizes.splice(index, 1)
      },
      addkillStrategy() { // 截杀策略
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
      },
      deletekillStrategy(index) {
        this.form.killStrategies.splice(index, 1)
      }
    }
  }
</script>
<style lang="scss">
  .first_consult_firstQuestion{
    display: flex;
    margin: 50px auto;
    width: 70%;
    .firstQuestion_title{
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
    .firstQuestion_content{
      margin-left: 20px;
      width: 65%;
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
