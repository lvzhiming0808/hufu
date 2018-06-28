<template>
  <div class="basicNewsForm">
    <el-form ref="form" label-width="80px">
      <el-form-item label="策略名称">
        <el-input v-model="form.activeName" @keyup.native="StrategyName"></el-input>
        <span class="error" v-show="isStrategy">{{texts}}</span>
      </el-form-item>
      <el-form-item label="项目" class="basicNewsForm_region">
        <select class="inputregion" v-model="form.projectId">
          <option class="optionColor" :value="pro.id" :key="index" v-for="(pro,index) in projects">{{pro.name}}</option>
        </select>
      </el-form-item>
      <el-form-item label="适用部门" class="basicNewsForm_region">
        <el-input v-model="input2" @click.native="showBranch" readonly="readonly"></el-input>
        <el-tree v-show="branchShow" :data="treeData" show-checkbox node-key="id" ref="tree" @check-change="throttle(showItem)" :props="defaultProps"></el-tree>
      </el-form-item>
      <el-form-item label="地域" class="basicNewsForm_region">
        <select class="inputregion" v-model="form.regionId">
          <option class="optionColor" :value="reg.id" :key="index" v-for="(reg,index) in regions">{{reg.name}}</option>
        </select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {
    createStrategy,
    getAreas,
    getProjects
  } from '../../api/createStrategy'
  export default {
    data() {
      return {
        branchShow: false,
        strategyId: null,
        isStrategy: false,
        texts: '',
        count: 1,
        strategyBase: {},
        form: {
          branch: [],
          activeName: '',
          projectId: 1,
          regionId: 1
        },
        projects: [],
        regions: [],
        defaultProps: {
          children: 'item',
          label: 'name'
        },
        idArr: [],
        input2: '',
        treeData: []
        /* parentId: 2001*/
      }
    },
    props: ['status', 'editId'],
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      const strategyId = sessionStorage.getItem('strategyId')
      if (!strategyId) {
        this.getBasicNews()
      } else {
        this.getNews()
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route'(next, prev) {
        if (prev.path === '/layout/myStrategy') {
          this.getBasicNews()
        }
        if (prev.path === '/createStrategy2') {
          this.getNews()
        }
      }
    },
    mounted() {
      this.treeData = this.$store.getters.organization.item
      getAreas()
        .then(res => {
          this.regions = res
        })
      getProjects()
        .then(res => { // 获取项目列表
          this.projects = res
        })
    },
    methods: {
      StrategyName() {
       // alert(!/[@#\$%\^&\*]+/g.test('test@'))
        if (this.form.activeName) {
          if (this.form.activeName.trim().length > 0) {
            if (!/[<>:：\、\?\/\\\"\*\|]+/g.test(this.form.activeName) === true) {
              if (this.form.activeName.length > 50) {
                this.texts = '请输入少于50的策略名称'
                this.isStrategy = true
              } else {
                this.texts = ' '
                this.isStrategy = false
              }
            } else {
              this.texts = '您的策略名称含有(\\  / 、 : ： < >  *  |  ?)等特殊字符哦~~~'
              this.isStrategy = true
            }
          }
        } else {
          this.texts = '策略名称是必填项'
          this.isStrategy = true
        }
      },
      getNews() {
        const strategyId = sessionStorage.getItem('strategyId')
        createStrategy(strategyId) // 创建策略
          .then(res => {
            this.strategyData = res.strategyBase
            this.form.activeName = this.strategyData.name
            this.form.projectId = this.strategyData.firstProjectId
            this.form.regionId = this.strategyData.area
            this.form.branch = this.strategyData.applydeparts
            this.form.branch.forEach(item => {
              this.idArr.push(item.id)
            })
            this.$refs.tree.setCheckedKeys(this.idArr)
            this.$nextTick(() => {
              this.showItem()
            })
            this.strategyId = this.strategyData.id
          })
      },
      getBasicNews() {
        if (this.status === 0 || this.status === '0') {
          createStrategy(0) // 创建策略
            .then(res => {
              this.strategyData = res.strategyBase
              this.form.activeName = this.strategyData.name
              this.form.projectId = this.strategyData.firstProjectId
              this.form.regionId = this.strategyData.area
              this.form.branch = this.strategyData.applydeparts
              this.form.branch.forEach(item => {
                this.idArr.push(item.id)
              })
              this.$refs.tree.setCheckedKeys(this.idArr)
              this.$nextTick(() => {
                this.showItem()
              })
              this.strategyId = this.strategyData.id
            })
        }
        if (this.status === 1 || this.status === '1') {
          createStrategy(this.editId) // 编辑策略
            .then(res => {
              this.strategyData = res.strategyBase
              this.form.activeName = this.strategyData.name
              this.form.projectId = this.strategyData.firstProjectId
              this.form.regionId = this.strategyData.area
              this.form.branch = this.strategyData.applydeparts
              this.form.branch.forEach(item => {
                this.idArr.push(item.id)
              })
              this.$refs.tree.setCheckedKeys(this.idArr)
              this.$nextTick(() => {
                this.showItem()
              })
              this.strategyId = this.strategyData.id
            })
        }
      },
      showBranch() {
        this.branchShow = !this.branchShow
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
      showItem() {
        const checkedList = this.$refs.tree.getCheckedNodes()
  
        this.form.branch = []
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i].item.length === 0) {
            this.form.branch.push(checkedList[i].id)
          }
        }
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
            // console.log(arr2)
            // this.input2 += `${arr2[0]} - ${checkedList[i].name}， `
          }
        }
      },
      throttle(method, context) {
        clearTimeout(method.tId)
        method.tId = setTimeout(() => {
          method.call(context)
        }, 300)
      }
    }
  }
</script>
<style lang="scss">
  .el-tree * {
    outline: none;
  }
  .basicNewsForm {
    margin: 67px auto;
    text-align: center;
    width: 50%;
    .error {
      height: 0;
      color: red;
      text-align: left;
      display: block;
    }
    .basicNewsForm_region {
      cursor: pointer;
      margin-top: 42px;
      position: relative;
      .regions {
        width: 100%;
      }
      .inputregion {
        border-color: #d0d0d0;
        height: 40px;
        border-radius: 4px;
        width: 100%;
        outline-color: rgb(247, 147, 0);
        .optionColor {
          border-color: rgb(247, 147, 0);
        }
      }
    }
  }
</style>
