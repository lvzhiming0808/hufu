<template>
  <div class="detail_strategy_basic">
    <p class="detail_strategy_basicNews">库存跨期</p>
    <div class="detail_strategy_question">
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">触发式开场:</p>
        <div class="strategy_item_description">
          <p v-for="(open, index) in finalStrategyPhase.triggerOpens" :key="index">{{open.triggerOpen}}</p>
          <el-form ref="form" :model="form2" v-show="isAdd">
            <el-form-item :key="index" v-for="(item, index) in form2.triggerOpens">
              <el-input v-model="item.triggerOpen"
                        v-validate="'required|max:250'" :name="''+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteOpen(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has(''+index)" >{{ errors.first(''+index) }}</span>
            </el-form-item>
            <span class="addOne" @click="addOpen"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">辅助咨询工具:</p>
        <div class="strategy_item_description">
          <p v-for="(tool, index) in finalStrategyPhase.assistTools" :key="index">{{tool.tool}}</p>
          <el-form ref="form" :model="form2" v-show="isAdd">
            <el-form-item :key="index" v-for="(item, index) in form2.AssistTool">
              <el-input v-model="item.tool"
                        v-validate="'required|max:250'" :name="'1'+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteTool(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has('1'+index)" >{{ errors.first('1'+index) }}</span>
            </el-form-item>
            <span class="addOne" @click="addTool"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">主推班型:</p>
        <div class="strategy_item_description">
          <p v-for="(mainClass, index) in finalStrategyPhase.mainClassSizes" :key="index">{{mainClass.description}}</p>
          <el-form ref="form" :model="form2" v-show="isAdd">
            <el-form-item :key="index" v-for="(item, index) in form2.mainClassSizes">
              <el-input v-model="item.description"
                        v-validate="'required|max:250'" :name="'2'+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteMainClass(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has('2'+index)" >{{ errors.first('2'+index) }}</span>
            </el-form-item>
            <span class="addOne" @click="addMainClass"><icon-svg icon-class="add" />加一条</span>
          </el-form>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">终极截杀+优惠折扣:</p>
        <div class="strategy_item_description">
          <p v-for="(killStrategy, index) in finalStrategyPhase.killStrategies" :key="index">{{killStrategy.description}}</p>
          <el-form ref="form" :model="form2" v-show="isAdd">
            <el-form-item :key="index" v-for="(item, index) in form2.killStrategies">
              <el-input v-model="item.description"
                        v-validate="'required|max:250'" :name="'3'+index"
                        placeholder="请逐条添加"></el-input>
              <span class="icon_delete" @click="deleteKillStrategy(index)"><icon-svg icon-class="Delete" /></span>
              <span class="error" v-show="errors.has('3'+index)" >{{ errors.first('3'+index) }}</span>
            </el-form-item>
            <span class="addOne" @click="addKillStrategy"><icon-svg icon-class="add" />加一条</span>
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
      finalStrategyPhase: Object
    },
    data() {
      return {
        name: '',
        isAddShow: true,
        isAdd: false,
        form2: {
          triggerOpens: [],
          AssistTool: [],
          mainClassSizes: [],
          killStrategies: []
        }
      }
    },
    methods: {
      showAdd() {
        this.isAdd = true
      },
      addOpen() {
        const openLength = 10 - this.finalStrategyPhase.triggerOpens.length
        let ok = 0
        this.form2.triggerOpens.forEach((item, index) => {
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
          if (this.form2.triggerOpens.length < openLength) {
            const open = { triggerOpen: '', number: '' }
            this.form2.triggerOpens.push(open)
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
        this.form2.triggerOpens.splice(index, 1)
      },
      addTool() {
        // const tool = { tool: '', number: '' }
        // const toolLength = 10 - this.finalStrategyPhase.assistTools.length
        // console.log(toolLength, '我还能够加几条探需')
        // if (this.form2.AssistTool.length < toolLength) {
        //   this.form2.AssistTool.push(tool)
        // } else {
        //   this.$message({
        //     message: '你已达到创建条数的上限啦~~~',
        //     type: 'warning',
        //     customClass: 'element-ui-message'
        //   })
        // }
        const toolLength = 10 - this.finalStrategyPhase.assistTools.length
        let ok = 0
        this.form2.AssistTool.forEach((item, index) => {
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
          if (this.form2.AssistTool.length < toolLength) {
            const tool = { tool: '', number: '' }
            this.form2.AssistTool.push(tool)
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
        this.form2.AssistTool.splice(index, 1)
      },
      addMainClass() {
        const mainClassLength = 10 - this.finalStrategyPhase.mainClassSizes.length
        let ok = 0
        this.form2.mainClassSizes.forEach((item, index) => {
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
          if (this.form2.mainClassSizes.length < mainClassLength) {
            const mainClass = { description: '', number: '' }
            this.form2.mainClassSizes.push(mainClass)
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
        this.form2.mainClassSizes.splice(index, 1)
      },
      addKillStrategy() {
        const killStrategyLength = 10 - this.finalStrategyPhase.killStrategies.length
        let ok = 0
        this.form2.killStrategies.forEach((item, index) => {
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
          if (this.form2.killStrategies.length < killStrategyLength) {
            const killStrategy = { description: '', number: '' }
            this.form2.killStrategies.push(killStrategy)
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
        this.form2.killStrategies.splice(index, 1)
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
            .el-form-item__content{
              margin-left: 0 !important;
              width: 80%;
              .el-input{
                width: 90%;
              }
            }
          }
        }
      }
    }
  }
</style>
