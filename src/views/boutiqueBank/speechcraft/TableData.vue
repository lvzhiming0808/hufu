<template>
<div class="table-wrapper">
  <el-table
    ref="multipleTable"
    :data="tableData"
    stripe
    fit
    :header-cell-style="{
      'padding-left': '0',
      'padding-right': '0',
      'border-bottom': 'none',
      padding: '5px 0'
    }"
    @row-click="goDetail"
    :cell-style="{
      'padding-left': '0',
      'padding-right': '0',
      'border-bottom': 'none',
      cursor: 'pointer',
      padding: '5px 0'
    }"
    style="width: 100%;"
    @selection-change="handleSelectionChange">
    <el-table-column
      align="center"
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      prop="groupName"
      label="适用军团"
      width="90px">
    </el-table-column>
    <el-table-column
      label="策略名称"
      show-overflow-tooltip>
       <template slot-scope="scope">
        <div style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{scope.row.name}} [{{scope.row.createDate}}]</div>
      </template>
    </el-table-column>
    <el-table-column
      label=""
      show-overflow-tooltip>
       <template slot-scope="scope">
        <button class="handlShare" @click="dialogVisible(scope.row.id)">分享</button>
      </template>
    </el-table-column>
  </el-table>
  <div class="marks" v-if="isMark">
    <div class="mark-box">
      <div class="box">
        <div class="lefts">
            <h3>将话术分享给</h3>
            <el-input @click.native="toShare($event)" class="approval-area-input" v-model="input2" readonly="readonly" placeholder="组织架构">
                <i slot="suffix" class="el-icon-arrow-right"></i>
            </el-input>
            <span slot="footer" class="dialog-footer">
              <button class="cancel" @click="cancel">取消</button>
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
</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/modules/boutiqueBank/modules/actionTypes'
import { userOrg, Share } from '@/api/goodStategy'
import { getRecord } from '@/api/strategyList'
export default {
  data() {
    return {
      input2: '',
      isMark: false,
      branchShow: true,
      branch: [],
      treeData: [],
      ids: '',
      defaultProps: {
        children: 'item',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters('boutiqueBank/speechcraft', [
      'tableData'
    ])
  },
  mounted() {
    userOrg()
    .then(res => {
      this.treeData = res
    })
  },
  methods: {
    ...mapMutations('boutiqueBank/speechcraft', [
      types.SET_MULTIPLESELECTION
    ]),
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this[types.SET_MULTIPLESELECTION](val)
    },
    goDetail(row, event) {
      sessionStorage.removeItem('CreatedReport')
      getRecord(row.id)
      .then(res => {
        if (event.target.tagName.toLowerCase() === 'div') {
          this[types.SET_MULTIPLESELECTION]([])
          sessionStorage.setItem('rowId', row.id)
          sessionStorage.setItem('urlOfList', location.pathname)
          sessionStorage.setItem('isCreatReports', JSON.parse(res))
          this.$router.push(`/strategyDetail?id=${row.id}&isCreatReport=${JSON.parse(res)}`)
        }
      })
    },
    dialogVisible(id) {
      this.isMark = true
      this.input2 = ''
      this.ids = id
    },
    cancel() {
      this.isMark = false
      this.input2 = ''
      this.$message({
        message: '取消分享',
        type: 'info',
        customClass: 'element-ui-message'
      })
    },
    Sure() {
      if (this.input2.trim().length > 0) {
        this.isMark = false
        Share({
          organizationIds: this.branch.toString(),
          strategyId: this.ids
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
    }

  }
}
</script>
<style lang="scss" scoped>
.handlShare{
    width: 46px;
    height: 24px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    background: #fff7ef;
    border: 1px solid #f79300;
    color: #f79300;
    float: right;
    text-align: center;
    margin-right: 20px;
    outline: none;
  }
  .marks{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 99999;
    .mark-box{
      width: 410px;
      height: 300px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -205px;
      margin-top: -100px;
      border-radius: 10px;
      box-shadow:0px 0px 20px #333;
      padding: 20px 0;
      box-sizing: border-box;
      overflow: hidden;
      .box{
        width: 820px;
      }
      .el-icon-arrow-right{
        font-size: 16px;
        margin-top: 12px;
        cursor: pointer;
      }
      h3{
        height: 50px;
        line-height: 50px;
        margin-left: 10%;
      }
      .approval-area-input{
        width: 80%;
        margin:30px 0 60px 10%;
        cursor: pointer;
      }
      .dialog-footer{
        margin:20px 0 0 85px;
        button{
          width: 112px;
          height: 30px;
          line-height: 30px;
          border: none;
          margin-right: 34px;
          border-radius: 4px;
          outline: none;
        }
        .cancel{
          border: 1px solid #d0984d;
          background: #fff6ef;
          color: #f79301
        }
        .sure{
          background: #f79301;
          color: #fff;
        }
      }
      .lefts{
        float: left;
        width: 410px;
      }
      .rights{
        width: 410px;
        padding: 10px 20px;
        box-sizing: border-box;
        float: left;
        .tops{
          overflow: hidden;
          margin-bottom: 15px;
          >span{
            width: 30px;
            height: 30px;
            display: block;
            border-radius: 3px;
            background: #f79300;
            float: left;
            z-index: 111;
            i{
              color: #fff;
              font-size: 16px;
              width: 100%;
              height: 100%;
              display: block;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
            }
          }
          >button{
              float: right;
              width: 78px;
              height: 30px;
              background: #f79300;
              border-radius: 3px;
              border: none;
              color: #fff;
          }
        }
        .inps{
          width: 100%;
        }
        .el-tree{
          height: 200px;
          overflow-y: scroll;
        }
        :focus{
        outline-width:0px !important;
        }
      }
    }
    
  }
</style>


