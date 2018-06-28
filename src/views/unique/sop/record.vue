<template>
  <div class="rightbox">
    <div class="righttitle"><span class="rightspanbg"></span> <span class="rightspanbg2">筛选方式</span></div>
    <div class="rightcont">
      <div class="righctop">
        <p class="leftcontflot leftcontflotright2">
          <el-form ref="form" :model="form" label-width="70px" size="small">
            <el-form-item label="筛选方式">
              <el-select v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
          </el-form>
        </p>
        <div class="block leftcontflot leftinputleft">
          <el-date-picker
            v-model="value1"
            align="right"
            type="date"
            placeholder="开始日期"
            :picker-options="pickerOptions2" size="small">
          </el-date-picker>
        </div>
        <div class="leftcontflot2">至</div>
        <div class="block leftcontflot leftinputleft">
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="结束日期"
            :picker-options="pickerOptions2" size="small">
          </el-date-picker>
        </div>
        <div class="leftcontflotright">
          <el-button
            @click="handleSubmit"
            type="warning" size="small">确定</el-button>
          <el-button type="warning" plain size="small">重置</el-button>
        </div>
      </div>
      <div class="righcent">
        <div class="down">
          <el-button
            @click="handleSubmit"
            type="warning" size="small">下载</el-button>
        </div>
        <div class="righcentlist">
          <ul>
            <li>
              <a>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="">第三军团虎符质检综合月报9月 <span>09/01-09/08</span></el-checkbox>
                </el-checkbox-group>
              </a>
            </li>
          </ul>
        </div>
        <div class="righcentlistbtn">
          <div class="block approval-pagination">
            <el-pagination
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
      </div>

    </div>
</template>
<script>
  import { datalist } from '@/api/dataTable'
  export default {
    data() {
      return {
        checkList: ['选中且禁用', '复选框 A'],
        checkList2: ['选中且禁用', '复选框 A'],
        checkList3: ['选中且禁用', '复选框 A'],
        checkList4: ['选中且禁用', '复选框 A'],
        checkList5: ['选中且禁用', '复选框 A'],
        checkList6: ['选中且禁用', '复选框 A'],
        checkList7: ['选中且禁用', '复选框 A'],
        checkList8: ['选中且禁用', '复选框 A'],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value1: '',
        value2: ''
      }
    },
    mounted() {
      datalist({ // 数据列表
        type: '123',
        screen: '456',
        sort: '日期',
        range: '2017-11-01'
      }).then(res => {
        this.sort = res.sort  //  排序方式
      })
    }
  }
</script>
