<template>
  <div class="detail_strategy_basic">
    <p class="detail_strategy_basicNews">首策咨询</p>
    <div class="detail_strategy_question">
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">探需必问点:</p>
        <div class="strategy_item_description" v-if="firstStrategyPhase.needs">
          <p v-for="(need, index) in firstStrategyPhase.needs" :key="index">{{need.needName}}</p>
          <el-form ref="form" :model="form">
            <el-form-item :key="index" v-for="(item, index) in form.needs">
              <el-input v-model="item.needName"
                        v-validate="'required|max:250'" :name="''+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteNeed(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has(''+index)" >{{ errors.first(''+index) }}</span>
            </el-form-item>
            <span class="addOne" v-show="isAdd" @click="addNeed"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion" v-if="firstStrategyPhase">{{strategy.projectType}}:</p>
        <div class="strategy_item_description" v-if="firstStrategyPhase.secondProjects">
          <p v-for="(project, index) in firstStrategyPhase.secondProjects" :key="index">{{project.description}}</p>
          <el-form ref="form" :model="form">
            <el-form-item :key="index" v-for="(item, index) in form.secondProjects">
              <el-input v-model="item.description"
                        v-validate="'required|max:250'" :name="'1'+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteProject(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has('1'+index)" >{{ errors.first('1'+index) }}</span>
            </el-form-item>
            <span class="addOne" v-show="isAdd" @click="addProject"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">主推班型:</p>
        <div class="strategy_item_description" v-if="firstStrategyPhase.mainClassSizes">
          <p v-for="(mainClass, index) in firstStrategyPhase.mainClassSizes" :key="index">{{mainClass.description}}</p>
          <el-form ref="form" :model="form">
            <el-form-item :key="index" v-for="(item, index) in form.mainClassSizes">
              <el-input v-model="item.description"
                         v-validate="'required|max:250'" :name="'2'+index"
                         placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteMainClass(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has('2'+index)" >{{ errors.first('2'+index) }}</span>
            </el-form-item>
            <span class="addOne" v-show="isAdd" @click="addMainClass"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">截杀策略+促销活动:</p>
        <div class="strategy_item_description" v-if="firstStrategyPhase.killStrategies">
          <p v-for="(killStrategy, index) in firstStrategyPhase.killStrategies" :key="index">{{killStrategy.description}}</p>
          <el-form ref="form" :model="form">
            <el-form-item :key="index" v-for="(item, index) in form.killStrategies">
              <el-input v-model="item.description"
                        v-validate="'required|max:250'" :name="'3'+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteKillStrategy(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has('3'+index)" >{{ errors.first('3'+index) }}</span>
            </el-form-item>
            <span class="addOne"  v-show="isAdd" @click="addKillStrategy"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import zh from 'vee-validate/dist/locale/zh_CN'
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
    props: {
      firstStrategyPhase: Object,
      strategy: Object
    },
    data() {
      return {
        isAdd: false,
        form: {
          needs: [],
          secondProjects: [],
          mainClassSizes: [],
          killStrategies: []
        },
        name: ''
      }
    },
    methods: {
      showAdd() {
        this.isAdd = true
      },
      addNeed() {
        // const need = { needName: '', number: '' }
        // const needLength = 10 - this.firstStrategyPhase.needs.length
        // console.log(needLength, '我还能够加几条探需')
        // if (this.form.needs.length < needLength) {
        //   this.form.needs.push(need)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        const needLength = 10 - this.firstStrategyPhase.needs.length
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
          if (this.form.needs.length < needLength) {
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
      addProject() {
        // const project = { description: '', number: '' }
        // const projectLength = 10 - this.firstStrategyPhase.secondProjects.length
        // console.log(projectLength, '我还能够加几条探需')
        // if (this.form.secondProjects.length < projectLength) {
        //   this.form.secondProjects.push(project)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        const projectLength = 10 - this.firstStrategyPhase.secondProjects.length
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
          if (this.form.secondProjects.length < projectLength) {
            const project = { description: '', number: '' }
            this.form.secondProjects.push(project)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deleteProject(index) {
        this.form.secondProjects.splice(index, 1)
      },
      addMainClass() {
        // const mainClass = { description: '', number: '' }
        // const mainClassLength = 10 - this.firstStrategyPhase.mainClassSizes.length
        // console.log(mainClassLength, '我还能够加几条探需')
        // if (this.form.mainClassSizes.length < mainClassLength) {
        //   this.form.mainClassSizes.push(mainClass)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        const mainClassLength = 10 - this.firstStrategyPhase.mainClassSizes.length
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
          if (this.form.mainClassSizes.length < mainClassLength) {
            const project = { description: '', number: '' }
            this.form.mainClassSizes.push(project)
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
      addKillStrategy() {
        // const killStrategy = { description: '', number: '' }
        // const killStrategyLength = 10 - this.firstStrategyPhase.killStrategies.length
        // console.log(killStrategyLength, '我还能够加几条探需')
        // if (this.form.killStrategies.length < killStrategyLength) {
        //   this.form.killStrategies.push(killStrategy)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        const killStrategyLength = 10 - this.firstStrategyPhase.killStrategies.length
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
          if (this.form.killStrategies.length < killStrategyLength) {
            const project = { description: '', number: '' }
            this.form.killStrategies.push(project)
          } else {
            this.$message({
              message: '你已达到创建条数的上限啦~~~',
              type: 'warning',
              customClass: 'element-ui-message'
            })
          }
        }
      },
      deleteKillStrategy(index) {
        this.form.killStrategies.splice(index, 1)
      }
    }
  }
</script>
<style lang="scss">
  .detail_strategy_basic{
    margin-top: 10px;
    .detail_strategy_basicNews{
      color: rgb(247, 147, 0);
      font-size: 18px;
    }
    .detail_strategy_question{
      margin-top: 30px;
      font-size: 16px;
      .strategy_firstQuestion_item{
        display: flex;
        width: 100%;
        margin-bottom: 30px;
        .strategy_firstQuestion{
          margin-right: 20px;
          width: 16%;
          text-align: right;
        }
        .strategy_item_description{
          width: 80%;
          .el-form-item{
            margin-top: 10px;
            margin-bottom: 10px;
            .icon_delete{
              cursor: pointer;
            }
            .error{
              color: red;
              display: block;
              margin-left: 10px;
              margin-bottom: -5px;
              text-align: left;
            }
            .el-form-item__content{
              margin-left: 0 !important;
              width: 80%;
              .el-input{
                width: 90%;
              }
            }
          }
          .addOne{
            display: inline-block;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
